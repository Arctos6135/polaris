<script>
  import "../app.postcss";
  import { responseQueue, lastGet } from "$lib/store";
  import { onMount } from "svelte";
  import { pwaInfo } from "virtual:pwa-info";
  import BottomBar from "$lib/components/BottomBar.svelte";
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
</script>

<svelte:head>
  {@html webManifest}
</svelte:head>
<div class="flex flex-col h-full">
  <div class="flex">
    <strong class="text-2xl">Polaris</strong>
    <a class="btn btn-md" href="/">Home</a>
    <a class="btn btn-base" href="/scan">Scan QR</a>
  </div>
  <div class="flex-grow">
    <slot />
  </div>
  <BottomBar />
</div>
