# 🧩 Card Styling – Options

## Editor
Only basic styling options are available in the editor (yet).

| Editor Options          | Default                     | Template | Allowed Units / Formats    | Description |
|-------------------------|-----------------------------|----------|---------------------------|-------------|
| `vertical`              | `false`                     | ❌       | true / false              | Layout selection |
| `features_position`     | `bottom`                    | ❌       | bottom / inline           | Position of feature row |
| `features`              | —                           | ❌       | list                      | List of card features |
| `tap_action`            | `more-info`*                | ❌       | action object             | Card tap action |
| `hold_action`           | `none`                      | ❌       | action object             | Card hold action |
| `double_tap_action`     | `none`                      | ❌       | action object             | Card double-tap action |

<sub>* Default only if `entity` is set.</sub>

## YAML
Card styling options are YAML‑only.  All fields are **template‑aware** and optional.

| YAML Options       | Default                      | Allowed Units / Formats        | Description |
|--------------------|------------------------------|--------------------------------|-------------|
| `card_height`      | autoscaling </br> <sub> depending on shape_size and layout </sub>                       | px, rem, %, calc()             | Card height |
| `card_width`       | `100%`                       | px, rem, %, calc()             | Card width  |
| `card_bg_color`    | `var(--ha-card-background-color)`             | hex, rgb(), rgba(), **gradient()**      | Card background color |
| `border`           | `border_width border_style border_color` | shorthand (width style color)  | Border shorthand (overrides other border configurations) |
| `border_width`     | `var(--ha-card-border-width, 1px)`                 | px, rem                        | Border width |
| `border_style`     | `var(--ha-card-border-style, solid)`                      | CSS border-style               | Border style |
| `border_color`     | `var(--ha-card-border-color, var(--divider-color))`                  | hex, rgb(), rgba()     | Border color |
| `border_radius`    | var(--ha-card-border-radius-lg, 12px)                | px, rem, %, calc()             | Card corner radius |
| `ripple_color`     | `color` of icon                   | hex, rgb(), rgba()      | Hover color |
| `card_padding`     | `10px`                       | px, rem, %, calc()             | Inner padding of the card |
| `content_gap`      | `10px`                       | px, rem, %, calc()             | Gap between icon and text |
| `card_shadow`      | `var(--ha-card-shadow, none)`                 | CSS box-shadow                 | Card shadow |
| `focus_shadow`     | `auto`                         | CSS box-shadow                 | Hover shadow |
