<script lang="ts">
  import type { Section } from "$lib/types";
  import Group from "./Group.svelte";
  import { draggable } from "@neodrag/svelte";
  export let section: Section;
  $: timer = section.groups.find((group) => group.component.type === "timer");
</script>

{#each section.groups.filter((group) => !(group === timer)) as group (group)}
  <Group {group} />
{/each}
{#if timer?.type === "group"}
  <div class="card absolute" use:draggable><Group group={timer} /></div>
{/if}
