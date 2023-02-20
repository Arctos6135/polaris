<script>
  import "../app.postcss";
  import { responseQueue, lastGet, theme } from "$lib/store";
  import { onMount } from "svelte";
  import { page } from "$app/stores";
  import { pwaInfo } from "virtual:pwa-info";
  import { append, get } from "$lib/sheet";

  onMount(async () => {
    if (pwaInfo) {
      const { registerSW } = await import("virtual:pwa-register");
      registerSW({
        immediate: true,
        onRegistered(r) {
          r && r.update();
          console.log(`SW Registered: ${r}`);
        },
        onRegisterError(error) {
          console.log("SW registration error", error);
        },
      });
    }

    if (Date.now() - $lastGet > 60 * 60 * 1000) {
      get();
    }
    function sync() {
      setTimeout(async () => {
        if ($responseQueue.length != 0) {
          const ids = $responseQueue.map((response) => response.id);
          if (await append($responseQueue)) {
            $responseQueue = $responseQueue.filter(
              (response) => !ids.includes(response.id)
            );
          }
        }
        sync();
      }, 6000);
    }
    // sync();
  });

  $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : "";
  const themes = ["arctos", "arctos light"];
</script>

<svelte:head>
  {@html webManifest}
</svelte:head>
<div
  data-theme={$page.url.pathname.endsWith("code") ? "arctos light" : $theme}
  class="flex flex-col h-full bg-background"
>
  <div class="flex items-center bg-background">
    <a href="/" class="text-2xl font-bold ml-2 text-text">Polaris</a>
    <div class="ml-auto flex gap-2">
      <a
        class="bg-primary my-2 px-2 text-white hover:bg-primary/90 rounded-md shadow-sm inline-flex items-center justify-center"
        href="/scan">Scan QR</a
      >
      <button
        class="bg-primary my-2 px-2 text-white hover:bg-primary/90 rounded-md shadow-sm"
        on:click={get}>Get Data</button
      >
      <select class="bg-background text-text rounded-md m-2" bind:value={$theme}
        >{#each themes as theme}<option value={theme}>{theme}</option
          >{/each}</select
      >
    </div>
  </div>
  <div class="flex-grow bg-background">
    <slot />
  </div>
</div>
