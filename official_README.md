# 🍄 Mushroomic Cards - Mushroom on steroids

[![Mushroomic Cards Demo](/docs/examples/demo.png)](/docs/examples/demo.md)

---
## 📖 What this is

Mushroomic Power Card builds on the clean, elegant design language of the popular Mushroom ecosystem, but focuses on **extended customization**, **template‑driven styling**, and **fine‑grained control** over typography and sizing.

Mushroomic Cards mimic the familiar Mushroom look while adding the flexibility many users (including me) have been missing.

---

## 🌟 Features

- 🎨 **Style EVERYTHING** - completely **without cardmod!!**  
- 📐 **Full control** over all sizes and colors
- ✒️ **Advanced font styling** (size, weight, color, spacing, line height)
- 🧩 **Overlay icons** for dual animations and overlay effects   
- 💫 **AUTO-ANIMATIONS** for many [_Mushroomic Icons_](https://github.com/Maetzi87/mushroomic-icons)
- 🔎 **Automatic scaling** - no need to set every size manually
- 📝 **Template support** for all visual fields

---

## 🧰 Installation

Mushroomic is completely independent and can be installed alongside Mushroom without conflicts.  
Your existing Mushroom cards will continue to work as usual.

### HACS (Custom Repository)

1. Open **HACS** in Home Assistant  
2. Go to **Integrations → Custom repositories**  
3. Add this repository URL:  
   https://github.com/maetzi87/lovelace-mushroomic-cards
4. Select **Category: Lovelace**  
5. Click **Add**  
6. Install **Mushroomic Power Card** from the HACS list  
7. Make sure the resource is added automatically (HACS usually handles this)
8. If the resource is not added automatically, add it manually under Settings → Dashboards → Resources.

### Manual Installation

1. Download the `mushroomic.js` file from the latest release.
2. Place the file into your `config/www/lovelace-mushroomic-cards/` folder.
3. Add the resource to your Dashboard:

**Using UI:**  
_Settings → Dashboards → More Options → Resources → Add Resource_  
URL: `/local/lovelace-mushroomic-cards/mushroomic.js`  
Type: `JavaScript Module`

**Using YAML:**
```yaml
resources:
  - url: /local/lovelace-mushroomic-cards/mushroomic.js
    type: module

```
---

## 🔧 Available Options

The Mushroomic Resize Card supports a wide range of fields.  
Fields marked **Template** accept Jinja‑style Home Assistant templates.


### 🖥️ Basic Options (Editor-friendly)

All variables are optional.

| Option                     | Default        | Template | Allowed Units / Formats | Description |
|---------------------------|----------------|----------|--------------------------|-------------|
| `entity`                  | —              | ❌       | —                        | Entity used for actions and context |
| `area`                    | —              | ❌       | —                        | Area context for features |
| `primary`                 | —              | ✔        | text / template          | Primary text content |
| `secondary`               | —              | ✔        | text / template          | Secondary text content |
| `color`                   | —              | ✔        | hex, rgb(), rgba(), var() | Icon/shape color |
| `icon`                    | —              | ✔        | any installed icon       | Icon |
| `picture`                 | —              | ✔        | URL                      | Picture URL instead of icon |
| `badge_icon`              | —              | ✔        | any installed icon       | Badge icon |
| `badge_text`              | —              | ✔        | text / template          | Badge text (overrides icon) |
| `badge_color`             | —              | ✔        | hex, rgb(), rgba(), var() | Badge background color |
| `badge_icon_color`        | —              | ✔        | hex, rgb(), rgba(), var() | Badge icon color |
| `shape_size`               | `"36px"`       | ✔        | px, rem, %, calc()       | Size of shape behind icon |
| `badge_size`              | `32% of tile`  | ✔        | px, rem, %, calc()       | Badge size override |
| `content_layout`          | `"horizontal"` | ❌       | horizontal / vertical    | Layout selector |
| `multiline_secondary`     | `false`        | ❌       | true / false             | Allow multiline secondary text |
| `features_position`       | `"bottom"`     | ❌       | bottom / inline          | Position of feature row |
| `features`                | —              | ❌       | list                     | List of card features |
| `tap_action`              | `"more-info"`* | ❌       | action object            | Card tap action |
| `hold_action`             | `"none"`       | ❌       | action object            | Card hold action |
| `double_tap_action`       | `"none"`       | ❌       | action object            | Card double-tap action |
| `icon_tap_action`         | auto*           | ❌       | action object            | Icon tap action |
| `icon_hold_action`        | `"none"`       | ❌       | action object            | Icon hold action |
| `icon_double_tap_action`  | `"none"`       | ❌       | action object            | Icon double-tap action |

\* Default only when `entity` is set.


### 🎨 Advanced Options - Unleash the _Power_ of Power-Card (currently YAML-only)

These options are fully supported but must be set manually in YAML.
(Wiki in progress)

- [Icon Styling](/docs/icon_styling.md)
- Text Styling
- Card Styling
- Badge Styling
- Animations
- ...

---

## 📝 Example YAML
<img width="289" height="85" alt="image" src="https://github.com/user-attachments/assets/b9333cfb-bb52-412a-af27-6dea46f8060a" />

```yaml
type: custom:mushroomic-power-card
entity: sensor.sensor_bad_temperatur
icon: mdi:thermometer
color: purple
icon_tap_action:
  action: more-info
primary: "{{ state_attr(entity, 'friendly_name') }}"
secondary: "{{ states(entity) }}"
shape_size: 40px
badge_icon: mdi:eye
badge_color: |
  {% if states(config.entity) | float(0) > 17 %} #34eb3d
  {% else %} rgb(52, 103, 235)
  {% endif %}
```

---

❤️ Credits

A huge thanks to piitaya for the original Mushroom concept and design language that made this project possible.  
Mushroomic is an independent extension that expands these ideas with additional customization options.

