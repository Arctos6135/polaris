<script lang="ts">
  import type { Row } from "$lib/types";
  import Input from "./Input.svelte";

  export let group: Row;
  export let errors: Record<string, string | undefined> = {};
  export let error: string | undefined;
  $: {
    error = Object.values(errors).reduce(
      (prev, cur) => prev || cur != undefined,
      false
    )
      ? "true"
      : undefined;
  }
</script>

<span class="text-text text-center font-bold">{group.label}</span>
<div class="flex justify-center">
  {#each group.components as group (group)}
    <Input bind:error={errors[group.component.id]} {group} />
  {/each}
</div>
