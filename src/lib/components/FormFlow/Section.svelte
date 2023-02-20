<script lang="ts">
  import type { Section } from "$lib/types";
  import Group from "./Group.svelte";
  import { draggable } from "@neodrag/svelte";
  export let section: Section;
  export let errors: Record<string, string | undefined> = {};
  $: timer = section.groups.find((group) => group.component.type === "timer");
</script>

<div class="flex flex-col">
  {#each section.groups.filter((group) => !(group === timer)) as group (group)}
    <Group bind:error={errors[group.component.id]} {group} />
  {/each}
</div>
{#if timer?.type === "group"}
  <div class="bg-secondary absolute" use:draggable>
    <Group bind:error={errors[timer.component.id]} group={timer} />
  </div>
{/if}
