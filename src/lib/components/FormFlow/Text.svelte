<script lang="ts">
  import type { Text } from "$lib/types";
  import { activeResponses } from "$lib/store";
  import { getContext } from "svelte";
  const id = getContext<number>("id");
  export let component: Text;
  export let error: string | undefined;
  $: {
    if ($activeResponses[id].data[component.id] === undefined) {
      $activeResponses[id].data[component.id] = "";
    }
    const text = $activeResponses[id].data[component.id] as string;
    if (text.length > component.maxlength) {
      error = `Text can't be longer then ${component.maxlength} characters`;
    } else if (
      text.match(`[${component.charset}]*`)?.at(0)?.length != text.length
    ) {
      error = `Text can only contain the characters ${component.charset}`;
    } else {
      error = undefined;
    }
  }
</script>

<input
  class="rounded-md bg-background text-text border-2 border-text/30"
  type="text"
  bind:value={$activeResponses[id].data[component.id]}
/>
