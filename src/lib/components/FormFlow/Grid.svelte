<script lang="ts">
  import type { Grid } from "$lib/types";
  import { activeResponses, fields } from "$lib/store";
  import { getContext, onMount } from "svelte";
  import Cone from "./Cone.svelte";
  import Cube from "./Cube.svelte";
  import Hybrid from "./Hybrid.svelte";
  onMount(() => {
    group.components.forEach((component) => {
      $activeResponses[id].data[component.id] ??= 0;
    });
    if (!$fields[id]) {
      $fields[id] = {};
    }
    if ($fields[id][group.id] == undefined) {
      const low: { type: "cone" | "cube" | undefined }[] = [];
      let lowCone = $activeResponses[id].data[places.lowCone] as number;
      let lowCube = $activeResponses[id].data[places.lowCube] as number;
      while (lowCone > 0) {
        low.push({ type: "cone" });
        lowCone--;
      }
      while (lowCube > 0) {
        low.push({ type: "cube" });
        lowCube--;
      }
      while (low.length < 9) {
        low.push({ type: undefined });
      }
      $fields[id][group.id] = {
        high: postitions.map((pos) => ({
          type: pos[0],
          toggled:
            $activeResponses[id].data[
              pos[0] == "cone" ? places.highCone : places.highCube
            ] >= pos[1],
        })),
        mid: postitions.map((pos) => ({
          type: pos[0],
          toggled:
            $activeResponses[id].data[
              pos[0] == "cone" ? places.midCone : places.midCube
            ] >= pos[1],
        })),
        low,
      };
    }
  });
  const id = getContext<number>("id");
  const postitions = [
    ["cone", 1],
    ["cube", 1],
    ["cone", 2],
    ["cone", 3],
    ["cube", 2],
    ["cone", 4],
    ["cone", 5],
    ["cube", 3],
    ["cone", 6],
  ] as const;
  export let group: Grid;
  $: places = {
    highCone: group.components.find(
      (component) => component.type == "cone" && component.position == "high"
    )!.id,
    highCube: group.components.find(
      (component) => component.type == "cube" && component.position == "high"
    )!.id,
    midCone: group.components.find(
      (component) => component.type == "cone" && component.position == "mid"
    )!.id,
    midCube: group.components.find(
      (component) => component.type == "cube" && component.position == "mid"
    )!.id,
    lowCone: group.components.find(
      (component) => component.type == "cone" && component.position == "low"
    )!.id,
    lowCube: group.components.find(
      (component) => component.type == "cube" && component.position == "low"
    )!.id,
  };
</script>

<div class="grid grid-cols-9 border border-text border-1">
  {#if $fields[id]?.[group.id]}
    {#each $fields[id][group.id].high as piece}
      {#if piece.type == "cone"}
        <Cone dataId={places.highCone} bind:toggled={piece.toggled} />
      {:else}
        <Cube dataId={places.highCube} bind:toggled={piece.toggled} />
      {/if}
    {/each}
    {#each $fields[id][group.id].mid as piece}
      {#if piece.type == "cone"}
        <Cone dataId={places.midCone} bind:toggled={piece.toggled} />
      {:else}
        <Cube dataId={places.midCube} bind:toggled={piece.toggled} />
      {/if}
    {/each}
    {#each $fields[id][group.id].low as piece}
      <Hybrid
        coneId={places.lowCone}
        cubeId={places.lowCube}
        bind:type={piece.type}
      />
    {/each}
  {/if}
</div>
