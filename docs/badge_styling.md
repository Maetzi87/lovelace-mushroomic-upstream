# 🏷️ Badge Styling - Options

## Editor
Only basic styling options are available in the editor (yet).
</br>Badge is only visible if badge_icon is set.

| Editor Options     | Default                                             | Template | Allowed Units / Formats   | Description |
|--------------------|-----------------------------------------------------|----------|---------------------------|-------------|
| `badge_icon`       | —                                                   | ✔        | any installed icon        | Badge icon |
| `badge_text`       | —                                                   | ✔        | text / template           | Badge text (overrides icon) |
| `badge_color`      | var(--state-inactive-color)                         | ✔        | hex, rgb(), rgba(), var() | Badge background color |
| `badge_size`       | autoscaling </br> <sub>(44.4% of shape_size)</sub>  | ✔        | px, rem, %, calc()        | Badge size |

## YAML
Advanced styling options need to be set in yaml. All of them are **template-aware** and optional.

| YAML Options            | Default                                         | Allowed Units / Formats        | Description |
|-------------------------|-------------------------------------------------|--------------------------------|-------------|
| `badge_icon_size`       | autoscaling </br><sub>(75% of badge_size)</sub> | px, rem, %, calc()             | Size of badge icon |
| `badge_text_size`       | autoscaling </br><sub>(50% of badge_size)</sub> | px, rem, %, calc()             | Font size of badge text |
| `badge_icon_color`      | `white`                                         | hex, rgb(), rgba(), var()      | Badge icon color |
| `badge_text_color`      | `var(--primary-text-color)`                     | hex, rgb(), rgba(), var()      | Badge text color |
| `badge_icon_origin`     | `'50% 50%'`    | CSS transform-origin           | Transform origin of badge icon (for animations and rotation) |
| `badge_icon_rotation`   | `'0deg'`                                        | deg, turn, rad                 | Badge icon rotation |
| `badge_icon_clip_path`  | `'none'`                                        | CSS clip-path                  | Clip mask for badge icon |
| `badge_margin_top`      | `'3px'`                                         | px, rem, %, calc()             | Margin top |
| `badge_margin_right`    | `'3px'`                                         | px, rem, %, calc()             | Margin right |

# 💫 Animation Options
For animation variables see [animations](/docs/animations.md).
