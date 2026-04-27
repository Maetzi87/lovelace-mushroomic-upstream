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

  // --- ICON ---
  icon?: string;
  picture?: string;
  color?: string;
  icon_size?: string;
  icon_origin?: string;
  icon_rotation?: string;  
  icon_clip_path?: string;
  
  // --- SHAPE ---
  shape_color?: string;
  shape_size?: string;  
  shape_opacity?: string;
  shape_hover_opacity?: string;
  shape_border?: string;

  // --- TEXT ---
  primary?: string;
  primary_color?: string;  
  primary_font_size?: string;
  primary_font_weight?: string;
  primary_font_variant?: string;  
  primary_line_height?: string;
  primary_letter_spacing?: string;
  primary_text_align?: string;
  primary_text_shadow?: string;
  
  secondary?: string;
  secondary_color?: string;  
  secondary_font_size?: string;
  secondary_font_weight?: string;
  secondary_font_variant?: string;
  secondary_line_height?: string;
  secondary_letter_spacing?: string;
  secondary_text_align?: string;
  secondary_text_shadow?: string;

  text_gap?: string;
  
  // --- BADGE ---
  badge_icon?: string;
  badge_color?: string;
  badge_text?: string;
  
  badge_size?: string;
  badge_margin_top?: string;    
  badge_margin_right?: string; 
  
  badge_icon_size?: string;
  badge_icon_color?: string;
  badge_icon_origin?: string;  
  badge_icon_rotation?: string;
  badge_icon_clip_path?: string; 
  
  badge_text_size?: string;     
  badge_text_color?: string;

  // --- CARD STYLING ---
  card_height?: string;
  card_width?: string;
  card_bg_color?: string;
  
  border?: string; 
  border_width?: string;    
  border_style?: string; 
  border_color?: string;
  
  border_radius?: string;  
  card_padding?: string;     
  content_gap?: string;      
  card_shadow?: string;
  vertical?: boolean;
  ripple_color?: string;

  // --- OVERLAY ---
  overlay_icon?: string;
  overlay_color?: string;
  overlay_opacity?: string;
  overlay_size?: string;
  overlay_margin?: string;
  overlay_origin?: string;
  overlay_rotation?: string;
  overlay_clip_path?: string;

  // --- ANIMATIONS ---
  animation_color?: string;
  icon_animation?: string;
  shape_animation?: string;
  badge_animation?: string;
  badge_icon_animation?: string;
  overlay_animation?: string;
  keyframes?: string;

  // --- INTERACTIONS ---
  tap_action?: ActionConfig;
  hold_action?: ActionConfig;
  double_tap_action?: ActionConfig;
  icon_tap_action?: ActionConfig;
  icon_hold_action?: ActionConfig;
  icon_double_tap_action?: ActionConfig;

  // --- FEATURES ---
  features?: LovelaceCardFeatureConfig[];
  features_position?: "bottom" | "inline";
  features_color?: string;
  features_height?: string;   
  features_padding?: string;
  features_gap?: string;

  // --- TEMPLATE ENTITIES ---
  entity_id?: string | string[];
};

export const templateCardConfigStruct = assign(
  lovelaceCardConfigStruct,
  object({
    // --- CONTEXT ---
    entity: optional(string()),
    area: optional(string()),

    // --- ICON ---
    icon: optional(string()),
    picture: optional(string()),
    color: optional(string()),
    icon_size: optional(string()),
    icon_origin: optional(string()),
    icon_rotation: optional(string()),    
    icon_clip_path: optional(string()),

    // --- SHAPE ---
    shape_color: optional(string()),
    shape_size: optional(string()),
    shape_opacity: optional(string()),
    shape_hover_opacity: optional(string()),
    shape_border: optional(string()),

    // --- TEXT ---
    primary: optional(string()),
    primary_color: optional(string()),
    primary_font_size: optional(string()),
    primary_font_weight: optional(string()),
    primary_font_variant: optional(string()),    
    primary_line_height: optional(string()),
    primary_letter_spacing: optional(string()),
    primary_text_align: optional(string()),
    primary_text_shadow: optional(string()),

    secondary: optional(string()),
    secondary_color: optional(string()),
    secondary_font_size: optional(string()),
    secondary_font_weight: optional(string()),
    secondary_font_variant: optional(string()),    
    secondary_line_height: optional(string()),
    secondary_letter_spacing: optional(string()),
    secondary_text_align: optional(string()),
    secondary_text_shadow: optional(string()),

    text_gap: optional(string()),

    // --- BADGE ---
    badge_icon: optional(string()),
    badge_color: optional(string()),
    badge_text: optional(string()),
    badge_size: optional(string()),
    badge_icon_size: optional(string()),
    badge_icon_color: optional(string()),
    badge_icon_origin: optional(string()),
    badge_icon_rotation: optional(string()),
    badge_icon_clip_path: optional(string()),
    badge_text_size: optional(string()),     
    badge_text_color: optional(string()),
    badge_margin_top: optional(string()),    
    badge_margin_right: optional(string()), 

    // --- CARD STYLING ---
    card_height: optional(string()),
    card_width: optional(string()),    
    card_bg_color: optional(string()),
    
    border: optional(string()),
    border_width: optional(string()),      
    border_style: optional(string()),      
    border_color: optional(string()), 
    
    border_radius: optional(string()),      
    card_padding: optional(string()),      
    content_gap: optional(string()),         
    card_shadow: optional(string()),
    vertical: optional(boolean()),
    ripple_color: optional(string()),

    // --- OVERLAY ---
    overlay_icon: optional(string()),
    overlay_color: optional(string()),
    overlay_opacity: optional(string()),
    overlay_size: optional(string()),
    overlay_margin: optional(string()),
    overlay_origin: optional(string()),
    overlay_rotation: optional(string()),
    overlay_clip_path: optional(string()),

    // --- ANIMATIONS ---
    animation_color: optional(string()),
    icon_animation: optional(string()),
    shape_animation: optional(string()),
    badge_animation: optional(string()),
    badge_icon_animation: optional(string()),
    overlay_animation: optional(string()),
    keyframes: optional(string()),

    // --- INTERACTIONS ---
    tap_action: optional(actionConfigStruct),
    hold_action: optional(actionConfigStruct),
    double_tap_action: optional(actionConfigStruct),
    icon_tap_action: optional(actionConfigStruct),
    icon_hold_action: optional(actionConfigStruct),
    icon_double_tap_action: optional(actionConfigStruct),

    // --- FEATURES ---
    features: optional(array(any())),
    features_position: optional(enums(["bottom", "inline"])),
    features_color: optional(string()), 
    features_height: optional(string()),  
    features_padding: optional(string()), 
    features_gap: optional(string()),

    // --- TEMPLATE ENTITIES ---
    entity_id: optional(union([string(), array(string())])),
  })
);
