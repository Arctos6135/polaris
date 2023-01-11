<script lang="ts">
  import { responseQueue, forms } from "$lib/store";
  import { page } from "$app/stores";
  import ResponseQr from "$lib/components/ResponseQR.svelte";

  $: response = $responseQueue.find(
    (response) => response.id === parseInt($page.params.id)
  );
  $: form = response && $forms.find((form) => form.id === response!.form);
</script>

{#if form && response}
  <ResponseQr {response} {form} />
  <div class="text-center">
    <button class="btn btn-base btn-filled-primary">Scanned</button>
  </div>
{/if}
