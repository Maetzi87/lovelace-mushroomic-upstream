console.log("Mushic Icon Registry LOADED");

import { customIconset } from "../../ha";
import iconList from "./mushic-icons.json";

let mushicIcons: Record<string, string> = {};

const basePath = (() => {
  try {
    const url = new URL(import.meta.url);
    const parts = url.pathname.split("/");
    const idx = parts.indexOf("community");

    if (idx !== -1) {
      return `/local/community/${parts[idx + 1]}`;
    }
  } catch {}

  return "/local/community/lovelace-mushroomic-upstream";
})();

for (const [name, file] of Object.entries(iconList)) {
  mushicIcons[name] = `${basePath}/icons/mushic/${file}`;
}

console.log("Mushic icons loaded:", mushicIcons);

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
