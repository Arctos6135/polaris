<script lang="ts">
  import { modalStore } from "@skeletonlabs/skeleton";
  import { activeResponses, scout, forms } from "$lib/store";
  import { randomID } from "$lib/id";
  const formData = {
    name: "",
    form: 1,
  };
  // We've created a custom submit function to pass the response and close the modal.
  function onFormSubmit() {
    if (!error) {
      const id = randomID();
      $activeResponses[id] = {
        name: formData.name,
        data: {},
        form: formData.form,
        id: id,
        team: $scout!.team,
        scout: $scout!.id,
      };
      modalStore.close();
    }
  }
  $: error = formData.name.length == 0;
</script>

<div class="space-y-4">
  <form class="modal-form">
    <label>
      <span>Response Name</span>
      <input
        type="text"
        bind:value={formData.name}
        placeholder="Enter response name.."
        required
      />
      {#if error}
        <span class="color-error">Response needs a name</span>
      {/if}
    </label>
    <label>
      <span>Form</span>
      <select bind:value={formData.form}>
        {#each $forms as form (form.id)}
          <option value={form.id}>{form.name}</option>
        {/each}
      </select>
    </label>
  </form>
  <footer class="modal-footer">
    <button class="btn btn-ghost" on:click={() => modalStore.close()}
      >Cancel</button
    >
    <button
      class="btn btn-filled-success"
      disabled={error}
      on:click={onFormSubmit}>Create</button
    >
  </footer>
</div>
