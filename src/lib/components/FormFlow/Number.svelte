<script lang="ts">
  import type { Num } from "$lib/types";
  import { activeResponses } from "$lib/store";
  import { getContext, onMount } from "svelte";

  onMount(() => {
    if ($activeResponses[id].data[component.id] === undefined) {
      $activeResponses[id].data[component.id] =
        component.default || component.min;
    }
  });
  const id = getContext<number>("id");
  export let component: Num;
  export let error: string | undefined;
  $: value = $activeResponses[id].data[component.id];
  $: {
    const num = $activeResponses[id].data[component.id];
    if (!Number.isInteger(num)) {
      error = "Number can't be empty";
    } else if (component.min > parseInt(num.toString())) {
      error = `Number must be at least ${component.min}`;
    } else if (component.max < parseInt(num.toString())) {
      error = `Number can't be higher then ${component.max}`;
    } else {
      error = undefined;
    }
  }
</script>

<div class="flex">
  <button
    class="btn btn-filled-error text-white rounded-r-none"
    on:click={() =>
      ($activeResponses[id].data[component.id] = Number.isInteger(value)
        ? parseInt(value.toString()) - 1
        : component.default || component.min)}>-</button
  >
  <input
    type="number"
    bind:value={$activeResponses[id].data[component.id]}
    class="!rounded-none"
  />
  <button
    class="btn btn-filled-success text-white rounded-l-none"
    on:click={() =>
      ($activeResponses[id].data[component.id] = Number.isInteger(value)
        ? parseInt(value.toString()) + 1
        : component.default || component.min)}>+</button
  >
</div>
