<script>
  import "../theme.css";
  import "@skeletonlabs/skeleton/styles/all.css";
  import "../app.postcss";
  import { AppBar, Toast, Modal, LightSwitch } from "@skeletonlabs/skeleton";
  import { admin, loggedin } from "$lib/store";
  import { onMount } from "svelte";
  import { logout } from "$lib/auth";
  import { pwaInfo } from "virtual:pwa-info";
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
  });

  $: webManifest = pwaInfo ? pwaInfo.webManifest.linkTag : "";
</script>

<svelte:head>
  {@html webManifest}
</svelte:head>
<div class="flex flex-col h-full">
<AppBar class="hidden sm:flex">
  <svelte:fragment slot="lead">
    <strong class="text-2xl">Polaris</strong>
  </svelte:fragment>
  <svelte:fragment slot="trail">
    <a class="btn btn-md" href="/">Home</a>
    {#if !$loggedin}
      <a class="btn btn-base" href="/login">Log In</a>
      <a class="btn btn-base" href="/register">Register</a>
    {/if}
    {#if $loggedin}<a class="btn btn-base" href="/scan">Scan QR</a>{/if}
    {#if $admin}<a class="btn btn-base" href="/admin">Admin</a>{/if}
    {#if $loggedin}<button class="btn btn-base" on:click={logout}
        >Sign Out</button
      >{/if}
    <LightSwitch />
  </svelte:fragment>
</AppBar>
<div class="flex-grow">
<slot />
</div>
<Toast />
<Modal />
<BottomBar />
</div>