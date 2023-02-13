<script lang="ts">
  import { activeResponses, teams, matches } from "$lib/store";
  import { randomID } from "$lib/id";
  let scout = "";
  let team = "";
  let match = "";
  function onFormSubmit() {
    if (!error) {
      const id = randomID();
      $activeResponses[id] = {
        data: {},
        id: id,
        scout: scout,
        team: parseInt(team),
        match: parseFloat(match),
        alliance: $matches[parseInt(match)]?.red_alliance.includes(
          parseInt(team)
        )
          ? "RED"
          : "BLUE",
      };
      match = "";
      team = "";
      scout = "";
    }
  }
  $: error = team == "" || match == "" || scout == "";
</script>

<div class="space-y-4">
  <div class="flex flex-col">
    <label class="text-text">Match</label>
    <input
      class="rounded-md bg-background text-text border-2"
      type="text"
      bind:value={match}
      list="matches"
      required
    />
    <datalist id="matches">
      {#each Object.values($matches) as match (match.number)}
        <option value={match.number} />
      {/each}
    </datalist>
    {#if match == ""}
      <div class="text-error">Need to choose a match</div>
    {/if}
  </div>
  <div class="flex flex-col">
    <label class="text-text">Team</label>
    <input
      class="rounded-md bg-background text-text border-2"
      type="text"
      bind:value={team}
      list="teams"
      required
    />
    <datalist id="teams">
      {#each Object.values($teams) as team (team.number)}
        <option value={team.number} />
      {/each}
    </datalist>
    {#if team == ""}
      <div class="text-error">Need to choose a team</div>
    {/if}
  </div>
  <div class="flex flex-col">
    <label class="text-text">Scout Name</label>
    <input
      class="rounded-md bg-background text-text border-2"
      type="text"
      bind:value={scout}
      required
    />
    {#if scout == ""}
      <div class="text-error">Scout needs a name</div>
    {/if}
  </div>
  <button
    class="bg-primary rounded-md p-2 text-white shadow-sm hover:bg-primary/90 disabled:bg-primary/50"
    disabled={error}
    on:click={onFormSubmit}>Create</button
  >
</div>
