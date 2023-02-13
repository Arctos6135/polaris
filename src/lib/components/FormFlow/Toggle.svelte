<script lang="ts">
  import type { Toggle } from "$lib/types";
  import { activeResponses } from "$lib/store";
  import { getContext } from "svelte";

  $: if ($activeResponses[id].data[component.id] === undefined) {
    $activeResponses[id].data[component.id] = 0;
  }
  const id = getContext<number>("id");
  export let component: Toggle;
  let checked = $activeResponses[id].data[component.id] == 1;
</script>

<div>
  <label class="relative inline-flex items-center cursor-pointer">
    <input
      type="checkbox"
      value=""
      class="sr-only peer"
      bind:checked
      on:change={() =>
        ($activeResponses[id].data[component.id] = checked ? 1 : 0)}
    />
    <div
      class="w-[74px] h-[36px] bg-text/50 rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[1px] after:left-[1px] peer-checked:after:left-[5px] after:bg-white after:rounded-full after:h-[34px] after:w-[34px] after:transition-all peer-checked:bg-primary focus:outline-none"
    />
  </label>
</div>
