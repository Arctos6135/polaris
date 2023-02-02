<script lang="ts">
  import { response, form } from "$lib/store";
  import FormFlow from "$lib/components/FormFlow/index.svelte";
  import FormsList from "$lib/components/FormsList.svelte";
</script>

{#if $form && $response}
  <FormFlow />
{:else}
  <FormsList />
{/if}
