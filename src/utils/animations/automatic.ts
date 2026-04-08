/* --- AUTO OVERLAY ICONS --- */

export const AUTO_OVERLAY_MAP: Record<string, string> = {
  "mushic:ceiling-fan-wind": "mushic:ceiling-fan-blades",
  "mushic:ceiling-fan-center": "mushic:ceiling-fan-blades",
  "mushic:printer": "mushic:paper",
};

const alertAnimation = {
  icon: "blink 1.5s ease-in-out infinite",
  shape: "ping 1.5s infinite, blink 1.5s ease-in-out infinite",
};

/* --- AUTO ANIMATIONS --- */

/* ICON */

export const AUTO_ANIMATIONS: Record<
  string,
  Partial<{
    icon: string;
    shape: string;
    overlay: string;
    speed: {
      attribute: string;
      direction_attr?: string;
      baseDuration: number;
      factor: number;
      minDuration: number;
      template: string;
    }
  }>
> = {
  "mushic:fire": alertAnimation,
  "mushic:water": alertAnimation,
  "mushic:air-freshener": {
    icon: "mushic-air 3s ease-in-out infinite",
  },  
  "mushic:fan": {
    speed: {
      attribute: "percentage",
      baseDuration: 2.5,
      factor: 0.02,
      minDuration: 0.2,
      template: "mushic-rotate {duration}s linear infinite",
    },
  },
  "mushic:ceiling-fan-wind": {
    speed: {
      attribute: "percentage",
      direction_attr: "direction",
      baseDuration: 1.692,
      factor: 0.012,
      minDuration: 0.2,
      template: "mushic-wind-{direction} {duration}s ease-in-out infinite",
    },
  },
};

/* OVERLAY */

export const AUTO_OVERLAY_ANIMATIONS: Record<
  string,
  Partial<{
    overlay: string;
    speed: {
      attribute: string;
      baseDuration: number;
      factor: number;
      minDuration: number;
      template: string;
    }
  }>
> = {
  "mushic:ceiling-fan-blades": {
    speed: {
      attribute: "percentage",
      baseDuration: 0.796,
      factor: 0.006,
      minDuration: 0.2,
      template: "mushic-blade-rotation {duration}s linear infinite",
    },
  },
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

export function getAutoAnimations(icon?: string, stateObj?: any) {
  if (!icon) return {};
  const base = AUTO_ANIMATIONS[icon] || {};
  const result: any = { ...base };
  if (base.speed && stateObj) {
    const attr = base.speed.attribute;
    const dirAttr = base.speed.direction_attr;
    const raw = stateObj.attributes?.[attr];
    const direction = dirAttr ? stateObj.attributes?.[dirAttr] : undefined;
    const v = raw !== undefined ? Number(raw) || 0 : 50;
    const duration = Math.max(
      base.speed.minDuration,
      base.speed.baseDuration - v * base.speed.factor
    );
    const dirToken =
      direction === "reverse"
        ? "reverse"
        : "forward";
    result.icon = base.speed.template
      .replace("{duration}", duration.toFixed(1))
      .replace("{direction}", dirToken);
  }
  return result;
}

/* Overlay-Animation */
export function getAutoOverlayAnimations(icon?: string, stateObj?: any) {
  if (!icon) return undefined;
  const base = AUTO_OVERLAY_ANIMATIONS[icon] || {};
  if (base.speed && stateObj) {
    const attr = base.speed.attribute;
    const raw = stateObj.attributes?.[attr];
    const v = raw !== undefined ? Number(raw) || 0 : 50;
    const duration = Math.max(
      base.speed.minDuration,
      base.speed.baseDuration - v * base.speed.factor
    );
    return base.speed.template.replace("{duration}", duration.toFixed(1));
  }
  return base.overlay;
}

/* Badge-Animation */
export function getAutoBadgeAnimation(badgeIcon?: string): string | undefined {
  if (!badgeIcon) return undefined;
  return AUTO_BADGE_ANIMATIONS[badgeIcon];
}
