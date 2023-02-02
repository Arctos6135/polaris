<script lang="ts">
  import { responseQueue } from "$lib/store";
  import { page } from "$app/stores";
  import ResponseQr from "$lib/components/ResponseQR.svelte";

  $: response = $responseQueue.find(
    (response) => response.id === parseInt($page.params.id)
  );
</script>

{#if response}
  <ResponseQr {response} />
  <div class="text-center">
    <button class="btn btn-base btn-filled-primary">Scanned</button>
  </div>
{/if}
