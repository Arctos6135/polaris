<script lang="ts">
  import { activeResponses, teams, matches, scout, errors } from "$lib/store";
  import { randomID } from "$lib/id";
  let team = "";
  let match = "";
  function onFormSubmit() {
    if (!error) {
      const id = randomID();
      $activeResponses[id] = {
        data: {},
        id: id,
        scout: $scout,
        team: parseInt(team),
        match: parseFloat(match),
        alliance: $matches[parseInt(match)]?.red_alliance.includes(
          parseInt(team)
        )
          ? "RED"
          : "BLUE",
      };
      $errors[id] = true;
      match = "";
      team = "";
    }
  }
  $: matchTeams = Object.values($teams).filter(
    (team) =>
      $matches[parseInt(match)]?.red_alliance.includes(team.number) ||
      $matches[parseInt(match)]?.blue_alliance.includes(team.number)
  );
  $: error = team == "" || match == "" || $scout == "";
</script>

<div class="space-y-4">
  <div class="flex flex-col">
    <span class="text-text">Match</span>
    <select
      class="rounded-md bg-background text-text border-2"
      bind:value={match}
      required
    >
      {#each Object.values($matches) as match (match.number)}
        <option value={match.number}>{match.number}</option>
      {/each}
    </select>
    {#if match == ""}
      <div class="text-error">Need to choose a match</div>
    {/if}
  </div>
  <div class="flex flex-col">
    <span class="text-text">Team</span>
    <select
      class="rounded-md bg-background text-text border-2"
      bind:value={team}
      required
    >
      {#each matchTeams as team (team.number)}
        <option value={team.number}>{team.number}</option>
      {/each}
    </select>
    {#if team == ""}
      <div class="text-error">Need to choose a team</div>
    {/if}
  </div>
  <div class="flex flex-col">
    <span class="text-text">Scout Name</span>
    <input
      class="rounded-md bg-background text-text border-2"
      type="text"
      bind:value={$scout}
      required
    />
    {#if $scout == ""}
      <div class="text-error">Scout needs a name</div>
    {/if}
  </div>
  <button
    class="bg-primary rounded-md p-2 text-white shadow-sm hover:bg-primary/90 disabled:bg-primary/30"
    disabled={error}
    on:click={onFormSubmit}>Create</button
  >
</div>
