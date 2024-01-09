<script lang="ts">
  import { code, responseQueue } from "$lib/store";
  import ResponseQr from "$lib/components/ResponseQR.svelte";

  function remove() {
    $responseQueue = $responseQueue.filter((response) => response.id !== $code);
    $code = $responseQueue.at(0)?.id || null;
  }
  $: response = $responseQueue.find((response) => response.id === $code);
</script>

{#if response}
  <div class="w-full flex flex-col">
    <ResponseQr {response} />
    <div class="text-center">
      <button
        class="bg-primary rounded-md p-2 text-white shadow-sm hover:bg-primary/90"
        on:click={remove}>Scanned</button
      >
    </div>
  </div>
{/if}

