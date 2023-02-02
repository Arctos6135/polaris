<script lang="ts">
  import { activeResponses, teams, matches } from "$lib/store";
  import { randomID } from "$lib/id";
  const formData = {
    scout: "",
    team: Object.values($teams).at(1)?.number,
    match: Object.values($matches).at(1)?.number,
  };
  function onFormSubmit() {
    if (!error) {
      const id = randomID();
      $activeResponses[id] = {
        data: {},
        id: id,
        scout: formData.scout,
        team: formData.team!,
        match: formData.match!,
      };
      formData.match = Object.values($matches).at(1)?.number;
      formData.team = Object.values($teams).at(1)?.number;
      formData.scout = "";
    }
  }
  $: error = formData.team == undefined || formData.match == undefined;
</script>

<div class="space-y-4">
  <form class="modal-form">
    <label>
      <span>Match</span>
      <input
        type="text"
        bind:value={formData.match}
        required
      />
      {#if formData.match == undefined}
        <span class="color-error">Need to choose a match</span>
      {/if}
    </label>
    <label>
      <span>Team</span>
      <input
        type="text"
        bind:value={formData.team}
        required
      />
      {#if formData.team == undefined}
        <span class="color-error">Need to choose a team</span>
      {/if}
    </label>
    <label>
      <span>Scout Name</span>
      <input
        type="text"
        bind:value={formData.scout}
        placeholder="Enter name.."
        required
      />
      {#if error}
        <span class="color-error">Scout needs a name</span>
      {/if}
    </label>
    <button
      class="btn btn-filled-success"
      disabled={error}
      on:click={onFormSubmit}>Create</button
    >
  </form>
</div>
