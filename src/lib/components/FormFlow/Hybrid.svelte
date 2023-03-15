<script lang="ts">
  import { activeResponses } from "$lib/store";
  import { getContext } from "svelte";
  const id = getContext<number>("id");
  export let coneId: string;
  export let cubeId: string;
  const types = [undefined, "cone", "cube"] as const;
  export let type: "cone" | "cube" | undefined;
  function toggle() {
    type = types[(types.indexOf(type) + 1) % 3];
    if (type == "cone") {
      ($activeResponses[id].data[coneId] as number) += 1;
    } else if (type == "cube") {
      ($activeResponses[id].data[coneId] as number) -= 1;
      ($activeResponses[id].data[cubeId] as number) += 1;
    } else {
      ($activeResponses[id].data[cubeId] as number) -= 1;
    }
  }
</script>

<button
  class="bg-background aspect-square border border-text border-separate"
  on:click={toggle}
>
  {#if type == "cone"}
    <div class="cone w-full h-full" />
  {:else if type == "cube"}
    <div class="cube rounded-lg" />
  {/if}
</button>

<style>
  .cone {
    clip-path: polygon(50% 10%, 80% 90%, 20% 90%);
    background: yellow;
  }
  .cube {
    height: 80%;
    width: 80%;
    margin: 10%;
    background: blue;
  }
</style>
