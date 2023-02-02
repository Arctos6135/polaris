<script lang="ts">
  import { code, responseQueue } from "$lib/store";
  import ResponseQr from "$lib/components/ResponseQR.svelte";

  $: response = $responseQueue.find((response) => response.id === $code);
</script>

{#if response}
  <ResponseQr {response} />
  <div class="text-center">
    <button class="btn btn-base btn-filled-primary">Scanned</button>
  </div>
{/if}
