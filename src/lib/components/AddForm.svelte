<script lang="ts">
  import { activeResponses, teams, matches, scout, errors } from "$lib/store";
  import { randomID } from "$lib/id";
  let team = "";
  let match = "";

  //This is called onFormSubmit but its really for creating a form?
  //I guess because youre submitting like a mini form with team and match number
  function onFormSubmit() {
    if (!error) {
      //assigns it an ID and puts it in activeResponses
      const id = randomID();
      $activeResponses[id] = {
        //data is an array of components by their IDs
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
  let manual = false;
  $: matchTeams = Object.values($teams).filter(
    (team) =>
      $matches[parseInt(match)]?.red_alliance.includes(team.number) ||
      $matches[parseInt(match)]?.blue_alliance.includes(team.number)
  );
  $: error =
    team == "" || team == null || match == "" || match == null || $scout == "";
</script>

<div class="space-y-4">
  <div class="flex flex-col">
    <span class="text-text">Match</span>
    {#if manual}
      <input
        type="number"
        class="rounded-md bg-background text-text border-2"
        bind:value={match}
      />
    {:else}
      <select
        class="rounded-md bg-background text-text border-2"
        bind:value={match}
      >
        {#each Object.values($matches) as match (match.number)}
          <option value={match.number}>{match.number}</option>
        {/each}
      </select>
    {/if}
    {#if match == "" || match == null}
      <div class="text-error">Need to choose a match</div>
    {/if}
  </div>
  <div class="flex flex-col">
    <span class="text-text">Team</span>
    {#if manual}
      <input
        type="number"
        class="rounded-md bg-background text-text border-2"
        bind:value={team}
      />
    {:else}
      <select
        class="rounded-md bg-background text-text border-2"
        bind:value={team}
      >
        {#each matchTeams as team (team.number)}
          <option value={team.number}>{team.number}</option>
        {/each}
      </select>
    {/if}
    {#if team == "" || team == null}
      <div class="text-error">Need to choose a team</div>
    {/if}
  </div>
  <div class="flex flex-col">
    <span class="text-text">Scout Name</span>
    <input
      class="rounded-md bg-background text-text border-2"
      type="text"
      bind:value={$scout}
    />
    {#if $scout == ""}
      <div class="text-error">Scout needs a name</div>
    {/if}
  </div>
  <div class="flex">
    <button
      class="bg-primary rounded-md p-2 text-white shadow-sm hover:bg-primary/90 disabled:bg-primary/30"
      disabled={error}
      on:click={onFormSubmit}>Create</button
    >
    <div class="ml-auto">
      <label class="relative inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          value=""
          class="sr-only peer"
          bind:checked={manual}
        />
        <div
          class="w-[74px] h-[36px] bg-text/50 rounded-full peer peer-checked:after:translate-x-full after:absolute after:top-[1px] after:left-[1px] peer-checked:after:left-[5px] after:bg-white after:rounded-full after:h-[34px] after:w-[34px] after:transition-all peer-checked:bg-primary focus:outline-none"
        />
        <span class="ml-1 text-text">Manual</span>
      </label>
    </div>
  </div>
</div>
