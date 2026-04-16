/* --- AUTO OVERLAY ICONS --- */

export const AUTO_OVERLAY_MAP: Record<string, string> = {
  "mdi:cellphone": "mushic:blank",
  "mdi:laptop": "mushic:blank",
  "mdi:monitor": "mushic:blank",
  "mdi:tablet": "mushic:blank",
  "mdi:television": "mushic:blank",
  "mdi:television-classic": "mushic:blank",

  "mushic:ceiling-fan-center": "mushic:ceiling-fan-blades",
  "mushic:ceiling-fan-wind": "mushic:ceiling-fan-blades",
  
  "mushic:printer": "mushic:paper",
};

const alertAnimation = {
  icon: "mushic-offset-blink 1.5s ease-in-out infinite",
  shape: "mushic-ping 1.5s infinite, mushic-offset-blink 2s ease-in-out infinite",
};

/* --- AUTO ANIMATIONS --- */

/* ICON */

export const AUTO_ANIMATIONS: Record<
  string,
  Partial<{
    icon: string;
    shape: string;
    screen: string;
    screenMask: {
      width: string;
      height: string;
      top: string;
      left: string;
    };
  }>
> = {
  /* Screen flicker */
  "mdi:cellphone": {
    screen:     "mushic-flicker 500ms linear infinite",
    screenMask: { width: "41.666%", height: "58.333%", top: "20.833%", left: "29.166%" }
  },
  "mdi:laptop": {
    screen:     "mushic-flicker 500ms linear infinite",
    screenMask: { width: "66.666%", height: "41.666%", top: "25%", left: "16.666%" }
  },
  "mdi:monitor": {
    screen:     "mushic-flicker 500ms linear infinite",
    screenMask: { width: "75%", height: "50%", top: "16.666%", left: "12.5%" }
  },
  "mdi:tablet": {
    screen:     "mushic-flicker 500ms linear infinite",
    screenMask: { width: "58.333%", height: "50%", top: "25%", left: "20.833%" }
  },
  "mdi:television": {
    screen:     "mushic-flicker 500ms linear infinite",
    screenMask: { width: "75%", height: "50%", top: "20.833%", left: "12.5%" }
  },
  "mdi:television-classic": {
    screen:     "mushic-flicker 500ms linear infinite",
    screenMask: { width: "54.166%", height: "41.666%", top: "37.5%", left: "16.666%" }
  },

  /* Alert */
  "mdi:fire":  alertAnimation,
  "mdi:water": alertAnimation,

  /* Misc */
  "mushic:air-freshener":    { icon: "mushic-air 3s ease-in-out infinite",  }, 
  "mushic:robot-vacuum":     { icon: "mushic-vacuum 10s linear infinite",   },
  "mushic:door":             { icon: "mushic-door 6s ease-in-out infinite", },
  
  /* Fan */
  "mushic:fan":              { icon: "mushic-rotate 1.5s linear infinite", },
  "mushic:ceiling-fan-wind": { icon: "mushic-wind-forward 1s ease-in-out infinite", },
};

/* OVERLAY */

export const AUTO_OVERLAY_ANIMATIONS: Record<string, string> = {
  "mushic:ceiling-fan-blades": "mushic-blade-rotation 0.3s linear infinite",
};  

/* BADGE */

export const AUTO_BADGE_ANIMATIONS: Record<string, string> = {
  "mdi:battery-high": "mushic-charge 3s steps(1) infinite",
  // beliebig erweiterbar
};

/* --- HELPER --- */
/* Auto-Overlay-Icon*/

export function getAutoOverlay(icon?: string): string | undefined {
  if (!icon) return undefined;
  return AUTO_OVERLAY_MAP[icon];
}

/* Icon-Animation*/
export function getAutoAnimations(icon?: string) {
  if (!icon) return {};
  return AUTO_ANIMATIONS[icon] || {};
}

/* Overlay-Animation */
export function getAutoOverlayAnimation(overlayIcon?: string): string | undefined {
  if (!overlayIcon) return undefined;
  return AUTO_OVERLAY_ANIMATIONS[overlayIcon];
}

/* Badge-Animation */
export function getAutoBadgeAnimation(badgeIcon?: string): string | undefined {
  if (!badgeIcon) return undefined;
  return AUTO_BADGE_ANIMATIONS[badgeIcon];
}
