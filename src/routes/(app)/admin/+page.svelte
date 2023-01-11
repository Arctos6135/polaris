<script lang="ts">
  import { scouts, forms, scout } from "$lib/store";
  import { SlideToggle } from "@skeletonlabs/skeleton";
  import FormPreview from "$lib/components/FormPreview.svelte";
  import { handle, supabase } from "$lib/supabase";
  let newName = "";
  const createForm = () => {
    supabase
      .from("forms")
      .insert({ name: newName, sections: [], team: $scout!.team })
      .then((response) => handle(response));
  };
  const setAdmin = (id: string, value: boolean) => {
    supabase
      .from("scouts")
      .update({ admin: value })
      .eq("id", id)
      .then((response) => handle(response));
  };
  const setAccepted = (id: string, value: boolean) => {
    supabase
      .from("scouts")
      .update({ accepted: value })
      .eq("id", id)
      .then((response) => handle(response));
  };
</script>

<div class="card m-4">
  <header class="card-header"><h2>Scouts</h2></header>
  <div class="table-container p-4">
    <table class="table table-hover">
      <thead
        ><tr><th>Name</th><th>Email</th><th>Admin</th><th>Accepted</th></tr
        ></thead
      >
      <tbody>
        {#each $scouts as scout}
          <tr>
            <td>{scout.name}</td>
            <td>{scout.email}</td>
            <td
              ><SlideToggle
                on:click={() => setAdmin(scout.id, !scout.admin)}
                bind:checked={scout.admin}
              /></td
            >
            <td
              ><SlideToggle
                on:click={() => setAccepted(scout.id, !scout.accepted)}
                bind:checked={scout.accepted}
              /></td
            >
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
</div>
<hr />
<div class="card m-4">
  <header class="card-header"><h2>Forms</h2></header>
  <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 p-4">
    {#each $forms as form}
      <a href="/admin/form/{form.id}">
        <div class="card">
          <header>{form.name}</header>
          <FormPreview {form} />
        </div>
      </a>
    {/each}
  </div>
  <hr />
  <footer class="card-footer p-4">
    <form class="flex" on:submit={createForm}>
      <input type="text" bind:value={newName} /><button
        type="submit"
        class="btn btn-base ml-4 btn-filled-primary">Create Form</button
      >
    </form>
  </footer>
</div>
