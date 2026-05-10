# 🃏 Card Styling – Options

## Editor
Only basic card options are available in the editor (yet).

| Editor Options          | Default                     | Template | Allowed Units / Formats    | Description |
|-------------------------|-----------------------------|----------|---------------------------|-------------|
| `vertical`              | `false`                     | ❌       | true / false              | Layout selection |
| `features_position`     | `bottom`                    | ❌       | bottom / inline           | Position of feature row |
| `features`              | —                           | ❌       | list                      | List of card features |
| `tap_action`            | `more-info`<sup>1</sup>     | ❌       | action object             | Card tap action |
| `hold_action`           | `none`                      | ❌       | action object             | Card hold action |
| `double_tap_action`     | `none`                      | ❌       | action object             | Card double-tap action |

<sub><sup>1</sup>Default only if `entity` is set.</sub>

## YAML
Card styling options are YAML‑only.  All fields are **template‑aware** and optional.

| YAML Options       | Default                                                           | Allowed Units / Formats   | Description |
|--------------------|-------------------------------------------------------------------|---------------------------|-------------|
| `card_height`      | autoscaling </br> <sub> depending on shape_size and layout </sub> | px, rem, %, calc()        | Card height |
| `card_width`       | `100%`                                                            | px, rem, %, calc()        | Card width  |
| `card_bg_color`    | `var(--ha-card-background)`  | any CSS color<sup>1</sup> or CSS gradient<sup>2</sup>          | Card background color |
| `border`           | `border_width border_style border_color`    | CSS border shorthand (width style color)   | Card border shorthand<sup>3</sup> |
| `border_width`     | `var(--ha-card-border-width, 1px)`                                | px, rem                   | Card border width |
| `border_style`     | `var(--ha-card-border-style, solid)`                              | CSS border-style          | Card border style |
| `border_color`     | `var(--ha-card-border-color, var(--divider-color))`               | any CSS color<sup>1</sup> | Card border color |
| `border_radius`    | `var(--ha-card-border-radius, var(--ha-border-radius-lg, 12px))`  | px, rem, %, calc()        | Card corner radius |
| `ripple_color`     | `color` of icon                                                   | any CSS color<sup>1</sup> | Ripple color |
| `card_padding`     | `10px`                                                            | px, rem, %, calc()        | Inner padding of the card |
| `content_gap`      | `10px`                                                            | px, rem, %, calc()        | Gap between icon and text |
| `card_shadow`      | `var(--ha-card-box-shadow, none)`                                 | CSS box-shadow            | Card shadow |
| `focus_shadow`     | `0 0 0 1px var(--mushic-icon-color)`                              | CSS box-shadow            | Focus shadow |

<sub> 
<sup>1</sup>CSS color formats: CSS color keyword (red, blue, etc.), hex(#ffffff), rgb(), rgba(), hsl(), var() </br>
<sup>2</sup>CSS gradient formats: linear-gradient(), radial-gradient(), conic-gradient()</br>
<sup>3</sup>Use shorthand OR individual border options (border_width, border_style, border_color). Shorthand overrides individual options.
</sub>

---

# 🛠 Features Styling – Options

## Editor
Only basic feature options are available in the editor (yet).

| Editor Options          | Default                     | Template | Allowed Units / Formats    | Description |
|-------------------------|-----------------------------|----------|---------------------------|-------------|
| `features_position`     | `bottom`                    | ❌       | bottom / inline           | Position of feature row<sup>1</sup> |
| `features`              | —                           | ❌       | list                      | List of card features |

<sub> 
<sup>1</sup>"features_position: inline" shows first feature only </sub>


## YAML
Feature styling options are YAML‑only.  All fields are **template‑aware** and optional.

| YAML Options       | Default for `bottom` | Default for `inline` | Allowed Units / Formats                         | Description |
|--------------------|----------------------|----------------------|-------------------------------------------------|-------------|
| `features_color`   | `color` of icon      |`color` of icon  | any CSS color<sup>1</sup> or CSS gradient<sup>2</sup>| Features color<sup>3</sup> |
| `features_height`  | `42px`               | `shape_size`         | px, rem, %, calc()                              | Features height  |
| `features_padding` | `0 12px 12px 12px`   | `0 12px 0 0`         | CSS padding (top right bottom left)             | Padding around features |
| `features_gap`     | `12px`               | —                    | px, rem, %, calc()                              | Gap between features |

<sub> 
<sup>1</sup>CSS color formats: CSS color keyword (red, blue, etc.), hex(#ffffff), rgb(), rgba(), hsl(), var() </br>
<sup>2</sup>CSS gradient formats: linear-gradient(), radial-gradient(), conic-gradient()</br>
<sup>3</sup>only applies to features without built‑in colors. Features with own color logic (light-color-temp, light-color-favorites etc.) cannot be overridden.
</sub>


---

# 🎨 Other Styling Options
- 🍄 [**Icon & Overlay Styling**](/docs/icon_styling.md)
- 🏷️ [**Badge Styling**](/docs/badge_styling.md)
- ✒️ [**Text Styling**](/docs/text_styling.md)

# 💫 Animation Options
For animation variables see [animations](/docs/animations.md).
