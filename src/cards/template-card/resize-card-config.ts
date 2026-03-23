import {
  any,
  array,
  assign,
  boolean,
  enums,
  object,
  optional,
  string,
  union,
} from "superstruct";
import { ActionConfig, actionConfigStruct, LovelaceCardConfig } from "../../ha";
import { LovelaceCardFeatureConfig } from "../../ha/panels/lovelace/card-features/types";
import { lovelaceCardConfigStruct } from "../../shared/config/lovelace-card-config";
import { layoutStruct } from "../../utils/layout";

export type ResizeCardConfig = LovelaceCardConfig & {
  entity?: string;
  area?: string;
  // Content
  primary?: string;
  secondary?: string;
  color?: string;
  icon?: string;
  picture?: string;
  // Badges
  badge_icon?: string;
  badge_text?: string;
  badge_color?: string;
  badge_icon_color?: string;
  // Sizes
  tile_size?: string;
  icon_size?: string;
  badge_size?: string;
  badge_icon_size?: string;
  // Text Style
  primary_text_size?: string;
  primary_text_weight?: string;
  primary_text_color?: string;
  primary_line_height?: string;
  primary_letter_spacing?: string;
  secondary_text_size?: string;
  secondary_text_weight?: string;
  secondary_text_color?: string;
  secondary_line_height?: string;
  secondary_letter_spacing?: string;
  // Style
  vertical?: boolean;
  multiline_secondary?: boolean;
  // Interactions
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  icon_tap_action?: ActionConfig;
  icon_hold_action?: ActionConfig;
  icon_double_tap_action?: ActionConfig;
  // Features
  features?: LovelaceCardFeatureConfig[];
  features_position?: "bottom" | "inline";
  // Entity IDs for template
  entity_id?: string | string[];
  // Backwards compatibility from legacy template card
  /**
   * @deprecated Use color instead
   */
  icon_color?: string;
  /**
   * @deprecated Use vertical instead
   */
  layout?: string;
  /**
   * @deprecated Use grid_options instead
   */
  fill_container?: boolean;
};

export const resizeCardConfigStruct = assign(
  lovelaceCardConfigStruct,
  object({
    // Context
    entity: optional(string()),
    area: optional(string()),
    // Content
    primary: optional(string()),
    secondary: optional(string()),
    color: optional(string()),
    icon: optional(string()),
    picture: optional(string()),
    // Badges
    badge_icon: optional(string()),
    badge_text: optional(string()),
    badge_color: optional(string()),
    badge_icon_color: optional(string()),
    // Sizes
    tile_size: optional(string()),
    icon_size: optional(string()),
    badge_size: optional(string()),
    badge_icon_size: optional(string()),
    // Text Style
    primary_text_size: optional(string()),
    primary_text_weight: optional(string()),
    primary_text_color: optional(string()),
    primary_line_height: optional(string()),
    primary_letter_spacing: optional(string()),
    secondary_text_size: optional(string()),
    secondary_text_weight: optional(string()),
    secondary_text_color: optional(string()),
    secondary_line_height: optional(string()),
    secondary_letter_spacing: optional(string()),
    // Style
    vertical: optional(boolean()),
    multiline_secondary: optional(boolean()),
    // Interactions
    tap_action: optional(actionConfigStruct),
    hold_action: optional(actionConfigStruct),
    double_tap_action: optional(actionConfigStruct),
    icon_tap_action: optional(actionConfigStruct),
    icon_hold_action: optional(actionConfigStruct),
    icon_double_tap_action: optional(actionConfigStruct),
    // Features
    features: optional(array(any())),
    features_position: optional(enums(["bottom", "inline"])),
    // Entity IDs for template
    entity_id: optional(union([string(), array(string())])),
    // Backwards compatibility from legacy template card
    icon_color: optional(string()),
    layout: optional(string()),
    fill_container: optional(boolean()),
  })
);

export const migrateResizeCardConfig = (
  config: ResizeCardConfig
): ResizeCardConfig => {
  const newConfig = { ...config };
  if (newConfig.icon_color) {
    delete newConfig.icon_color;
    if (newConfig.color == null) {
      newConfig.color = config.icon_color;
    }
  }
  if (newConfig.layout) {
    delete newConfig.layout;
    if (newConfig.vertical == null) {
      newConfig.vertical = config.layout === "vertical";
    }
  }
  delete newConfig.fill_container;
  return newConfig;
};

export const resizeCardNeedsMigration = (
  config: ResizeCardConfig
): boolean => {
  return Boolean(config.icon_color || config.layout || config.fill_container);
};
