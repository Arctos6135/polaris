<script lang="ts">
  import type { Toggle } from "$lib/types";
  import { activeResponses } from "$lib/store";
  import { SlideToggle } from "@skeletonlabs/skeleton";
  import { getContext } from "svelte";

  $: if ($activeResponses[id].data[component.id] === undefined) {
    $activeResponses[id].data[component.id] = 0;
  }
  const id = getContext<number>("id");
  export let component: Toggle;
  let checked = $activeResponses[id].data[component.id] == 1;
</script>

<SlideToggle
  bind:checked
  on:change={() => ($activeResponses[id].data[component.id] = checked ? 1 : 0)}
/>
