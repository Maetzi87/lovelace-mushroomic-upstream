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

export type TemplateCardConfig = LovelaceCardConfig & {
  entity?: string;
  area?: string;
  
  // Content
  primary?: string;
  secondary?: string;
  color?: string;
  icon?: string;
  picture?: string;
  
  // Badge
  badge_icon?: string;
  badge_text?: string;
  badge_color?: string;
  badge_icon_color?: string;
  badge_text_color?: string;
  badge_size?: string;
  badge_icon_size?: string;
  
  // Sizes
  shape_size?: string;
  icon_size?: string;
  card_height?: string;

  // Style
  shape_color?: string;
  card_bg_color?: string;
  border?: string;
  vertical?: boolean;
  
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

  // Overlay
  overlay_icon?: string;
  overlay_color?: string;
  
  // Animations
  icon_animation?: string;
  shape_animation?: string;
  badge_animation?: string;
  badge_icon_animation?: string;
  overlay_animation?: string;
  
  // Entity IDs for template
  entity_id?: string | string[];
};

export const templateCardConfigStruct = assign(
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

    // Badge
    badge_icon: optional(string()),
    badge_text: optional(string()),
    badge_color: optional(string()),
    badge_icon_color: optional(string()),
    badge_text_color: optional(string()),
    badge_size: optional(string()),
    badge_icon_size: optional(string()),

    // Sizes
    shape_size: optional(string()),
    icon_size: optional(string()),
    card_height: optional(string()),

    // Style
    shape_color: optional(string()),
    card_bg_color: optional(string()),
    border: optional(string()),
    vertical: optional(boolean()),

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

    // Overlay
    overlay_icon: optional(string()),
    overlay_color: optional(string()),

    // Animations
    icon_animation: optional(string()),
    shape_animation: optional(string()),
    badge_animation: optional(string()),
    badge_icon_animation: optional(string()),
    overlay_animation: optional(string()),

    // Entity IDs for template
    entity_id: optional(union([string(), array(string())])),
  })
);
