/* --- AUTO OVERLAY ICONS --- */

export const AUTO_OVERLAY_MAP: Record<string, string> = {
  "mushic:cellphone":          "mushic:blank",
  "mushic:laptop":             "mushic:blank",
  "mushic:monitor":            "mushic:blank",
  "mushic:tablet":             "mushic:blank",
  "mushic:television":         "mushic:blank",
  "mushic:television-classic": "mushic:blank",

  "mushic:fire":  "mushic:alert",
  "mushic:water": "mushic:alert",

  "mushic:ceiling-fan-center":       "mushic:ceiling-fan-blades",
  "mushic:ceiling-fan-wind":         "mushic:ceiling-fan-blades",
  "mushic:ceiling-fan-wind-variant": "mushic:ceiling-fan-blades",

  "mushic:frenchie": "mushic:no-motion",
  
  "mushic:printer": "mushic:paper",

  "mushic:washing-machine-wash": "mushic:washing-machine-waves",
  "mushic:washing-machine-spin": "mushic:washing-machine-drum",
};

/* --- AUTO ANIMATIONS --- */

const alertAnimation = {
  icon:  "mushic-blink 1.5s ease-in-out infinite",
  shape: "mushic-ping 1.5s infinite, mushic-blink 1.5s ease-in-out infinite",
  badge: true
};

/* ICON */
export const AUTO_ANIMATIONS: Record<
  string,
  Partial<{
    icon: string;
    icon_origin: string;
    shape: string;
    badge: boolean;
    screen: string;
    screenMask: {
      width: string;
      height: string;
      top: string;
      left: string;
    };
  }>
> = {
  /* -- SCREENS -- */
  "mushic:cellphone": {
    screen:     "mushic-flicker 500ms linear infinite",
    screenMask: { width: "41.666%", height: "58.333%", top: "20.833%", left: "29.166%" }
  },
  "mushic:laptop": {
    screen:     "mushic-flicker 500ms linear infinite",
    screenMask: { width: "66.666%", height: "41.666%", top: "25%", left: "16.666%" }
  },
  "mushic:monitor": {
    screen:     "mushic-flicker 500ms linear infinite",
    screenMask: { width: "75%", height: "50%", top: "16.666%", left: "12.5%" }
  },
  "mushic:tablet": {
    screen:     "mushic-flicker 500ms linear infinite",
    screenMask: { width: "58.333%", height: "50%", top: "25%", left: "20.833%" }
  },
  "mushic:television": {
    screen:     "mushic-flicker 500ms linear infinite",
    screenMask: { width: "75%", height: "50%", top: "20.833%", left: "12.5%" }
  },
  "mushic:television-classic": {
    screen:     "mushic-flicker 500ms linear infinite",
    screenMask: { width: "54.166%", height: "41.666%", top: "37.5%", left: "16.666%" }
  },

  /* -- ALERT -- */
  "mushic:bell-ring": { icon: "mushic-ring 4s linear infinite", icon_origin: "50% 15%",  badge: true },
  "mushic:door":      { icon: "mushic-door 6s ease-in-out infinite", icon_origin: "30%", badge: true },
  "mushic:fire":      alertAnimation,
  "mushic:water":     alertAnimation,

  /* -- AIR -- */
  "mushic:air-freshener":         { icon: "mushic-air 3s ease-in-out infinite",   badge: true }, 
  "mushic:air-freshener-variant": { icon: "mushic-air 3s ease-in-out infinite",   badge: true }, 
  "mushic:air-purifier":          { icon: "mushic-purify 1.5s steps(1) infinite", badge: true } ,
  "mushic:radiator":              { icon: "mushic-heat 1s ease-out infinite",     badge: true } ,

  /* Fan */
  "mushic:ceiling-fan-wind":         { icon: "mushic-wind-forward 1s ease-in-out infinite" },
  "mushic:ceiling-fan-wind-variant": { icon: "mushic-wind-forward 1s ease-in-out infinite" },
  "mushic:fan":                      { icon: "mushic-rotate 800ms linear infinite", badge: true },

  /* -- CONNECTION -- */
  "mushic:access-point": { icon: "mushic-send 1.5s infinite",               badge: true },
  "mushic:wifi":         { icon: "mushic-good-signal 3s steps(1) infinite", badge: true },
  
  /* -- DEVICES -- */
  "mushic:dishwasher":   { icon: "mushic-bounce 1.5s ease-in-out infinite, mushic-dishwash 1s steps(1) infinite", icon_origin: "50% 75%", badge: true },
  "mushic:printer":      { icon: "mushic-print 5s infinite"                       },
  "mushic:robot-vacuum": { icon: "mushic-vacuum 10s linear infinite", badge: true },

  /* -- MISC -- */
  "mushic:battery-high": { icon: "mushic-charge 3s steps(1) infinite", badge: true     },
  "mushic:frenchie":     { icon: "mushic-huh 4s ease infinite", icon_origin: "40% 70%" },

  /* -- WATER -- */
  "mushic:water-boiler":      { shape: "mushic-glow 5s ease-in-out infinite", badge: true },
  "mushic:water-boiler-auto": { shape: "mushic-glow 5s ease-in-out infinite", badge: true },
  "mushic:water-heater":      { shape: "mushic-glow 5s ease-in-out infinite", badge: true },

  /* Washing Machine */
  "mushic:washing-machine-wash":  { icon: "mushic-shake 800ms ease-in-out infinite, mushic-bubble 4s steps(1) infinite",     icon_origin: "50% 110%" },
  "mushic:washing-machine-spin":  { icon: "mushic-shake 400ms ease-in-out infinite",                                         icon_origin: "50% 110%" },
  "mushic:washing-machine-rinse": { icon: "mushic-shake 800ms ease-in-out infinite, mushic-rinse 1.5s ease-in-out infinite", icon_origin: "50% 110%" },
  "mushic:tumble-dryer":          { icon: "mushic-shake 800ms ease-in-out infinite, mushic-dry 2s ease-in infinite",         icon_origin: "50% 110%" },
};

/* OVERLAY */
export const AUTO_OVERLAY_ANIMATIONS: Record<
  string,
  Partial<{
    icon: string;
    icon_origin: string;
  }>
> = {
  "mushic:alert":                 { icon: "mushic-blink 1.5s ease-in-out infinite -750ms" },
  "mushic:ceiling-fan-blades":    { icon: "mushic-blade-rotation 0.6s linear infinite"    },
  "mushic:paper":                 { icon: "mushic-paper 5s infinite"                      },
  "mushic:no-motion":             { icon: "mushic-blink 1.5s ease-in-out infinite"        }, 
  
  "mushic:washing-machine-drum":  { icon: "mushic-rotate 0.5s linear infinite",    icon_origin: "51% 60%" },
  "mushic:washing-machine-waves": { icon: "mushic-wash 6.4s ease-in-out infinite", icon_origin: "50% 60%" },
  "mushic:washing-machine-drum-full":  { icon: "mushic-waves 6.4s ease-in-out infinite",    icon_origin: "50% 60%" },
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
  "mushic:alert-circle": { icon: "mushic-blink 1.5s ease-in-out infinite", shape: "mushic-blink 1.5s ease-in-out infinite" } ,
};

/* --- EXPORT --- */
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
  
  const badgeAnim = AUTO_BADGE_ANIMATIONS[badgeIcon];
  if (badgeAnim) return badgeAnim;

  const iconAnim = AUTO_ANIMATIONS[badgeIcon];
  if (iconAnim?.badge) {
    const { icon, icon_origin, shape } = iconAnim;
    return { icon, icon_origin, shape };
  }
  return {};
}
