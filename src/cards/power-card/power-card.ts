import { UnsubscribeFunc } from "home-assistant-js-websocket";
import { css, html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { styleMap } from "lit/directives/style-map.js";
import { unsafeSVG } from "lit/directives/unsafe-svg.js";
import "./power-card-editor";
import memoizeOne from "memoize-one";
import hash from "object-hash/dist/object_hash";
import {
  actionHandler,
  ActionHandlerEvent,
  atLeastHaVersion,
  computeDomain,
  DOMAINS_TOGGLE,
  handleAction,
  hasAction,
  HomeAssistant,
  LovelaceCard,
  LovelaceCardEditor,
  LovelaceGridOptions,
  RenderTemplateResult,
  subscribeRenderTemplate,
  ActionHandlerOptions,
} from "../../ha";
import { computeCssColor } from "../../ha/common/color/compute-color";
import { isTemplate } from "../../ha/common/string/has-template";
import { CacheManager } from "../../utils/cache-manager";
import { registerCustomCard } from "../../utils/custom-cards";
import { TemplateCardConfig } from "./power-card-config";
import { getWeatherSvgIcon } from "../../utils/icons/weather-icon";
import { weatherSVGStyles } from "../../utils/weather";
import { mushroomicKeyframes } from "../../utils/animations/keyframes";
import {
  getAutoOverlay,
  getAutoAnimations,
  getAutoBadgeAnimation
} from "../../utils/animations/automatic";
import { powerCardStyles } from "./power-card-style";

export const getEntityDefaultTileIconAction = (entityId: string) => {
  const domain = computeDomain(entityId);
  const supportsIconAction =
    DOMAINS_TOGGLE.has(domain) ||
    ["button", "input_button", "scene"].includes(domain);

  return supportsIconAction ? "toggle" : "none";
};

registerCustomCard({
  type: "mushroomic-power-card",
  name: "Mushroomic Power Card",
  description: "Mushroom with maximum customization",
});

const templateCache = new CacheManager<TemplateResults>(1000);

type TemplateResults = Partial<
  Record<TemplateKey, RenderTemplateResult | undefined>
>;

const TEMPLATE_KEYS = [
  // --- ICON ---
  "icon",
  "picture",
  "color",
  "shape_size",
  "shape_color",
  "shape_opacity",
  "shape_hover_opacity",
  "icon_size",

  // --- TEXT ---
  "primary",
  "primary_text_size",
  "primary_text_weight",
  "primary_text_color",
  "primary_line_height",
  "primary_letter_spacing",
  
  "secondary",
  "secondary_text_size",
  "secondary_text_weight",
  "secondary_text_color",
  "secondary_line_height",
  "secondary_letter_spacing",
  
  // --- BADGE ---
  "badge_icon",
  "badge_color",
  "badge_text",
  "badge_size",
  "badge_icon_size",
  "badge_icon_color",
  "badge_text_size",
  "badge_text_color",
  "badge_margin_top",
  "badge_margin_right",

  // --- CARD STYLING ---
  "card_height",
  "card_bg_color",
  "border_color",
  "border_width",
  "border_radius",
  "border_style",
  "ripple_color",
  "card_padding",
  "content_gap",

  // --- OVERLAY ---
  "overlay_icon",
  "overlay_color",
  "overlay_opacity",
  "overlay_size",
  "overlay_margin",

  // --- ANIMATIONS ---
  "icon_animation",
  "shape_animation",
  "badge_animation",
  "badge_icon_animation",
  "overlay_animation",

  // --- FEATURES ---
  "features_color",
  "features_height",
  "features_padding",
  
] as const;


type TemplateKey = (typeof TEMPLATE_KEYS)[number];

export interface LovelaceCardFeatureContext {
  entity_id?: string;
  area_id?: string;
}

@customElement("mushroomic-power-card")
export class MushroomicPowerCard extends LitElement implements LovelaceCard {
  public static async getConfigElement(): Promise<LovelaceCardEditor> {
    return document.createElement("mushroomic-power-card-editor");
  }
  
  public static getStubConfig(): TemplateCardConfig {
    return {
      type: `custom:mushroomic-power-card`,
      primary: "Hello, {{user}}",
      secondary: "How are you?",
      icon: "mdi:mushroom",
    };
  }

  @property({ attribute: false }) public hass?: HomeAssistant;

  @state() private _config?: TemplateCardConfig;

  @state() private _pictureSvg?: string;

  @state() private _templateResults?: TemplateResults;

  @state() private _unsubRenderTemplates: Map<
    TemplateKey,
    Promise<UnsubscribeFunc>
  > = new Map();

  public connectedCallback() {
    super.connectedCallback();
    this._tryConnect();
  }

  public disconnectedCallback() {
    super.disconnectedCallback();
    this._tryDisconnect();

    if (this._config && this._templateResults) {
      const key = this._computeCacheKey();
      templateCache.set(key, this._templateResults);
    }
  }

  private _computeCacheKey() {
    return hash(this._config);
  }

  protected willUpdate(_changedProperties: PropertyValues): void {
    super.willUpdate(_changedProperties);
    if (!this._config) {
      return;
    }

    if (!this._templateResults) {
      const key = this._computeCacheKey();
      if (templateCache.has(key)) {
        this._templateResults = templateCache.get(key)!;
      } else {
        this._templateResults = {};
      }
    }
  }
  protected updated(changedProps: PropertyValues): void {
    super.updated(changedProps);
  
    if (!this._config || !this.hass) return;
  
    this._tryConnect();
    this.dispatchEvent(new Event("iron-resize", { bubbles: true, composed: true }));
  }
  
  private _getTemplateKeyValue(key: TemplateKey): string {
    if (!this._config) {
      return "";
    }
    return this._config[key] ?? "";
  }

  private async _tryConnect(): Promise<void> {
    TEMPLATE_KEYS.forEach((key) => {
      this._tryConnectKey(key);
    });
  }

  private async _tryConnectKey(key: TemplateKey): Promise<void> {
    if (
      this._unsubRenderTemplates.get(key) !== undefined ||
      !this.hass ||
      !this._config
    ) {
      return;
    }

    const value = this._getTemplateKeyValue(key);
    if (!isTemplate(value)) {
      return;
    }
    try {
      const sub = subscribeRenderTemplate(
        this.hass.connection,
        (result) => {
          this._templateResults = {
            ...this._templateResults,
            [key]: result,
          };
        },
        {
          template: value,
          entity_ids: this._config.entity_id,
          variables: {
            config: this._config,
            user: this.hass.user!.name,
            entity: this._config.entity,
            area: this._config.area,
          },
          strict: true,
        }
      );
      this._unsubRenderTemplates.set(key, sub);
      await sub;
    } catch (_err) {
      const result = {
        result: this._config[key] ?? "",
        listeners: {
          all: false,
          domains: [],
          entities: [],
          time: false,
        },
      };
      this._templateResults = {
        ...this._templateResults,
        [key]: result,
      };
      this._unsubRenderTemplates.delete(key);
    }
  }
  private async _tryDisconnect(): Promise<void> {
    TEMPLATE_KEYS.forEach((key) => {
      this._tryDisconnectKey(key);
    });
  }

  private async _tryDisconnectKey(key: TemplateKey): Promise<void> {
    const unsubRenderTemplate = this._unsubRenderTemplates.get(key);
    if (!unsubRenderTemplate) {
      return;
    }

    try {
      const unsub = await unsubRenderTemplate;
      unsub();
      this._unsubRenderTemplates.delete(key);
    } catch (err: any) {
      if (err.code === "not_found" || err.code === "template_error") {
        // If we get here, the connection was probably already closed. Ignore.
      } else {
        throw err;
      }
    }
  }
  
  private async _loadSvg(url: string): Promise<string | undefined> {
    try {
      const resp = await fetch(url);
      return await resp.text();
    } catch {
      return undefined;
    }
  }

  public setConfig(config: TemplateCardConfig): void {
    this._config = {...config};

    if (this._config.entity) {
      if (!this._config.tap_action) {
        this._config.tap_action = { action: "more-info" };
      }
      if (!this._config.icon_tap_action) {
        this._config.icon_tap_action = {
          action: getEntityDefaultTileIconAction(this._config.entity),
        };
      }
    }
  }

  private _featureContext = memoizeOne(
    (config: TemplateCardConfig): LovelaceCardFeatureContext => {
      return {
        entity_id: config.entity,
        area_id: config.area,
      };
    }
  );

  private getValue(key: TemplateKey) {
    const value = this._getTemplateKeyValue(key);
    return isTemplate(value)
      ? this._templateResults?.[key]?.result?.toString()
      : value;
  }
  
  public getCardSize(): number {
    const card = this.shadowRoot?.querySelector("ha-card");
    if (!card) return 3;
  
    const height = card.getBoundingClientRect().height;
  
    return Math.ceil(height / 60);
  }

public getGridOptions(): LovelaceGridOptions {
  const card = this.shadowRoot?.querySelector("ha-card");
  let measuredRows: number | undefined;

  if (card) {
    const height = card.getBoundingClientRect().height;
    measuredRows = Math.max(1, Math.ceil(height / 60)); 
  }

  let columns: number | undefined = 6;
  let rows: number | undefined = measuredRows;

  const hasContent = Boolean(
    this._config?.icon ||
      this._config?.picture ||
      this._config?.primary ||
      this._config?.secondary
  );

  const featurePosition = this._config && this._featurePosition(this._config);
  const featuresCount = this._config?.features?.length || 0;

  if (featuresCount && featurePosition === "inline") {
    columns = 12;
  }

  if (!rows) {
    rows = hasContent ? 1 : 0;

    if (featuresCount && featurePosition !== "inline") {
      rows += featuresCount;
    }

    if (this._config?.vertical) {
      if (
        this._config.primary ||
        (this._config.secondary && !this._config.icon)
      ) {
        rows++;
      }
    }
  }

  return { columns, rows };
}


  private _handleAction(ev: ActionHandlerEvent) {
    handleAction(this, this.hass!, this._config!, ev.detail.action!);
  }

  private _handleIconAction(ev: CustomEvent) {
    ev.stopPropagation();
    const config = {
      entity: this._config!.entity,
      tap_action: this._config!.icon_tap_action,
      hold_action: this._config!.icon_hold_action,
      double_tap_action: this._config!.icon_double_tap_action,
    };
    handleAction(this, this.hass!, config, ev.detail.action!);
  }

  private get _hasCardAction() {
    return (
      hasAction(this._config?.tap_action) ||
      hasAction(this._config?.hold_action) ||
      hasAction(this._config?.double_tap_action)
    );
  }

  private get _hasIconAction() {
    return (
      hasAction(this._config?.icon_tap_action) ||
      hasAction(this._config?.icon_hold_action) ||
      hasAction(this._config?.icon_double_tap_action)
    );
  }

  private _featurePosition = memoizeOne((config: TemplateCardConfig) => {
    if (config.vertical) {
      return "bottom";
    }
    return config.features_position || "bottom";
  });

  private _displayedFeatures = memoizeOne((config: TemplateCardConfig) => {
    const features = config.features || [];
    const featurePosition = this._featurePosition(config);

    if (featurePosition === "inline") {
      return features.slice(0, 1);
    }
    return features;
  });

  protected render() {
    if (!this._config || !this.hass) {
      return nothing;
    }

    // --- ICON ---
    const icon = this.getValue("icon");
    let overlayIcon = this.getValue("overlay_icon") || getAutoOverlay(icon);
    const picture = this.getValue("picture");
    const color = this.getValue("color");
    const cssColor = color ? computeCssColor(color) : undefined;
    
    const shapeSize = this.getValue("shape_size");
    const shapeColor = this.getValue("shape_color");
    const shapeOpacity = this.getValue("shape_opacity");
    const iconSize = this.getValue("icon_size");
    
    const weatherSvg = getWeatherSvgIcon(icon);
    
    // --- TEXT ---
    const primary = this.getValue("primary");
    const secondary = this.getValue("secondary");
    
    const primarySize = parseInt(this.getValue("primary_text_size") || "14px");
    const primaryLH = parseFloat(this.getValue("primary_line_height") || "1.6");
    
    const secondarySize = parseInt(this.getValue("secondary_text_size") || "12px");
    const secondaryLH = parseFloat(this.getValue("secondary_line_height") || "1.2");
    
    // --- BADGE ---
    const badgeIcon = this.getValue("badge_icon");
    const badgeColor = this.getValue("badge_color");
    const badgeText = this.getValue("badge_text");
    const badgeCssColor = badgeColor ? computeCssColor(badgeColor) : undefined;
    
    const badgeSize = this.getValue("badge_size");
    const badgeIconSize = this.getValue("badge_icon_size");
    const badgeTextSize = this.getValue("badge_text_size");
    const badgeIconColor = this.getValue("badge_icon_color");
    const badgeTextColor = this.getValue("badge_text_color");
    
    // --- CARD STYLING ---
    const cardHeight = this.getValue("card_height");
    
    // --- Automatic fallback scaling ---
   // const finalShapeSize = shapeSize || "var(--mushic-shape-size, 36px)";
 //   const finalIconSize = iconSize || "var(--mushic-icon-size, calc(var(--mushic-shape-size, 36px) * 0.666))";
//    const finalBadgeSize = badgeSize || "var(--mushic-badge-size, calc(var(--mushic-shape-size, 36px) * 0.444))";
//    const finalBadgeIconSize = badgeIconSize || "var(--mushic-badge-icon-size, calc(var(--mushic-shape-size, 36px) * 0.444 * 0.75))";
//    const finalBadgeTextSize = badgeTextSize || "var(--mushic-badge-text-size, calc(var(--mushic-shape-size, 36px) * 0.444 * 0.5))";
    
    const shape = parseInt(shapeSize);
    
    // --- Vertical height calculation ---
//    const verticalHeight = `${
 //     shape +
//      primarySize * primaryLH +
//      secondarySize * secondaryLH +
//      41.6
//    }px`;
    
//    const finalCardHeight =
 //     cardHeight ||
//      (this._config?.vertical
//        ? verticalHeight
//        : icon || picture
 //         ? `calc(var(--mushic-shape-size) + 20px)`
//          : `calc(36px + 20px)`);
    
    // --- SHAPE ---
    const shapeColorValue = this.getValue("shape_color")?.trim();
    const shapeOpacityValue = this.getValue("shape_opacity")?.trim();
    
    const showShape =
      this._hasIconAction ||
      (shapeColorValue && shapeColorValue !== "0") ||
      (shapeOpacityValue && shapeOpacityValue !== "0");

    // --- AUTO_ANIMATION
    const autoAnim = getAutoAnimations(icon);
    const autoBadgeAnim = getAutoBadgeAnimation(badgeIcon);
    
    const style = {
      // --- ICON ---  
      "--mushic-icon-color": cssColor || "var(--state-inactive-color)",
      "--tile-color": "var(--mushic-icon-color)",
      "--mushic-shape-color": shapeColor ? shapeColor : undefined,
      "--mushic-shape-opacity": shapeOpacity ? shapeOpacity : undefined,
      "--mushic-shape-hover-opacity": this.getValue("shape_hover_opacity"),
      "--mushic-shape-size": shapeSize || undefined,
      "--tile-icon-size": "var(--mushic-shape-size)",
      "--mushic-icon-size": iconSize || undefined,
      "--tile-mdc-icon-size": "var(--mushic-icon-size)",
    
      // --- TEXT ---
      "--ha-tile-info-primary-font-size": this.getValue("primary_text_size") || "var(--mushic-primary-text-size)",
      "--ha-tile-info-primary-font-weight": this.getValue("primary_text_weight") || "var(--mushic-primary-text-weight)",
      "--ha-tile-info-primary-color": this.getValue("primary_text_color") || "var(--mushic-primary-text-color)",
      "--ha-tile-info-primary-line-height": this.getValue("primary_line_height") || "var(--mushic-primary-line-height)",
      "--ha-tile-info-primary-letter-spacing": this.getValue("primary_letter_spacing") || "var(--mushic-primary-letter-spacing)",
    
      "--ha-tile-info-secondary-font-size": this.getValue("secondary_text_size") || "var(--mushic-secondary-text-size)",
      "--ha-tile-info-secondary-font-weight": this.getValue("secondary_text_weight") || "var(--mushic-secondary-text-weight)",
      "--ha-tile-info-secondary-color": this.getValue("secondary_text_color") || "var(--mushic-secondary-text-color)",
      "--ha-tile-info-secondary-line-height": this.getValue("secondary_line_height") || "var(--mushic-secondary-line-height)",
      "--ha-tile-info-secondary-letter-spacing": this.getValue("secondary_letter_spacing") || "var(--mushic-secondary-letter-spacing)",
    
      // --- BADGE ---
      "--mushic-badge-size": badgeSize || undefined,
      "--mushic-badge-icon-size": badgeIconSize || undefined,
      "--mushic-badge-text-size": badgeTextSize || undefined,  
      "--mushic-badge-color": badgeCssColor,
      "--mushic-badge-icon-color": badgeIconColor,
      "--mushic-badge-text-color": badgeTextColor,
      "--mushic-badge-margin-top": this.getValue("badge_margin_top"),
      "--mushic-badge-margin-right": this.getValue("badge_margin_right"),      
    
      // --- CARD STYLING ---
      "--mushic-card-min-height": finalCardHeight,
      "--mushic-card-height": this.getValue("card_height"),
      "--mushic-card-bg-color": this.getValue("card_bg_color"),
      "--mushic-card-border-color": this.getValue("border_color"),
      "--mushic-card-border-width": this.getValue("border_width"),
      "--mushic-card-border-radius": this.getValue("border_radius"),
      "--mushic-card-border-style": this.getValue("border_style"),
      "--mushic-ripple-color": this.getValue("ripple_color"),
      "--mushic-card-padding": this.getValue("card_padding"),
      "--mushic-content-gap": this.getValue("content_gap"),
      
      // --- OVERLAY ---
      "--mushic-overlay-icon": overlayIcon,
      "--mushic-overlay-color": this.getValue("overlay_color"),
      "--mushic-overlay-opacity": this.getValue("overlay_opacity"),
      "--mushic-overlay-size": this.getValue("overlay_size"),
      "--mushic-overlay-margin": this.getValue("overlay_margin"),

      // --- ANIMATIONS ---
      "--mushic-icon-animation": this.getValue("icon_animation") || autoAnim.icon,
      "--mushic-shape-animation": this.getValue("shape_animation") || autoAnim.shape,
      "--mushic-badge-animation": this.getValue("badge_animation"),
      "--mushic-badge-icon-animation": this.getValue("badge_icon_animation") || autoBadgeAnim,
      "--mushic-overlay-animation": this.getValue("overlay_animation"),
      "--mushic-card-keyframes": this.getValue("keyframes"),

      // --- FEATURES ---
      "--mushic-features-color": this.getValue("features_color"),
      "--mushic-features-height": this.getValue("features_height"),
      "--mushic-features-padding": this.getValue("features_padding"),
    };

    const featurePosition = this._featurePosition(this._config);
    const features = this._displayedFeatures(this._config);

    const featureContext = this._featureContext(this._config);

    const featureOnly =
      features.length > 0 && !icon && !picture && !primary && !secondary;

    const containerClasses = classMap({
      horizontal: featurePosition === "inline",
      "feature-only": featureOnly,
    });

    const contentClasses = classMap({
      vertical: Boolean(this._config.vertical),
    });

    const { haVersion } = this.hass.connection;
    const supportTileIconHandlerOptions = atLeastHaVersion(haVersion, 2026, 2);

    const iconActionHandlerOptions: ActionHandlerOptions = {
      disabled: !this._hasIconAction,
      hasHold: hasAction(this._config!.icon_hold_action),
      hasDoubleClick: hasAction(this._config!.icon_double_tap_action),
    };
    
    let pictureSvg: string | undefined;
    let isSvg = false;
    
    if (picture) {
      const lower = picture.trim().toLowerCase();
      isSvg = lower.includes(".svg");
    
      if (isSvg) {
        try {
          const url = this.hass.hassUrl(picture);
          this._loadSvg(url).then(svg => {
            this._pictureSvg = svg;
            this.requestUpdate();
          });
        } catch (e) {
          console.error("Failed to load SVG", e);
        }
      }
    }

    return html`
      <ha-card style=${styleMap(style)}>
        <div
          class="background"
          @action=${this._handleAction}
          .actionHandler=${actionHandler({
            disabled: !this._hasCardAction,
            hasHold: hasAction(this._config!.hold_action),
            hasDoubleClick: hasAction(this._config!.double_tap_action),
          })}
          role=${ifDefined(this._hasCardAction ? "button" : undefined)}
          tabindex=${ifDefined(this._hasCardAction ? "0" : undefined)}
          aria-labelledby="info"
        >
          <ha-ripple .disabled=${!this._hasCardAction}></ha-ripple>
        </div>
        <div class="container ${containerClasses}">
          ${icon || picture || primary || secondary
            ? html`<div class="content ${contentClasses}">
                ${icon || picture
                  ? html`
                    <ha-tile-icon
                      style=${styleMap({
                          "--tile-icon-size": "var(--mushic-shape-size)",
                          "--tile-mdc-icon-size": "var(--mushic-icon-size)"
                      })}
                      role=${ifDefined(this._hasIconAction ? "button" : undefined)}
                      tabindex=${ifDefined(this._hasIconAction ? "0" : undefined)}
                      @action=${this._handleIconAction}
                      .actionHandlerOptions=${supportTileIconHandlerOptions
                        ? iconActionHandlerOptions
                        : undefined}
                      .actionHandler=${!supportTileIconHandlerOptions
                        ? actionHandler(iconActionHandlerOptions)
                        : undefined}
                      .interactive=${this._hasIconAction}
                      .imageUrl=${picture && !isSvg ? this.hass.hassUrl(picture) : undefined}
                      class=${classMap({
                        weather: weatherSvg,
                        "no-shape": !showShape,
                      })}
                    >
                    <div class="mushic-shape-wrapper">
                      <div class="mushic-shape"></div>
                    
                      ${isSvg && this._pictureSvg
                        ? unsafeSVG(this._pictureSvg)
                        : nothing}
                    </div>

                      ${this.getValue("overlay_icon")
                        ? html`
                          <div class="mushic-overlay" slot="icon">
                              <ha-icon class="mushic-overlay-svg" .icon=${this.getValue("overlay_icon")} ></ha-icon>
                          </div>
                          `
                        : nothing}
                    
                      ${picture && isSvg
                        ? nothing
                        : picture && !isSvg
                          ? nothing
                          : weatherSvg
                            ? html`<div slot="icon">${weatherSvg}</div>`
                            : html`<ha-state-icon slot="icon" .icon=${icon} .hass=${this.hass}></ha-state-icon>`
                      }

                      ${badgeIcon || badgeText ? html`
                        <div class="mushic-badge"
                             style=${styleMap({
                               "--mushic-badge-size": finalBadgeSize,
                               "--mushic-badge-icon-size": finalBadgeIconSize,
                               "--mushic-badge-color": badgeCssColor,
                               "--mushic-badge-icon-color": badgeIconColor, 
                             })}
                        >
                          ${badgeText
                            ? html`<span>${badgeText}</span>`
                            : html`<ha-icon .icon=${badgeIcon}></ha-icon>`}
                        </div>
                      ` : nothing}
                    </ha-tile-icon>
                    `
                  : nothing}
                ${primary || secondary
                  ? html`
                      <ha-tile-info id="info">
                        <span slot="primary">${primary}</span>
                        <span slot="secondary">${secondary}</span>
                      </ha-tile-info>
                    `
                  : nothing}
              </div> `
            : nothing}
            
          ${features.length > 0
            ? html`
              <hui-card-features
                .hass=${this.hass}
                .context=${featureContext}
                .position=${featurePosition}
                .features=${features}
              ></hui-card-features>
              `
            : nothing}
        </div>
      </ha-card>
    `;
  }
  
static styles = powerCardStyles;
}
