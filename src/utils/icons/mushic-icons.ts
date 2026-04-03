console.log("Mushic Icon Registry LOADED");

import { customIconset } from "../../ha";

// Dynamische Icon-Liste
let mushicIcons: Record<string, string> = {};

// Basis-Pfad automatisch bestimmen
const basePath = (() => {
  try {
    const url = new URL(import.meta.url);
    const parts = url.pathname.split("/");
    const idx = parts.indexOf("community");

    // Wenn HACS-Installation erkannt wird
    if (idx !== -1) {
      return `/local/community/${parts[idx + 1]}`;
    }
  } catch {}

  // Fallback (Repo-Name anpassen falls nötig)
  return "/local/community/mushroomic-cards-upstream";
})();

// Icons automatisch scannen
async function loadIcons() {
  try {
    const resp = await fetch(`${basePath}/icons/mushic/`);
    const text = await resp.text();

    // Alle .svg-Dateien extrahieren
    const matches = [...text.matchAll(/href="([^"]+\.svg)"/g)];
    const files = matches.map((m) => m[1]);

    mushicIcons = Object.fromEntries(
      files.map((file) => [
        file.replace(".svg", ""),
        `${basePath}/icons/mushic/${file}`,
      ])
    );

    console.log("Mushic icons loaded:", mushicIcons);
  } catch (e) {
    console.error("Failed to auto-scan mushic icons", e);
  }
}

loadIcons();

// Iconset bei HA registrieren
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
