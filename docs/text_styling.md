# ✒️ Text Styling – Options

## Editor
Only basic text options are available in the editor (yet).

| Editor Options          | Default            | Template | Allowed Units / Formats        | Description |
|-------------------------|--------------------|----------|--------------------------------|-------------|
| `primary`               | `Hello, {{user}}`  | ✔        | text / template                | Primary text |
| `secondary`             | `How are you?`     | ✔        | text / template                | Secondary text |
| `multiline_secondary`   | `false`            | ❌       | boolean                        | Allow multiline secondary text |

---

## YAML
Advanced text styling options need to be set in YAML.  All of them are **template‑aware** and optional. </br>

### Primary Text

| YAML Options             | Default                             | Allowed Units / Formats        | Description |
|--------------------------|-------------------------------------|--------------------------------|-------------|
| `primary_color`          | `var(--primary-text-color)`           | hex, rgb(), rgba(), var()      | Primary text color |
| `primary_font_size`      | `var(--ha-font-size-m, 14px)`       | px, rem, %, calc()             | Primary font size |
| `primary_font_weight`    | `var(--ha-font-weight-medium, 500)` | number, `bold`, `normal`       | Primary font weight |
| `primary_font_variant`   | `normal`                            | CSS font‑variant               | Primary font variant (eg. `small‑caps`) |
| `primary_line_height`    | `var(--ha-line-height-normal, 1.6)` | number, px, rem                | Primary line height |
| `primary_letter_spacing` | `0.1px`                            | px, em                         | Primary letter spacing |
| `primary_text_align`     | `left`                              | `left`, `center`, `right`      | Primary text alignment |
| `primary_text_shadow`    | `none`                              | CSS text‑shadow                | Primary text shadow |

---

### Secondary Text

| YAML Options               | Default                                | Allowed Units / Formats        | Description |
|----------------------------|----------------------------------------|--------------------------------|-------------|
| `secondary_color`          | `var(--secondary-text-color)`          | hex, rgb(), rgba(), var()      | Secondary text color |
| `secondary_font_size`      | `var(--ha-font-size-s, 12px)`          | px, rem, %, calc()             | Secondary font size |
| `secondary_font_weight`    | `var(--ha-font-weight-normal, 400)`    | number, `bold`, `normal`       | Secondary font weight |
| `secondary_font_variant`   | `normal`                               | CSS font‑variant               | Secondary font variant (eg. `small‑caps`) |
| `secondary_line_height`    | `var(--ha-line-height-condensed, 1.2)` | number, px, rem                | Secondary line height |
| `secondary_letter_spacing` | `0.4px`                                | px, em                         | Secondary letter spacing |
| `secondary_text_align`     | `left`                                 | `left`, `center`, `right`      | Secondary text alignment |
| `secondary_text_shadow`    | `none`                                 | CSS text‑shadow                | Secondary text shadow |

---

### Shared Text Options

| YAML Options           | Default  | Allowed Units / Formats        | Description |
|------------------------|----------|--------------------------------|-------------|
| `text_gap`             | 0px      | px, rem, %, calc()             | Gap between primary and secondary text |


