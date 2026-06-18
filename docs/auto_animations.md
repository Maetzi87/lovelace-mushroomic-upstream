# 💫 Auto-Animations for [Mushroomic Icons](https://github.com/Maetzi87/mushroomic-icons)

Some **Mushroomic Icons** include built‑in automatic animations when used inside **Mushroomic Power Card**.</br>
Icons marked as **Colorable** allow customizing the animation color via `animation_color`.</br>
Icons with a ✔ at **Badge** also show animation when used in badge.

## 📺 Screen Animation

![Screen Animation](examples/auto-animations/gif/screen-animation.gif)

| Icons                                                           | Colorable             | Badge | Disable animation |
|-----------------------------------------------------------------|-----------------------|----------------|-------------------|
| - mushic:cellphone </br>- mushic:laptop </br>- mushic:monitor </br>- mushic:tablet </br>- mushic:television </br>- mushic:television-classic | ✔ | ❌ | `icon_animation: none` |

[**Screen animation code examples** →](examples/auto-animations/examples.md#screen-animation)

---

## ⏰ Alert Animations

Alert animations **work out of the box** if the Mushroomic Icon is used - you **don't need additional code**. </br>
</br>
The "Code behind Auto-Animation" is provided for **customization** and/or to apply the animation to different icons. </br>
**Badges** use `badge_icon_animation` (≙ `icon_animation`), `badge_animation` (≙ `shape_animation`) and `badge_icon_origin` (≙ `icon_origin`).
Badges do not support overlay icons.

| Animation | Icons                                                           | Colorable             | Badge | Disable animation | Code behind Auto-Animation |
| --------- |-----------------------------------------------------------------|-----------------------|---------------- |-------------------| ---|
| ![mushic:fire](examples/auto-animations/gif/fire.gif) ![mushic:water](examples/auto-animations/gif/water.gif) | - mushic:fire </br>- mushic:water  | ✔  | ✔ | <pre>icon_animation: none </br>shape_animation: none </br>overlay_icon: none </br>overlay_animation: none</pre> | <pre><sub>icon_animation: "mushic-blink 1.5s ease-in-out infinite" </br>shape_animation: "mushic-ping 1.5s infinite, mushic-blink 1.5s ease-in-out infinite" </br>overlay_icon: mushic:alert </br>overlay_animation: "mushic-blink 1.5s ease-in-out infinite -750ms"</sub></pre> |
| ![mushic:alert-circle](examples/auto-animations/gif/alert-circle.gif) | - mushic:alert-circle | ❌  | ✔ | <pre>icon_animation: none </br>shape_animation: none </pre> | <pre><sub>icon_animation: "mushic-blink 1.5s ease-in-out infinite" </br>shape_animation: "mushic-blink 1.5s ease-in-out infinite" </pre> |
| ![mushic:bell-ring](examples/auto-animations/gif/bell-ring.gif) | mushic:bell-ring  | ❌ | ✔ | <pre>icon_animation: none</pre> | <pre><sub>icon_animation: "mushic-ring 4s linear infinite"</br>icon_origin: "50% 15%"</sub></pre> |
| ![mushic:door](examples/auto-animations/gif/door.gif) | mushic:door  | ❌  | ✔ | <pre>icon_animation: none</pre> | <pre><sub>icon_animation: "mushic-ring 4s linear infinite" </br>icon_origin: "50% 15%"</sub></pre> |

[**Alert animations code examples** →](examples/auto-animations/examples.md#alert-animations)

