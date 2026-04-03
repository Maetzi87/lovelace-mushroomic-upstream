import fs from "fs";
import path from "path";
import {
  getBabelInputPlugin,
  getBabelOutputPlugin,
} from "@rollup/plugin-babel";
import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import nodeResolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import typescript from "@rollup/plugin-typescript";
import serve from "rollup-plugin-serve";

const dev = process.env.ROLLUP_WATCH;

const serveOptions = {
  contentBase: ["./dist"],
  host: "0.0.0.0",
  port: 4000,
  allowCrossOrigin: true,
  headers: {
    "Access-Control-Allow-Origin": "*",
  },
};

const plugins = [
  {
    name: "generate-mushic-icon-list",
    buildStart() {
      const iconDir = path.resolve("icons/mushic");
      const files = fs.readdirSync(iconDir)
        .filter((f) => f.endsWith(".svg"));

      const out = {};
      for (const file of files) {
        const name = file.replace(".svg", "");
        out[name] = file;
      }

      fs.writeFileSync(
        path.resolve("src/utils/icons/mushic-icons.json"),
        JSON.stringify(out, null, 2)
      );

      console.log(`Generated mushic-icons.json with ${files.length} icons`);
    }
  },
  typescript({
    declaration: false,
  }),
  nodeResolve(),
  json(),
  commonjs(),
  getBabelInputPlugin({
    babelHelpers: "bundled",
  }),
  getBabelOutputPlugin({
    presets: [
      [
        "@babel/preset-env",
        {
          modules: false,
        },
      ],
    ],
    compact: true,
  }),
  ...(dev ? [serve(serveOptions)] : [terser()]),
];

export default [
  {
    input: "src/mushroomic.ts",
    output: {
      dir: "dist",
      format: "es",
      inlineDynamicImports: true,
    },
    plugins,
    onwarn: (warning, warn)=>{
      // Ignore circular dependency warnings from culori library
      if (warning.code === "CIRCULAR_DEPENDENCY" && warning.ids?.some(id => id.includes("node_modules/culori"))) {
        return;
      }
      warn(warning);
    },
    moduleContext: (id) => {
      const thisAsWindowForModules = [
        "node_modules/@formatjs/intl-utils/lib/src/diff.js",
        "node_modules/@formatjs/intl-utils/lib/src/resolve-locale.js",
      ];
      if (thisAsWindowForModules.some((id_) => id.trimRight().endsWith(id_))) {
        return "window";
      }
    },
  },
];
