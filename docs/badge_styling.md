# 🎨 Icon Styling - Options

## Editor
Only basic styling options are available in the editor (yet).

| Editor Options          | Default                     | Template | Allowed Units / Formats        | Description |
|-------------------------|-----------------------------|----------|--------------------------------|-------------|
| `icon`                  | —                           | ✔        | any installed icon             | Icon to display |
| `picture`               | —                           | ✔        | URL                            | Replaces icon with picture |
| `color`                 | `var(--state-inactive-color)` | ✔        | hex, rgb(), rgba(), var()      | Icon color |
| `shape_size`            | `36px`                        | ✔        | px, rem, %, calc()             | Size of icon background* |
| `icon_tap_action`       | auto**                        | ❌       | action object                  | Tap action for icon |
| `icon_hold_action`      | `none`                        | ❌       | action object                  | Hold action for icon |
| `icon_double_tap_action`| `none`                        | ❌       | action object                  | Double‑tap action for icon |

<sub>*Shape is only visible if icon-action, shape_color or shape_opacity is set
</br>
**Default icon action depending on entity (toggle for light, more-info for sensor etc...) </sub>

## YAML
Advanced styling options need to be set in yaml. All of them are **template-aware** and optional.

| YAML Options           | Default                      | Allowed Units / Formats        | Description |
|------------------------|------------------------------|--------------------------------|-------------|
| `icon_size`            | autoscaling </br><sub>(66.6% of shape_size)</sub>         | px, rem, %, calc()             | Icon Size |
| `icon_origin`          | `'50% 50%'`                    | CSS transform-origin           | Transform origin of Icon (for animations and rotation)|
| `icon_rotation`        | `0deg`                       | deg, turn, rad                 | Icon rotation |
| `icon_clip_path`       | `none`                        | CSS clip-path                  | Clip mask for icon |
| `shape_color`          | color                       | hex, rgb(), rgba(), var()      | Icon background color |
| `shape_opacity`        | `'0.2'`                        | numeric 0–1                    | Icon background opacity |
| `shape_hover_opacity`  | `'0.35'`                       | numeric 0–1                    | Icon background hover opacity |
| `shape_border`         | `none`                         | shorthand (width style color)  | Border around the icon background |

# 🧩 Overlay Icon - Options
The overlay icon can be used for dual animations or static overlays. Overlay is yaml-only, all variables are **template-aware** and optional.
| YAML Options           | Default                      | Allowed Units / Formats        | Description |
|------------------------|------------------------------|--------------------------------|-------------|
| `overlay_icon`         | —*                         | any installed icon             | Overlay icon |
| `overlay_color`        | color                        | hex, rgb(), rgba(), var()      | Overlay color |
| `overlay_opacity`      | 1                            | numeric 0–1                    | Overlay opacity |
| `overlay_size`         | Size of icon                    | px, rem, %, calc()             | Overlay size |
| `overlay_margin`       | `'0 0 0 0'`                    | px, rem, %, calc()             | Overlay margin (top right bottom left) |
| `overlay_origin`       | `'50% 50%'`                    | CSS transform-origin           | Transform origin of overlay (for animations and rotation)|
| `overlay_rotation`     | `0deg`                       | deg, turn, rad                 | Overlay rotation |
| `overlay_clip_path`    | `none`                         | CSS clip-path                  | Clip mask for overlay |

<sub> *Some Mushroomic Icons have auto-overlays, set 'overlay_icon: none' to disable </sub>

# 💫 Animation Options
For animation variables see [animations](/docs/animations.md).
