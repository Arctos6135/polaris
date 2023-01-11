<script lang="ts">
  import { responseQueue } from "$lib/store";
</script>

<div class="card p-4">
  <span class="text-2xl">Forms</span>
  <hr />
  <ul class="list">
    {#each $responseQueue as response (response.id)}
      <li>
        <span class="flex-auto">
          <a href={`code/${response.id}`}>{response.name}</a>
        </span>
      </li>
    {/each}
  </ul>
</div>
