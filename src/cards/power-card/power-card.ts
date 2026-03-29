import { UnsubscribeFunc } from "home-assistant-js-websocket";
import { css, html, LitElement, nothing, PropertyValues } from "lit";
import { customElement, property, state } from "lit/decorators.js";
import { classMap } from "lit/directives/class-map.js";
import { ifDefined } from "lit/directives/if-defined.js";
import { styleMap } from "lit/directives/style-map.js";
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
import { mushroomicKeyframes } from "../../utils/keyframes";

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
  "badge_text_color",

  // --- CARD STYLING ---
  "card_height",
  "card_bg_color",
  "border",
  "ripple_color",

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
  "overlay_animation"
  
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
    if (!this._config || !this.hass) {
      return;
    }

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
    const picture = this.getValue("picture");
    const color = this.getValue("color");
    const cssColor = color ? computeCssColor(color) : undefined;
    
    const shapeSize = this.getValue("shape_size");
    const shapeColor = this.getValue("shape_color");
    const iconSize = this.getValue("icon_size");
    
    const weatherSvg = getWeatherSvgIcon(icon);
    
    // --- TEXT ---
    const primary = this.getValue("primary");
    const secondary = this.getValue("secondary");
    
    const primarySize = parseInt(this.getValue("primary_text_size") || "16");
    const primaryLH = parseFloat(this.getValue("primary_line_height") || "1.6");
    
    const secondarySize = parseInt(this.getValue("secondary_text_size") || "14");
    const secondaryLH = parseFloat(this.getValue("secondary_line_height") || "1.2");
    
    // --- BADGE ---
    const badgeIcon = this.getValue("badge_icon");
    const badgeColor = this.getValue("badge_color");
    const badgeText = this.getValue("badge_text");
    const badgeCssColor = badgeColor ? computeCssColor(badgeColor) : undefined;
    
    const badgeSize = this.getValue("badge_size");
    const badgeIconSize = this.getValue("badge_icon_size");
    const badgeIconColor = this.getValue("badge_icon_color");
    const badgeTextColor = this.getValue("badge_text_color");
    
    // --- CARD STYLING ---
    const cardHeight = this.getValue("card_height");
    const cardBgColor = this.getValue("card_bg_color");
    const border = this.getValue("border");
    
    // --- Automatic fallback scaling ---
    const finalShapeSize = shapeSize || "50px";
    const finalIconSize = iconSize || `calc(${finalShapeSize} * 0.66)`;
    const finalBadgeSize = badgeSize || `calc(${finalShapeSize} * 0.32)`;
    const finalBadgeIconSize = badgeIconSize || `calc(${finalBadgeSize} * 0.75)`;
    
    const shape = parseInt(finalShapeSize);
    
    // --- Vertical height calculation ---
    const verticalHeight = `${
      shape +
      primarySize * primaryLH +
      secondarySize * secondaryLH +
      41.6
    }px`;
    
    const finalCardHeight =
      cardHeight ||
      (this._config?.vertical
        ? verticalHeight
        : icon || picture
          ? `calc(${finalShapeSize} + 20px)`
          : `calc(36px + 20px)`);
    
    const style = {
      // --- ICON ---
      "--tile-color": cssColor,
      "--mushic-icon-color": cssColor,
      "--mushic-shape-color": shapeColor,
      "--mushic-shape-opacity": this.getValue("shape_opacity"),
      "--mushic-shape-hover-opacity": this.getValue("shape_hover_opacity"),
      "--tile-icon-size": finalShapeSize,
      "--tile-mdc-icon-size": finalIconSize,
    
      // --- TEXT ---
      "--ha-tile-info-primary-font-size": this.getValue("primary_text_size"),
      "--ha-tile-info-primary-font-weight": this.getValue("primary_text_weight"),
      "--ha-tile-info-primary-color": this.getValue("primary_text_color"),
      "--ha-tile-info-primary-line-height": this.getValue("primary_line_height"),
      "--ha-tile-info-primary-letter-spacing": this.getValue("primary_letter_spacing"),
    
      "--ha-tile-info-secondary-font-size": this.getValue("secondary_text_size"),
      "--ha-tile-info-secondary-font-weight": this.getValue("secondary_text_weight"),
      "--ha-tile-info-secondary-color": this.getValue("secondary_text_color"),
      "--ha-tile-info-secondary-line-height": this.getValue("secondary_line_height"),
      "--ha-tile-info-secondary-letter-spacing": this.getValue("secondary_letter_spacing"),
    
      // --- BADGE ---
      "--mushic-badge-size": finalBadgeSize,
      "--mushic-badge-icon-size": finalBadgeIconSize,
      "--mushic-badge-color": badgeCssColor,
      "--mushic-badge-icon-color": badgeIconColor,
      "--mushic-badge-text-color": badgeTextColor,
    
      // --- CARD STYLING ---
      "--mushic-card-height": finalCardHeight,
      "--mushic-card-bg-color": cardBgColor,
      "--mushic-card-border": border,
      "--mushic-ripple-color": this.getValue("ripple_color"),    

      // --- OVERLAY ---
      "--mushic-overlay-icon": this.getValue("overlay_icon"),
      "--mushic-overlay-color": this.getValue("overlay_color"),
      "--mushic-overlay-opacity": this.getValue("overlay_opacity"),
      "--mushic-overlay-size": this.getValue("overlay_size"),
      "--mushic-overlay-margin": this.getValue("overlay_margin"),

      // --- ANIMATIONS ---
      "--mushic-icon-animation": this.getValue("icon_animation"),
      "--mushic-shape-animation": this.getValue("shape_animation"),
      "--mushic-badge-animation": this.getValue("badge_animation"),
      "--mushic-badge-icon-animation": this.getValue("badge_icon_animation"),
      "--mushic-overlay-animation": this.getValue("overlay_animation"),
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
                          "--tile-icon-size": finalShapeSize,
                          "--tile-mdc-icon-size": finalIconSize,
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
                      .imageUrl=${picture ? this.hass.hassUrl(picture) : undefined}
                      class=${weatherSvg ? "weather" : ""}
                    >
                      <div class="mushic-shape"></div>
                      ${this.getValue("overlay_icon")
                        ? html`
                            <ha-icon
                              class="mushic-overlay"
                              .icon=${this.getValue("overlay_icon")}
                            ></ha-icon>
                          `
                        : nothing}
                      ${picture
                        ? nothing
                        : weatherSvg
                          ? html`<div slot="icon">${weatherSvg}</div>`
                          : html`<ha-state-icon
                              slot="icon"
                              .icon=${icon}
                              .hass=${this.hass}
                            ></ha-state-icon>`}
                            
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
                  .color=${cssColor}
                  .features=${features}
                  .position=${featurePosition}
                ></hui-card-features>
              `
            : nothing}
        </div>
      </ha-card>
    `;
  }

  static styles = [
    weatherSVGStyles,
    mushroomicKeyframes,
    css`
      :host {
        --tile-color: var(--state-inactive-color);
        -webkit-tap-highlight-color: transparent;
      }     
      :host > ha-card {
        --ha-ripple-color: var(--mushic-ripple-color, var(--tile-color));
        --ha-ripple-hover-opacity: 0.04;
        --ha-ripple-pressed-opacity: 0.12;
        min-height: var(--mushic-card-height);
        height: var(--mushic-card-height);
        transition:
          box-shadow 180ms ease-in-out,
          border-color 180ms ease-in-out;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        background: var(--mushic-card-bg-color, var(--ha-card-background, var(--card-background-color)));
        border: var(--mushic-card-border, var(--ha-card-border-width, 1px) solid var(--ha-card-border-color, var(--divider-color)));
      }
      ha-card:has(.background:focus-visible) {
        --shadow-default: var(--ha-card-box-shadow, 0 0 0 0 transparent);
        --shadow-focus: 0 0 0 1px var(--tile-color);
        box-shadow: var(--shadow-default), var(--shadow-focus);
      }

      [role="button"] {
        cursor: pointer;
        pointer-events: auto;
      }
      [role="button"]:focus {
        outline: none;
      }
      
      .background {
        position: absolute;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        border-radius: var(--ha-card-border-radius, 12px);
        margin: calc(-1 * var(--ha-card-border-width, 1px));
        overflow: hidden;
      }
      
      .container {
        margin: calc(-1 * var(--ha-card-border-width, 1px));
        display: flex;
        flex-direction: column;
        flex: 1;
      }
      .container.horizontal {
        flex-direction: row;
      }

      .content {
        position: relative;
        display: flex;
        flex-direction: row;
        align-items: center;
        padding: 10px;
        flex: 1;
        min-width: 0;
        box-sizing: border-box;
        pointer-events: none;
        gap: 10px;
      }

      .vertical {
        flex-direction: column;
        text-align: center;
        justify-content: center;
      }
      .vertical ha-tile-info {
        width: 100%;
        flex: none;
      }
      
      ha-tile-icon {
        --tile-icon-color: var(--mushic-shape-color, var(--tile-color));
        position: relative;
        margin: -6px;
        padding: 6px;
        --mdc-icon-size: var(--tile-mdc-icon-size);
        --tile-icon-opacity: 0;
      }
      ha-tile-icon .container {
        width: var(--tile-icon-size);
        height: var(--tile-icon-size);
      }
      ha-tile-icon.weather svg {
        width: var(--tile-icon-size) !important;
        height: var(--tile-icon-size) !important;
        display: flex;
      }
      ha-tile-icon.weather {
        --tile-icon-opacity: 0;
        --tile-icon-hover-opacity: 0;
        --tile-icon-border-radius: 0;
      }
      
      .mushic-shape {
        position: absolute;
        top: 50%;
        left: 50%;
        width: var(--tile-icon-size);
        height: var(--tile-icon-size);
        transform: translate(-50%, -50%);
        border-radius: 50%;
        background: var(--mushic-shape-color, var(--tile-color));
        opacity: var(--mushic-shape-opacity, 0.2);
        animation: var(--mushic-shape-animation);
        z-index: 0;
        pointer-events: none;
      }
      ha-tile-icon:hover .mushic-shape {
        opacity: var(--mushic-shape-hover-opacity, 0.35);
      }
      ha-tile-icon.weather:hover .mushic-shape {
        opacity: var(--mushic-shape-hover-opacity, 0.35);
      }

      ha-state-icon {
        color: var(--mushic-icon-color, var(--tile-color));
        animation: var(--mushic-icon-animation);
        position: relative;
        z-index: 2;
      }

      .mushic-overlay {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        color: var(--mushic-overlay-color, var(--tile-color));
        opacity: var(--mushic-overlay-opacity, 1);
        --mdc-icon-size: var(--mushic-overlay-size, var(--tile-mdc-icon-size));
        margin: var(--mushic-overlay-margin, 0px);
        animation: var(--mushic-overlay-animation);
        z-index: 3;
        pointer-events: none;
      }
      
      .mushic-badge {
        position: absolute;
        top: 3px;
        right: 3px;
        width: var(--mushic-badge-size);
        height: var(--mushic-badge-size);
        background: var(--mushic-badge-color, var(--secondary-text-color));;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        animation: var(--mushic-badge-animation);
        z-index: 4;
      }
      .mushic-badge ha-icon {
        --mdc-icon-size: var(--mushic-badge-icon-size);
        color: var(--mushic-badge-icon-color, white);
        display: flex;
        align-items: center;
        justify-content: center;
        animation: var(--mushic-badge-icon-animation);
      }
      .mushic-badge span {
        font-size: calc(var(--mushic-badge-size) * 0.5);
        font-weight: bold;
        color: var(--mushic-badge-text-color, white);
        line-height: 1;
      }
      
      ha-tile-info {
        position: relative;
        min-width: 0;
        transition: background-color 180ms ease-in-out;
        box-sizing: border-box;
      }
      
      hui-card-features {
        --feature-color: var(--tile-color);
        padding: 0 12px 12px 12px;
      }
      .container.horizontal hui-card-features {
        width: calc(50% - var(--column-gap, 0px) / 2 - 12px);
        flex: none;
        --feature-height: 36px;
        padding: 0 12px;
        padding-inline-start: 0;
      }
      
      .container.feature-only {
        justify-content: flex-end;
      }
      .container.feature-only hui-card-features {
        flex: 1;
        width: 100%;
        padding: 12px 12px 12px 12px;
      }
      .container.feature-only.horizontal hui-card-features {
        padding: 0 12px;
      }
      .container.horizontal .content:not(:has(ha-tile-info)) {
        flex: none;
      }
      .container.horizontal:not(:has(ha-tile-info)) hui-card-features {
        width: auto;
        flex: 1;
      }
      .container.horizontal:not(:has(ha-tile-info)) .content {
        flex: none;
      }
    `,
  ];
}

declare global {
  interface HTMLElementTagNameMap {
    "mushroomic-power-card": MushroomicPowerCard;
  }
}
