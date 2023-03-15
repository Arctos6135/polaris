<script lang="ts">
  import type { Section } from "$lib/types";
  import Input from "./Input.svelte";
  import Row from "./Row.svelte";
  import Grid from "./Grid.svelte";
  import { draggable } from "@neodrag/svelte";
  export let section: Section;
  export let errors: Record<string, string | undefined> = {};
  $: timer = section.groups.find(
    (group) => group.type == "input" && group.component.type === "timer"
  );
</script>

<div class="flex flex-col">
  {#each section.groups.filter((group) => !(group === timer)) as group (group)}
    {#if group.type == "row"}
      <Row bind:error={errors[group.id]} {group} />
    {:else if group.type == "grid"}
      <Grid {group} />
    {:else}
      <div class="flex justify-center">
        <Input bind:error={errors[group.component.id]} {group} />
      </div>
    {/if}
  {/each}
</div>
{#if timer?.type === "input"}
  <div
    class="bg-secondary fixed rounded-xl p-2"
    use:draggable={{ bounds: "body", defaultPosition: { x: 0, y: 100 } }}
  >
    <Input bind:error={errors[timer.component.id]} group={timer} />
  </div>
{/if}
