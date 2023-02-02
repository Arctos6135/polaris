<script lang="ts">
  import { goto } from "$app/navigation";
  import { responseQueue, code } from "$lib/store";

  const setCode = (id: number) => {
    $code = id;
    goto("/code");
  };
</script>

<div class="card p-4">
  <span class="text-2xl">Forms</span>
  <hr />
  <ul class="list">
    {#each $responseQueue as response (response.id)}
      <li>
        <span class="flex-auto">
          <button on:click={() => setCode(response.id)}
            >Match: {response.match} Team: {response.team}</button
          >
        </span>
      </li>
    {/each}
  </ul>
</div>
