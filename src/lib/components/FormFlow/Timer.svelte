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
      $activeResponses[id].data[component.id] = Math.min(
        initialTime + endTime - startTime,
        component.max
      );
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
      : Math.min(Math.floor(parseFloat(e.target.value) * 1000), component.max);
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
      <button
        class="rounded-md p-2 shadow-sm border-2 bg-error/50 border-error hover:bg-error/40 text-text/80"
        on:click={stopTimer}>Stop</button
      >
    {:else}
      <button
        class="rounded-md p-2 shadow-sm border-2 bg-success/50 border-success hover:bg-success/40 text-text/80"
        on:click={startTimer}>Start</button
      >
    {/if}
    <button
      class="rounded-md p-2 shadow-sm border-2 bg-primary/50 border-primary hover:bg-primary/40 text-text/80"
      on:click={restartTimer}>Reset</button
    >
  </div>
</div>
