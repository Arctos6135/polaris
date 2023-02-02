<script lang="ts">
    import { goto } from "$app/navigation";

  import { deleteResponse, submitResponse } from "$lib/actions";

  import { activeResponses, response } from "$lib/store";
  const setResponse = (id: number) => {
    $response = id;
    goto("/form")
  }

  $: responses = Object.values($activeResponses);
</script>

<div class="card p-4">
  <span class="text-2xl">Responses</span>
  <hr />
  <ul class="list">
    {#each responses as response (response.id)}
      <li>
        <span class="flex-auto">
          <button on:click={() => setResponse(response.id)}>Match: {response.match} Team: {response.team}</button>
        </span>
        <span>
          <button
            class="btn btn-sm sm:btn-base btn-ghost-error"
            on:click={() => deleteResponse(response.id)}>Delete</button
          >
          <button
            class="btn btn-sm sm:btn-base btn-ghost-success ml-2"
            on:click={() => submitResponse(response.id)}>Submit</button
          >
        </span>
      </li>
    {/each}
  </ul>
</div>
