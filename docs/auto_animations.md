# 💫 Auto-Animations for [Mushroomic Icons](https://github.com/Maetzi87/mushroomic-icons)

Some **Mushroomic Icons** include built‑in automatic animations when used inside **Mushroomic Power Card**.</br>
Icons marked as **Colorable** allow customizing the animation color via `animation_color`.</br>
Icons with **Badge** also show animation when used in badge.

## 📺 Screen Animation

![Screen Animation](examples/auto-animations/gif/screen-animation.gif)

| Icons                                                           | Colorable             | Badge | Disable animation |
|-----------------------------------------------------------------|-----------------------|----------------|-------------------|
| - mushic:cellphone </br>- mushic:laptop </br>- mushic:monitor </br>- mushic:tablet </br>- mushic:television </br>- mushic:television-classic | ✔ | ❌ | `icon_animation: none` |

[**Screen animation code examples** →](examples/auto-animations/examples.md#screen-animation)

---

## ❗ Alert Animations

| Animation | Icons                                                           | Colorable             | Badge | Disable animation |
| --------- |-----------------------------------------------------------------|-----------------------|---------------- |-------------------|
| ![mushic:fire/water](examples/auto-animations/gif/fire-water.gif) | - mushic:fire </br>- mushic:water  | ✔  | ✔</br><sub> (without overlay icon)</sub> | <pre>icon_animation: none </br>shape_animation: none </br>overlay_icon: none </br>overlay_animation: none</pre> |
| ![mushic:bell-ring](examples/auto-animations/gif/bell-ring.gif) | mushic:bell-ring  | ✔  | ✔ | `icon_animation: none` |
| ![mushic:door](examples/auto-animations/gif/door.gif) | mushic:door  | ✔  | ✔ | `icon_animation: none` |


[**Alert animations code examples** →](examples/auto-animations/examples.md#alert-animations)

