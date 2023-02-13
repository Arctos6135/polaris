<script>
  import "../app.postcss";
  import { responseQueue, lastGet, theme } from "$lib/store";
  import { onMount } from "svelte";
  import { pwaInfo } from "virtual:pwa-info";
  import { append, get } from "$lib/sheet";

  onMount(async () => {
    if (pwaInfo) {
      const { registerSW } = await import("virtual:pwa-register");
      registerSW({
        immediate: true,
        onRegistered(r) {
          r &&
            setInterval(() => {
              console.log("Checking for sw update");
              r.update();
            }, 1000 * 60 * 60 * 60);
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
    sync();
  });

  $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : "";
  const themes = ["dark", "light"];
</script>

<svelte:head>
  {@html webManifest}
</svelte:head>
<div data-theme={$theme} class="flex flex-col h-full bg-background">
  <div class="flex items-center bg-background">
    <a href="/" class="text-2xl font-bold ml-2 text-text">Polaris</a>
    <a class="text-lg ml-4 text-text" href="/scan">Scan QR</a>
    <select class="bg-background text-text rounded-md m-2" bind:value={$theme}
      >{#each themes as theme}<option value={theme}>{theme}</option
        >{/each}</select
    >
  </div>
  <hr class="w-full text-text/80" />
  <div class="flex-grow">
    <slot />
  </div>
</div>
