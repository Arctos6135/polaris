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

<div class="flex justify-center">
  <div>
    <div class="form-check form-switch mb-7">
      <input class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" id="flexSwitchCheckDefault56">
    </div>
    <div class="form-check form-switch">
      <input class="form-check-input appearance-none w-9 -ml-10 rounded-full float-left h-5 align-top bg-white bg-no-repeat bg-contain bg-gray-300 focus:outline-none cursor-pointer shadow-sm" type="checkbox" role="switch" id="flexSwitchCheckChecked76" bind:checked
      
  on:change={() => ($activeResponses[id].data[component.id] = checked ? 1 : 0)}
      >
    </div>
  </div>
</div>