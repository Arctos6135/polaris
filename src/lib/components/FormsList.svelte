<script lang="ts">
  import { goto } from "$app/navigation";

  import { deleteResponse, submitResponse } from "$lib/actions";

  import { activeResponses, response } from "$lib/store";
  const setResponse = (id: number) => {
    $response = id;
    goto("/form");
  };

  $: responses = Object.values($activeResponses);
</script>

<div class="p-4">
  <span class="text-2xl text-text">Forms</span>
  <hr class="text-text/50" />
  <ul class="mt-2">
    {#each responses as response (response.id)}
      <li class="flex mt-1">
        <span class="flex-auto">
          <button
            on:click={() => setResponse(response.id)}
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
            class="rounded-md px-1 shadow-sm border-2 bg-success/50 border-success hover:bg-success/30 text-text/80"
            on:click={() => submitResponse(response.id)}>Submit</button
          >
        </span>
      </li>
    {/each}
  </ul>
</div>
