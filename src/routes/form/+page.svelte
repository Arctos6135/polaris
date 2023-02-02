<script lang="ts">
  import { activeResponses } from "$lib/store";
  import FormFlow from "$lib/components/FormFlow/index.svelte";
  import { page } from "$app/stores";

  $: response = $activeResponses[parseInt($page.params.id)];
</script>

<FormFlow id={response.id} />
