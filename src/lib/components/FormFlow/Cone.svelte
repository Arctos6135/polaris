<script lang="ts">
  import { activeResponses } from "$lib/store";
  import { getContext } from "svelte";
  const id = getContext<number>("id");
  export let dataId: string;
  export let toggled: boolean;
  function toggle() {
    toggled = !toggled;
    ($activeResponses[id].data[dataId] as number) += toggled ? 1 : -1;
  }
</script>

<button
  class="bg-background aspect-square border border-text border-separate"
  on:click={toggle}
>
  <div class="cone w-full h-full {toggled ? 'bg-[yellow]' : 'bg-text'}" />
</button>

<style>
  .cone {
    clip-path: polygon(50% 10%, 80% 90%, 20% 90%);
  }
</style>
