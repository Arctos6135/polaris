<script lang="ts">
  import { goto } from "$app/navigation";
  import { deleteResponse, unsubmitResponse } from "$lib/actions";
  import { responseQueue, code } from "$lib/store";

  const setCode = (id: number) => {
    $code = id;
    goto("/code");
  };
</script>

<div class="p-4">
  <span class="text-2xl text-text">Responses</span>
  <hr class="text-text/50" />
  <ul class="">
    {#each $responseQueue as response (response.id)}
      <li class="flex mt-1">
        <span class="flex-auto">
          <button
            on:click={() => setCode(response.id)}
            class="text-secondary hover:text-primary"
            >Match: {response.match} Team: {response.team}</button
          >
        </span>
        <span>
          <button
            class="rounded-md px-1 shadow-sm border-2 bg-error/50 border-error hover:bg-error/40 text-text/80"
            on:click={() => deleteResponse(response.id)}>Delete</button
          >
          <button
            class="rounded-md px-1 shadow-sm border-2 bg-primary/50 border-primary hover:bg-primary/30 text-text/80"
            on:click={() => unsubmitResponse(response.id)}>Unsubmit</button
          >
        </span>
      </li>
    {/each}
  </ul>
</div>
