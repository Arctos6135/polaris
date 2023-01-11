<script lang="ts">
  import { deleteResponse, submitResponse } from "$lib/actions";

  import { activeResponses } from "$lib/store";

  $: responses = Object.values($activeResponses);
</script>

<div class="card p-4">
  <span class="text-2xl">Responses</span>
  <hr />
  <ul class="list">
    {#each responses as response (response.id)}
      <li>
        <span class="flex-auto">
          <a href={`form/${response.id}`}>{response.name}</a>
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
