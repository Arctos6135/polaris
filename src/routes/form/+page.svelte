<script lang="ts">
  import { response, form } from "$lib/store";
  import FormFlow from "$lib/components/FormFlow/index.svelte";
  import FormsList from "$lib/components/FormsList.svelte";
</script>

{#if $form && $response}
  <!--This should be the component that shows the actual form questions-->
  <!--I assume its not working right now because form isn't set-->
  <FormFlow />
{:else}
  <FormsList />
{/if}
