import { css } from "lit";
import { weatherSVGStyles } from "../../utils/weather";
import { mushroomicKeyframes } from "../../utils/animations/keyframes";

export const powerCardStyles = [
  weatherSVGStyles,
  mushroomicKeyframes,  
  css`
      :host {
        --tile-color: var(--state-inactive-color);
        -webkit-tap-highlight-color: transparent;
      }
      
      ha-card {
        position: relative;
        z-index: 0;
        height: var(--mushic-card-height, var(--mushic-card-auto-height));
        --ha-ripple-color: var(--mushic-ripple-color, var(--mushic-icon-color, var(--state-inactive-color)));
        --ha-ripple-hover-opacity: 0.04;
        --ha-ripple-pressed-opacity: 0.12;
        transition:
          box-shadow 180ms ease-in-out,
          border-color 180ms ease-in-out;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
/*        background: var(--mushic-card-bg-color, var(--ha-card-background, var(--card-background-color))); */
        border-radius: var(--mushic-border-radius, var(--ha-card-border-radius, 12px));
        border: var(--mushic-border /*, var(--mushic-border-width, var(--ha-card-border-width, 1px)) var(--mushic-border-style, solid) var(--mushic-border-color, var(--ha-card-border-color, var(--divider-color)))*/ );
      }

      ha-card:has(.background:focus-visible) {
        --shadow-default: var(--ha-card-box-shadow, 0 0 0 0 transparent);
        --shadow-focus: var(--mushic-focus-shadow, 0 0 0 1px var(--mushic-icon-color, var(--state-inactive-color)));
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
        border-radius: var(--mushic-border-radius, var(--ha-card-border-radius, 12px));
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
        padding: var(--mushic-card-padding, 10px);
        flex: 1;
        min-width: 0;
        box-sizing: border-box;
        pointer-events: none;
        gap: var(--mushic-content-gap, 10px);
        overflow: hidden !important;
      }

      .vertical {
        flex-direction: column;
        justify-content: center;
      }
      .vertical ha-tile-info {
        width: 100%;
        flex: none;
      }

/* --- ICON CONTAINER --- */      
      ha-tile-icon {
        --tile-icon-color: var(--mushic-shape-color, var(--mushic-icon-color, var(--state-inactive-color)));
        position: relative;
        margin: -6px;
        padding: 6px;
        --mdc-icon-size: var(--mushic-final-icon-size);
        --tile-icon-opacity: 0;
        backface-visibility: hidden;
        transform-style: preserve-3d;
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

/* --- SHAPE WRAPPER FOR... --- */
      .mushic-shape-wrapper {
         position: absolute;
         inset: 0;
         margin: auto;
         width: var(--tile-icon-size);
         height: var(--tile-icon-size);
         pointer-events: none;
         z-index: 0;
         display: flex;
         align-items: center;
         justify-content: center;
         color: var(--mushic-icon-color, var(--state-inactive-color));
      }
      
      /* --- ... COLORABLE SHAPE ... --- */
      .mushic-shape {
         width: 100%;
         height: 100%;
         border-radius: 50%;
         background: var(--mushic-shape-color, var(--mushic-icon-color, var(--state-inactive-color)));
         opacity: var(--mushic-shape-opacity, 0.2);
         animation: var(--mushic-shape-animation);
         transform-origin: 50% 50%;
         transform-style: preserve-3d;
         backface-visibility: hidden;
         z-index: 0;
         border: var(--mushic-shape-border, none);
      }
      ha-tile-icon.no-shape .mushic-shape {
        opacity: 0 !important;
      }
      ha-tile-icon:hover .mushic-shape {
        opacity: var(--mushic-shape-hover-opacity, 0.35);
      }
      ha-tile-icon.weather:hover .mushic-shape {
        opacity: var(--mushic-shape-hover-opacity, 0.35);
      }
      ha-tile-icon.no-shape:hover .mushic-shape {
        opacity: 0 !important;
      }
      .mushic-shape::before {
         content: "";
         position: absolute;
         inset: 0;
         border-radius: 50%;
         box-shadow: 
         0 0 0 0 rgba(from var(--mushic-animation-color, var(--mushic-shape-color, var(--mushic-icon-color, var(--state-inactive-color)))) r g b / 0.7),
         0 0 0 0 rgba(from var(--mushic-animation-color, var(--mushic-shape-color, var(--mushic-icon-color, var(--state-inactive-color)))) r g b / 0.7) inset;
         animation: var(--mushic-shape-animation);
      }
      
      /* --- ...AND COLORABLE SVG --- */
      .mushic-shape-wrapper svg {
        position: absolute;
        width: 100%;
        height: 100%;
        color: inherit;
        z-index: 1;
        border-radius: 50%;
      }

/* --- ICON --- */
      ha-state-icon {
        color: var(--mushic-icon-color, var(--state-inactive-color));
        animation: var(--mushic-icon-animation);
        transform-origin: var(--mushic-icon-origin, 50% 50%);
        clip-path: var(--mushic-icon-clip-path, none);
        position: relative;
        z-index: 2;
        backface-visibility: hidden;
        transform-style: preserve-3d;
      }

/* --- COLORABLE PICTURE if svg --- */
      .mushic-picture {
        position: absolute;
        inset: 0;
        margin: auto;
        width: var(--tile-icon-size);
        height: var(--tile-icon-size); 
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--mushic-icon-color, var(--state-inactive-color));
        z-index: 1;
      }
      .mushic-picture svg {
        width: 100%;
        height: 100%;
        color: inherit;
        fill: currentColor;
        stroke: currentColor;
      }

/* --- OVERLAY-BG for screen animations --- */
      .mushic-overlay::before {
        content: "";
        position: absolute;
        width: var(--mushic-screen-width, 0);
        height: var(--mushic-screen-height, 0);
        top: var(--mushic-screen-top, 0);
        left: var(--mushic-screen-left, 0);
        animation: var(--mushic-screen-animation);
        pointer-events: none;
      }
      
/* --- OVERLAY-ICON for dual animations --- */
      .mushic-overlay {
         position: absolute;
         top: 50%;
         left: 50%;
         width: var(--mushic-overlay-size, var(--mushic-icon-size, var(--tile-mdc-icon-size)));
         height: var(--mushic-overlay-size, var(--mushic-icon-size, var(--tile-mdc-icon-size)));
         pointer-events: none;
         z-index: 3;
         display: flex;
         align-items: center;
         justify-content: center;
         transform: translate(-50%, -50%);
      }
      .mushic-overlay-svg {
         width: 100%;
         height: 100%;
         color: var(--mushic-overlay-color, var(--mushic-icon-color, var(--state-inactive-color)));
         opacity: var(--mushic-overlay-opacity, 1);
         --mdc-icon-size: var(--mushic-overlay-size, var(--mushic-final-icon-size, var(--tile-mdc-icon-size)));
         animation: var(--mushic-overlay-animation);
         transform-origin: var(--mushic-overlay-origin, 50% 50%);
         clip-path: var(--mushic-overlay-clip-path, none);
         transform-style: preserve-3d;
         backface-visibility: hidden;
       }

/* --- BADGE --- */
      .mushic-badge {
        position: absolute;
        top: var(--mushic-badge-margin-top, 3px);
        right: var(--mushic-badge-margin-right, 3px);
        width: var(--mushic-final-badge-size);
        height: var(--mushic-final-badge-size);
        background: var(--mushic-badge-color, var(--state-inactive-color));
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        pointer-events: none;
        animation: var(--mushic-badge-animation);
        transform-origin: var(--mushic-badge-icon-origin, 50% 50%);
        clip-path: var(--mushic-badge-icon-clip-path, none);
        z-index: 4;
      }
      .mushic-badge ha-icon {
        --mdc-icon-size: var(--mushic-final-badge-icon-size);
        color: var(--mushic-badge-icon-color, var(--tile-badge-icon-color, white));
        display: flex;
        align-items: center;
        justify-content: center;
        animation: var(--mushic-badge-icon-animation);
        backface-visibility: hidden;
        transform-style: preserve-3d;
      }
      .mushic-badge span {
        font-size: var(--mushic-final-badge-text-size);
        font-weight: bold;
        color: var(--mushic-badge-text-color, var(--primary-text-color));
        line-height: 1;
      }
      
 /* --- TEXT CONTAINER --- */     
      ha-tile-info {
        position: relative;
        width: 100%;
        min-width: 0;
        transition: background-color 180ms ease-in-out;
        box-sizing: border-box;
      }
      
      ha-tile-info .mushic-primary {
        text-align: var(--mushic-primary-text-align, left);
        text-shadow: var(--mushic-primary-text-shadow, none);
        font-variant: var(--mushic-primary-font-variant, normal);
        overflow: visible !important;
      }
      ha-tile-info .mushic-secondary {
        text-align: var(--mushic-secondary-text-align, left);
        text-shadow: var(--mushic-secondary-text-shadow, none);
        font-variant: var(--mushic-secondary-font-variant, normal);
        overflow: visible !important;
      }
      
      .vertical ha-tile-info .mushic-primary {
        text-align: var(--mushic-primary-text-align, center);
      }
      .vertical ha-tile-info .mushic-secondary {
        text-align: var(--mushic-secondary-text-align, center);
      }
      ha-tile-info .mushic-primary::after {
        content: "";
        display: inline-block;
        width: calc(-1 * var(--ha-tile-info-primary-letter-spacing));
      }
      ha-tile-info .mushic-secondary::after {
        content: "";
        display: inline-block;
        width: calc(-1 * var(--ha-tile-info-secondary-letter-spacing));
      }
      
      ha-tile-info .mushic-primary:not(:only-child) {
        margin-bottom: var(--mushic-text-gap, 0px);
      }

/* --- FEATURES --- */
      hui-card-features {
        --feature-color: var(--mushic-features-color, var(--mushic-icon-color, var(--state-inactive-color)));
        padding: var(--mushic-features-padding, 0 12px 12px 12px) !important;
        --feature-height: var(--mushic-features-height, 42px) !important;
        --ha-card-feature-gap: var(--mushic-features-gap, 12px) !important;
      }
      .container.horizontal hui-card-features {
        width: calc(50% - var(--column-gap, 0px) / 2 - 12px);
        flex: none;
        --feature-height: var(--mushic-features-height, var(--mushic-final-shape-size, 36px)) !important;
        padding: var(--mushic-features-padding, 0 12px 0 0) !important;
        padding-inline-start: 0;
      }
      
      .container.feature-only {
        justify-content: flex-end;
      }
      .container.feature-only hui-card-features {
        flex: 1;
        width: 100%;
        padding: var(--mushic-features-padding, 12px 12px 12px 12px) !important;
      }
      .container.feature-only.horizontal hui-card-features {
        padding: var(--mushic-features-padding, 0 12px) !important;
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
