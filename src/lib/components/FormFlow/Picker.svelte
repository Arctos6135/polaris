<script lang="ts">
  import type { Picker } from "$lib/types";
  import { activeResponses } from "$lib/store";
  import { getContext } from "svelte";

  const id = getContext<number>("id");
  export let component: Picker;
</script>

<select bind:value={$activeResponses[id].data[component.valueID]}>
  {#each component.options as option (option)}
    <option value={option}>{option}</option>
  {/each}
</select>
