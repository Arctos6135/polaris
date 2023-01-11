<script lang="ts">
  import { activeResponses, forms } from "$lib/store";
  import FormFlow from "$lib/components/FormFlow/index.svelte";
  import { page } from "$app/stores";

  $: response = $activeResponses[parseInt($page.params.id)];
  $: form = response && $forms.find((form) => form.id == response.form);
</script>

{#if form}
  <FormFlow {form} id={response.id} />
{:else}
  <div class="text-error-500 text-center text-3xl">Response not found</div>
{/if}
