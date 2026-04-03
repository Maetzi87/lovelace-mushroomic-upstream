console.log("Mushic Icon Registry LOADED");
import { customIconset } from "../../ha";
import { mushicIcons } from "./mushic-icons";

customIconset("mushic", {
  async getIcon(name: string) {
    const path = mushicIcons[name];
    if (!path) return undefined;

    try {
      const resp = await fetch(path);
      if (!resp.ok) return undefined;
      return await resp.text();
    } catch {
      return undefined;
    }
  },

  getIconList() {
    return Object.keys(mushicIcons);
  }
});
