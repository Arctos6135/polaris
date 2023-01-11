<script lang="ts">
  import type { Row } from "$lib/types";
  import Group from "./Group.svelte";

  export let row: Row;
</script>

<div class="flex">
  {#each row.components as group}
    <Group {group} />
  {/each}
</div>
