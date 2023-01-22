<script>
  import "../theme.css";
  import "@skeletonlabs/skeleton/styles/all.css";
  import "../app.postcss";
  import { AppBar, Toast, Modal, LightSwitch } from "@skeletonlabs/skeleton";
  import { responseQueue } from "$lib/store";
  import { onMount } from "svelte";
  import { pwaInfo } from "virtual:pwa-info";
  import { fetch, handle, supabase } from "$lib/supabase";
  import BottomBar from "$lib/components/BottomBar.svelte";

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

      fetch();
      function sync() {
        setTimeout(async () => {
          if ($responseQueue.length != 0) {
            const ids = $responseQueue.map((response) => response.id);
            await supabase
              .from("responses")
              .insert($responseQueue)
              .then((response) => {
                if (handle(response)) {
                  $responseQueue = $responseQueue.filter(
                    (response) => !ids.includes(response.id)
                  );
                }
              });
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
<Nav class="hidden sm:flex">
  <svelte:fragment slot="lead">
    <strong class="text-2xl">Polaris</strong>
  </svelte:fragment>
  <svelte:fragment slot="trail">
    <a class="btn btn-md" href="/">Home</a>
    <a class="btn btn-base" href="/scan">Scan QR</a>
    {#if $admin}<a class="btn btn-base" href="/admin">Admin</a>{/if}
        >Sign Out</button
      >{/if}
  </svelte:fragment>
</Nav>
<div class="flex-grow">
<slot />
</div>
<BottomBar />
</div>