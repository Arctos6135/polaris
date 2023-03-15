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
  <div class="cube rounded-lg {toggled ? 'bg-[blue]' : 'bg-text'}" />
</button>

<style>
  .cube {
    height: 80%;
    width: 80%;
    margin: 10%;
  }
</style>
