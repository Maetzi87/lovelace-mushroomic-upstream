/* --- AUTO OVERLAY ICONS --- */

export const AUTO_OVERLAY_MAP: Record<string, string> = {
  "mdi:cellphone":          "mushic:blank",
  "mdi:laptop":             "mushic:blank",
  "mdi:monitor":            "mushic:blank",
  "mdi:tablet":             "mushic:blank",
  "mdi:television":         "mushic:blank",
  "mdi:television-classic": "mushic:blank",

  "mushic:fire": "mushic:alert",
  "mushic:water": "mushic:alert",

  "mushic:ceiling-fan-center": "mushic:ceiling-fan-blades",
  "mushic:ceiling-fan-wind":   "mushic:ceiling-fan-blades",
  
  "mushic:printer": "mushic:paper",

  "mushic:washing-machine-bubble": "mushic:washing-machine-waves",
  "mushic:washing-machine-empty":  "mushic:washing-machine-drum",
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
    icon_origin: string;
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
  
  /* Fan */
  "mushic:ceiling-fan-wind": { icon: "mushic-wind-forward 1s ease-in-out infinite" },
  "mushic:fan":              { icon: "mushic-rotate 1.5s linear infinite" },
  
  /* Misc */
  "mushic:air-freshener":    { icon: "mushic-air 3s ease-in-out infinite"  }, 
  "mushic:robot-vacuum":     { icon: "mushic-vacuum 10s linear infinite"   },
  "mushic:door":             { icon: "mushic-door 6s ease-in-out infinite", icon_origin: "30%" },
  "mushic:dishwasher":       { icon: "mushic-bounce 1.5s ease-in-out infinite, mushic-dishwash 1s ease-in-out infinite", icon_origin: "50% 75%" },
  "mushic:printer":          { icon: "mushic-print 5s infinite" } ,
  "mushic:bell-ring":        { icon: "mushic-ring 4s linear infinite", icon_origin: "50% 15%" },
  "mushic:access-point":     { icon: "mushic-send 1.5s infinite" } ,
  "mushic:air-purifier":     { icon: "mushic-purify 1.5s steps(1) infinite" } ,
  "mushic:radiator":         { icon: "mushic-heat 1s ease-out infinite" } ,

  /* Washing Machine */
  "mushic:washing-machine-bubble": { icon: "mushic-shake 400ms ease-in-out infinite, bubble 4s steps(1) infinite", icon_origin: "50% 110%"  },
  "mushic:washing-machine-empty":  { icon: "mushic-shake 400ms ease-in-out infinite", icon_origin: "50% 110%"   },
  "mushic:washing-machine-rinse":  { icon: "mushic-shake 400ms ease-in-out infinite, mushic-rinse 1.5s ease-in-out infinite", icon_origin: "50% 110%"  },
  "mushic:tumble-dryer":           { icon: "mushic-shake 400ms ease-in-out infinite, mushic-dry 2s ease-in infinite", icon_origin: "50% 110%"  },
};

/* OVERLAY */
export const AUTO_OVERLAY_ANIMATIONS: Record<
  string,
  Partial<{
    icon: string;
    icon_origin: string;
  }>
> = {
  "mushic:ceiling-fan-blades":    { icon: "mushic-blade-rotation 0.3s linear infinite" } ,
  "mushic:paper":                 { icon: "mushic-paper 5s infinite" } ,
  "mushic:washing-machine-drum":  { icon: "mushic-spin 0.5s linear infinite", icon_origin: "50% 58%" },
  "mushic:washing-machine-waves": { icon: "mushic-wash 5s ease-in-out infinite", icon_origin: "50% 58%" },
  "mushic:alert":                 { icon: "mushic-blink 1.5s ease-in-out infinite" },
};  

/* BADGE */
export const AUTO_BADGE_ANIMATIONS: Record<
  string,
  Partial<{
    icon: string;
    icon_origin: string;
    shape: string;
  }>
> = {
  "mdi:battery-high": { icon: "mushic-charge 3s steps(1) infinite" } ,
  "mdi:alert-circle": { icon: "mushic-blink 1.2s ease-in-out infinite", shape: "mushic-blink 1.2s ease-in-out infinite" } ,
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
export function getAutoOverlayAnimation(overlayIcon?: string) {
  if (!overlayIcon) return {};
  return AUTO_OVERLAY_ANIMATIONS[overlayIcon] || {};
}

/* Badge-Animation */
export function getAutoBadgeAnimation(badgeIcon?: string) {
  if (!badgeIcon) return {};
  return AUTO_BADGE_ANIMATIONS[badgeIcon] || {};
}
