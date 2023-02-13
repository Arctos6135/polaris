<script lang="ts">
  import type { Picker } from "$lib/types";
  import { activeResponses } from "$lib/store";
  import { getContext } from "svelte";

  const id = getContext<number>("id");
  export let component: Picker;
</script>

<select
  class="rounded-md bg-background text-text border-2 border-text/30"
  bind:value={$activeResponses[id].data[component.id]}
>
  {#each component.options as option (option)}
    <option value={option}>{option}</option>
  {/each}
</select>
