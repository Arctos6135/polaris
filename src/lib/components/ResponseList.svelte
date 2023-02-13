<script lang="ts">
  import { goto } from "$app/navigation";
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
      <li>
        <span class="flex-auto">
          <button
            on:click={() => setCode(response.id)}
            class="text-secondary hover:text-primary"
            >Match: {response.match} Team: {response.team}</button
          >
        </span>
      </li>
    {/each}
  </ul>
</div>
