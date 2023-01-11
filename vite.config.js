import { sveltekit } from "@sveltejs/kit/vite";
import { SvelteKitPWA } from "@vite-pwa/sveltekit";

/** @type {import('vite').UserConfig} */
const config = {
  plugins: [
    sveltekit(),
    SvelteKitPWA({
      strategies: "injectManifest",
      filename: "sw.ts",
      srcDir: "src",
      kit: { adapterFallback: "index.html" },
      manifest: {},
    }),
  ],
};

export default config;
