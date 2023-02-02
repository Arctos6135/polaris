<script lang="ts">
  import type { Timer } from "$lib/types";
  import { activeResponses } from "$lib/store";
  import { getContext } from "svelte";

  const id = getContext<number>("id");
  export let component: Timer;
  let startTime = Date.now();
  let endTime = Date.now();
  let intervalRef: NodeJS.Timer | undefined;
  let initialTime = 0;
  const startTimer = () => {
    startTime = Date.now();
    initialTime = parseInt($activeResponses[id].data[component.id].toString());
    intervalRef = setInterval(() => {
      endTime = Date.now();
      $activeResponses[id].data[component.id] =
        initialTime + endTime - startTime;
    }, 100);
  };
  const stopTimer = () => {
    clearInterval(intervalRef);
    intervalRef = undefined;
  };
  const restartTimer = () => {
    clearInterval(intervalRef);
    intervalRef = undefined;
    $activeResponses[id].data[component.id] = 0;
  };
  $: if ($activeResponses[id].data[component.id] === undefined) {
    $activeResponses[id].data[component.id] = 0;
  }
  $: readableTime = (
    parseFloat($activeResponses[id].data[component.id].toString()) / 1000
  ).toFixed(2);
  const onChange = (e: any) => {
    $activeResponses[id].data[component.id] = isNaN(parseFloat(e.target.value))
      ? 0
      : Math.floor(parseFloat(e.target.value) * 1000);
  };
  $: editableTime =
    parseFloat($activeResponses[id].data[component.id].toString()) / 1000;
</script>

<div class="gap-y-2 items-center flex flex-col">
  {#if intervalRef}
    <div class="text-center font-bold text-xl">{readableTime} seconds</div>
  {:else}
    <input type="number" value={editableTime} on:input={onChange} />
  {/if}
  <div>
    {#if intervalRef}
      <button class="btn btn-outline-error" on:click={stopTimer}>Stop</button>
    {:else}
      <button class="btn btn-outline-success" on:click={startTimer}
        >Start</button
      >
    {/if}
    <button class="btn btn-outline-surface ml-2" on:click={restartTimer}
      >Reset</button
    >
  </div>
</div>
