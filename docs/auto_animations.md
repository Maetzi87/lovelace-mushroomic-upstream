# Auto-Animations for [Mushroomic Icons](https://github.com/Maetzi87/mushroomic-icons)

Several Mushroomic Icons bring automatic animations if used in Mushroomic Power Card. </br>
For those labeled with **Colorable** the animation color can be customized using `animation_color`.

## Screen Animation
![Screen Animation](examples/auto-animations/screen-animation.gif)

| Icons                                              | Colorable               | Disable animation |
|-----------------------------------------------------------------|-----------------------|--------------|
| - mushic:cellphone</br> - mushic:laptop </br> - mushic:monitor</br> - mushic:tablet</br> - mushic:television</br> - mushic:television-classic | ✔ | `icon_animation: none` |

<details> <summary>Examples for screen animation </summary>
  
| Animation Preview                                               | Icon               | Example code |
|-----------------------------------------------------------------|--------------------|--------------|
| ![mushic:cellphone](examples/auto-animations/cellphone.gif)     | `mushic:cellphone` | <pre>type: custom:mushroomic-power-card</br>icon: mushic:cellphone</br>color: purple</br>vertical: true</br>icon_tap_action:</br>  action: more-info</pre> |
| ![mushic:laptop](examples/auto-animations/laptop.gif)           | `mushic:laptop`    | <pre>type: custom:mushroomic-power-card</br>icon: mushic:laptop</br>color: purple</br>shape_color: blue</br>vertical: true</br>icon_tap_action:</br>  action: more-info</pre> |
| ![mushic:monitor](examples/auto-animations/monitor.gif)           | `mushic:monitor`    | <pre>type: custom:mushroomic-power-card</br>icon: mushic:monitor</br>color: purple</br>animation_color: red</br>vertical: true</br>icon_tap_action:</br>  action: more-info</pre> |
| ![mushic:tablet](examples/auto-animations/tablet.gif)           | `mushic:tablet`    | <pre>type: custom:mushroomic-power-card</br>icon: mushic:tablet</br>color: purple</br>shape_color: yellow</br>animation_color: black</br>vertical: true</br>icon_tap_action:</br>  action: more-info</pre> |
| ![mushic:television](examples/auto-animations/television.gif)   | `mushic:television` | <pre>type: custom:mushroomic-power-card</br>icon: mushic:television</br>color: purple</br>shape_color: turquoise</br>animation_color: var(--mushic-icon-color)</br>vertical: true</br>icon_tap_action:</br>  action: more-info</pre> |
| ![mushic:television-classic](examples/auto-animations/television-classic.gif) | `mushic:television-classic` | <pre>type: custom:mushroomic-power-card</br>icon: mushic:television-classic</br>color: purple</br>vertical: true</br>icon_tap_action:</br>  action: more-info</pre> |

</details>
