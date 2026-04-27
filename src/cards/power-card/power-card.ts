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
  getAutoOverlayAnimation, 
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
  "icon_size",

  // --- SHAPE ---
  "shape_color",
  "shape_size",
  "shape_opacity",
  "shape_hover_opacity",
  "shape_border",

  // --- TEXT ---
  "primary",
  "primary_color",
  "primary_font_size",
  "primary_font_weight",
  "primary_font_variant",
  "primary_line_height",
  "primary_letter_spacing",
  "primary_text_align",
  "primary_text_shadow",
  
  "secondary",
  "secondary_color",
  "secondary_font_size",
  "secondary_font_weight",
  "secondary_font_variant",
  "secondary_line_height",
  "secondary_letter_spacing",
  "secondary_text_align",
  "secondary_text_shadow",

  "text_gap",
  
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
  "card_width",
  "card_bg_color",
  
  "border",
  "border_width",
  "border_style",
  "border_color",
  
  "border_radius",
  "ripple_color",
  "card_padding",
  "content_gap",
  "card_shadow",
  "focus_shadow",

  // --- OVERLAY ---
  "overlay_icon",
  "overlay_color",
  "overlay_opacity",
  "overlay_size",
  "overlay_margin",

  // --- ANIMATIONS ---
  "animation_color",
  "icon_animation",
  "icon_origin",
  "icon_clip_path",
  "shape_animation",
  "badge_animation",
  "badge_icon_animation",
  "badge_icon_origin",  
  "badge_icon_clip_path",
  "overlay_animation",
  "overlay_origin",
  "overlay_clip_path",
  "keyframes",

  // --- FEATURES ---
  "features_color",
  "features_height",
  "features_padding",
  "features_gap",
  
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
  // SVG
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

  // -- CARD HEIGHT ---
  
  public getCardSize(): number {
    const card = this.shadowRoot?.querySelector("ha-card");
    if (!card) return 1;
  
    const px = card.getBoundingClientRect().height;
    return px < 57 ? 1 : Math.ceil(px / 60);
  }

  public getGridOptions(): LovelaceGridOptions {
    let columns = 6;
    const featurePosition = this._config && this._featurePosition(this._config);
    const featuresCount = this._config?.features?.length || 0;
    if (featuresCount && featurePosition === "inline") {
      columns = 12;
    }
    const card = this.shadowRoot?.querySelector("ha-card");
    let rows = 1;
  
    if (card) {
      const px = card.getBoundingClientRect().height;
      rows = px < 57 ? 1 : Math.ceil(px / 60);
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

  private _resolveAnim(userValue: string | undefined, autoValue: string | undefined): string | undefined {
    if (userValue === "none") return "none";
    if (!userValue || userValue === "auto") return autoValue;
    return userValue;
  }
  
  protected render() {
    if (!this._config || !this.hass) {
      return nothing;
    }

    // --- ICON & SHAPE ---
    const icon = this.getValue("icon");
    let overlayIcon = this.getValue("overlay_icon") || getAutoOverlay(icon);
    const picture = this.getValue("picture");
    const color = this.getValue("color");
    const cssColor = color ? computeCssColor(color) : undefined;
    
    const shapeSize = this.getValue("shape_size");
    const shapeColor = this.getValue("shape_color");
    const shapeCssColor = shapeColor ? computeCssColor(shapeColor) : undefined;
    const iconSize = this.getValue("icon_size");
    
    const weatherSvg = getWeatherSvgIcon(icon);

    // --- OVERLAY ---
    const overlayColor = this.getValue("overlay_color");
    const overlayCssColor = overlayColor ? computeCssColor(overlayColor) : undefined;
    
    // --- TEXT ---
    const primary = this.getValue("primary");
    const secondary = this.getValue("secondary");

    const primaryTextColor = this.getValue("primary_color");
    const primaryTextCssColor = primaryTextColor ? computeCssColor(primaryTextColor) : undefined;

    const secondaryTextColor = this.getValue("secondary_color");
    const secondaryTextCssColor = secondaryTextColor ? computeCssColor(secondaryTextColor) : undefined;
    
    const primarySize = parseInt(this.getValue("primary_font_size") || "14px");
    const primaryLH = parseFloat(this.getValue("primary_line_height") || "1.6");
    
    const secondarySize = parseInt(this.getValue("secondary_font_size") || "12px");
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
    const badgeIconCssColor = badgeIconColor ? computeCssColor(badgeIconColor) : undefined;
    const badgeTextColor = this.getValue("badge_text_color");
    const badgeTextCssColor = badgeTextColor ? computeCssColor(badgeTextColor) : undefined;
    
    // --- CARD STYLING ---
    const cardHeight = this.getValue("card_height");
    const cardBgColor = this.getValue("card_bg_color");
    const cardBgCssColor = cardBgColor ? computeCssColor(cardBgColor) : undefined;
    const borderColor = this.getValue("border_color");
    const borderCssColor = borderColor ? computeCssColor(borderColor) : undefined;
    const rippleColor = this.getValue("ripple_color");
    const rippleCssColor = rippleColor ? computeCssColor(rippleColor) : undefined;

    // --- FEATURES ---
    const featuresColor = this.getValue("features_color");
    const featuresCssColor = featuresColor ? computeCssColor(featuresColor) : undefined;
    const featurePosition = this._config && this._featurePosition(this._config);
    const featuresCount = this._config?.features?.length || 0;
    
    // --- SHOW SHAPE? ---
    const shapeColorValue = this.getValue("shape_color")?.trim();
    const shapeOpacityValue = this.getValue("shape_opacity")?.trim();
    
    const showShape =
      this._hasIconAction ||
      (shapeColorValue && shapeColorValue !== "0") ||
      (shapeOpacityValue && shapeOpacityValue !== "0");

    // --- AUTO_ANIMATION
    const autoAnim = getAutoAnimations(icon);
    const autoBadgeAnim = getAutoBadgeAnimation(badgeIcon);
    const autoOverlayAnim = getAutoOverlayAnimation(overlayIcon);
    
    // --- Screen Animation (Flicker) ---
    let screenAnimation = "none";
    const userIconAnim = this.getValue("icon_animation");
    if (userIconAnim === "none") {
      screenAnimation = "none";
    } else {
      screenAnimation = autoAnim.screen ?? "none";
    }
    
    const style = {
      // --- ICON ---  
      "--mushic-icon-color": cssColor,
      
      "--mushic-shape-color": shapeCssColor,
      "--mushic-shape-opacity": this.getValue("shape_opacity"),
      "--mushic-shape-hover-opacity": this.getValue("shape_hover_opacity"),
      "--mushic-shape-border": this.getValue("shape_border"),
      
      "--mushic-final-shape-size": shapeSize || "var(--mushic-shape-size, 36px)", 
      "--mushic-final-icon-size": iconSize || "var(--mushic-icon-size, calc(var(--mushic-final-shape-size) * 0.666))",

      "--tile-color": "var(--mushic-icon-color, var(--state-inactive-color))",
      "--tile-mdc-icon-size": "var(--mushic-final-icon-size)",
      "--tile-icon-size": "var(--mushic-final-shape-size)",
    
      // --- TEXT ---
      "--ha-tile-info-primary-color": primaryTextCssColor || "var(--mushic-primary-color)",
      "--ha-tile-info-primary-font-size": this.getValue("primary_font_size") || "var(--mushic-primary-font-size)",
      "--ha-tile-info-primary-font-weight": this.getValue("primary_font_weight") || "var(--mushic-primary-font-weight)",
      "--mushic-primary-font-variant": this.getValue("primary_font_variant"),      
      "--ha-tile-info-primary-line-height": this.getValue("primary_line_height") || "var(--mushic-primary-line-height)",
      "--ha-tile-info-primary-letter-spacing": this.getValue("primary_letter_spacing") || "var(--mushic-primary-letter-spacing)",
      "--mushic-primary-text-align": this.getValue("primary_text_align"),  
      "--mushic-primary-text-shadow": this.getValue("primary_text_shadow"),
    
      "--ha-tile-info-secondary-color": secondaryTextCssColor || "var(--mushic-secondary-color)",
      "--ha-tile-info-secondary-font-size": this.getValue("secondary_font_size") || "var(--mushic-secondary-font-size)",
      "--ha-tile-info-secondary-font-weight": this.getValue("secondary_font_weight") || "var(--mushic-secondary-font-weight)",
      "--mushic-secondary-font-variant": this.getValue("secondary_font_variant"),      
      "--ha-tile-info-secondary-line-height": this.getValue("secondary_line_height") || "var(--mushic-secondary-line-height)",
      "--ha-tile-info-secondary-letter-spacing": this.getValue("secondary_letter_spacing") || "var(--mushic-secondary-letter-spacing)",
      "--mushic-secondary-text-align": this.getValue("secondary_text_align"),   
      "--mushic-secondary-text-shadow": this.getValue("secondary_text_shadow"),

      "--mushic-text-gap": this.getValue("text_gap"),
    
      // --- BADGE ---
      "--mushic-final-badge-size": badgeSize ||  "var(--mushic-badge-size, calc(var(--mushic-final-shape-size) * 0.444))",
      "--mushic-final-badge-icon-size": badgeIconSize || "var(--mushic-badge-icon-size, calc(var(--mushic-final-badge-size) * 0.75))", 
      "--mushic-final-badge-text-size": badgeTextSize || "var(--mushic-badge-text-size, calc(var(--mushic-final-badge-size) * 0.5))", 
      "--mushic-badge-color": badgeCssColor,
      "--mushic-badge-icon-color": badgeIconCssColor,
      "--mushic-badge-text-color": badgeTextCssColor,
      "--mushic-badge-margin-top": this.getValue("badge_margin_top"),
      "--mushic-badge-margin-right": this.getValue("badge_margin_right"),  
    
      // --- CARD STYLING ---
      "--mushic-card-height": this.getValue("card_height"),
      "--mushic-card-width": this.getValue("card_width"),
      "--ha-card-background": cardBgCssColor || "var(--mushic-card-bg-color)",
      "--mushic-ripple-color": rippleCssColor,
      "--mushic-border": this.getValue("border"),
      "--ha-card-border-width": this.getValue("border_width") || "var(--mushic-border-width)",
      "--ha-card-border-style": this.getValue("border_style")|| "var(--mushic-border-style)",
      "--ha-card-border-color": borderCssColor|| "var(--mushic-border-color)",
      "--ha-card-border-radius": this.getValue("border_radius") || "var(--mushic-border-radius)",
      "--mushic-card-padding": this.getValue("card_padding"),
      "--mushic-content-gap": this.getValue("content_gap"),
      "--ha-card-box-shadow": this.getValue("card_shadow") || "var(--mushic-card-shadow)",
      "--mushic-focus-shadow": this.getValue("focus_shadow"),

      
      // --- OVERLAY ---
      "--mushic-overlay-icon": overlayIcon,
      "--mushic-overlay-color": overlayCssColor,
      "--mushic-overlay-opacity": this.getValue("overlay_opacity"),
      "--mushic-overlay-size": this.getValue("overlay_size"),
      "--mushic-overlay-margin": this.getValue("overlay_margin"),

      // --- ANIMATIONS ---
      "--mushic-icon-animation": this._resolveAnim(this.getValue("icon_animation"), autoAnim.icon),
      "--mushic-icon-origin": this.getValue("icon_origin") || autoAnim.icon_origin,
      "--mushic-icon-clip-path": this.getValue("icon_clip_path"),
      "--mushic-shape-animation": this._resolveAnim(this.getValue("shape_animation"), autoAnim.shape),
      "--mushic-screen-animation": screenAnimation,
      "--mushic-badge-animation": this._resolveAnim(this.getValue("badge_animation"), autoBadgeAnim.shape),
      "--mushic-badge-icon-animation": this._resolveAnim(this.getValue("badge_icon_animation"), autoBadgeAnim.icon),
      "--mushic-badge-icon-origin": this.getValue("badge_icon_origin") || autoBadgeAnim.icon_origin,
      "--mushic-badge-icon-clip-path": this.getValue("badge_icon_clip_path"),
      "--mushic-overlay-animation": this._resolveAnim(this.getValue("overlay_animation"), autoOverlayAnim.icon),
      "--mushic-overlay-origin": this.getValue("overlay_origin") || autoOverlayAnim.icon_origin,
      "--mushic-overlay-clip-path": this.getValue("overlay_clip_path"),
      "--mushic-animation-color": this.getValue("animation_color"),

      // --- FEATURES ---
      "--mushic-features-count": featuresCount,
      "--mushic-features-color": featuresCssColor,
      "--mushic-features-height": this.getValue("features_height"),
      "--mushic-features-padding": this.getValue("features_padding"),
      "--mushic-features-gap": this.getValue("features_gap"),
      "--ha-card-feature-gap": "var(--mushic-features-gap, 12px)",
    };

    // --- SCREEN MASK ---
    if (userIconAnim === "none") {
      style["--mushic-screen-width"] = "0";
      style["--mushic-screen-height"] = "0";
      style["--mushic-screen-top"] = "0";
      style["--mushic-screen-left"] = "0";
    } else if (autoAnim.screenMask) {
      style["--mushic-screen-width"] = autoAnim.screenMask.width;
      style["--mushic-screen-height"] = autoAnim.screenMask.height;
      style["--mushic-screen-top"] = autoAnim.screenMask.top;
      style["--mushic-screen-left"] = autoAnim.screenMask.left;
    }

  // --- CALCULATE CARD HEIGHT ---
    // -- Features-Padding
    const featuresPad = this.shadowRoot?.querySelector("hui-card-features");
    let padTop = 0;
    let padBottom = 0;
    if (featuresPad) {
      const style = getComputedStyle(featuresPad);
      padTop = parseFloat(style.paddingTop);
      padBottom = parseFloat(style.paddingBottom);
    }
    
    // -- Shape --
    const shapeHeight = this._config.vertical && !icon && !picture
        ? "0px"
        : "var(--mushic-final-shape-size)";
    
    // -- Text --
    const primaryTextHeight = this._config.vertical && primary
      ? "calc(var(--ha-tile-info-primary-font-size, var(--ha-font-size-m, 14px)) * var(--ha-tile-info-primary-line-height, var(--ha-line-height-normal, 1.6)))"
      : "0px";
    const secondaryTextHeight = this._config.vertical && secondary
      ? "calc(var(--ha-tile-info-secondary-font-size, var(--ha-font-size-s, 12px)) * var(--ha-tile-info-secondary-line-height, var(--ha-line-height-condensed, 1.2)))"
      : "0px";
    const gapHeight = this._config.vertical && primary && secondary
      ? "var(--mushic-content-gap, 10px)"
      : "0px";

    // -- Content = Shape + Text --
    const contentHeight = 
      `calc(
          ${shapeHeight} + ${primaryTextHeight} + ${secondaryTextHeight} + ${gapHeight}
          + calc(var(--mushic-card-padding, 10px) * 2)
      )`;
    // -- Card Heigt = Content + Features
    const finalHeight =
      featuresCount > 0 && featurePosition === "bottom"
        ? `calc(
             ${contentHeight}
             + calc(${featuresCount} * var(--mushic-features-height, 42px))
             + calc(${Math.max(0, featuresCount - 1)} * var(--mushic-features-gap, 12px))
             + calc(${padTop} + ${padBottom})
           )`
        : contentHeight;
    
    // -- set variable for CSS
    style["--mushic-card-auto-height"] = finalHeight;

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
        ${this._injectKeyframes()}
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
                          "--tile-icon-size": "var(--mushic-final-shape-size)",
                          "--tile-mdc-icon-size": "var(--mushic-final-icon-size)"
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

                      ${overlayIcon
                        ? html`
                          <div class="mushic-overlay" slot="icon">
                            <ha-icon class="mushic-overlay-svg" .icon=${overlayIcon}></ha-icon>
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
                        <div class="mushic-badge" >
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
                      <div class="mushic-info">
                        ${primary
                          ? html`<span class="mushic-primary">${primary}</span>`
                          : nothing}
                        ${secondary
                          ? html`<span class="mushic-secondary">${secondary}</span>`
                          : nothing}
                      </div>
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
private _injectKeyframes() {
  const css = this.getValue("keyframes");
  if (!css || typeof css !== "string") return nothing;
  if (!css.trim().startsWith("@keyframes")) return nothing;
  return html`<style>${css}</style>`;
}
  
static styles = powerCardStyles;
}
