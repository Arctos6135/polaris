<script lang="ts">
  import AddFormModal from "$lib/components/AddFormModal.svelte";
  import { modalStore } from "@skeletonlabs/skeleton";
  import FormsList from "$lib/components/FormsList.svelte";
  import ResponseList from "$lib/components/ResponseList.svelte";
  const addForm = () => {
    modalStore.trigger({
      type: "component",
      title: "Add Form Response",
      component: {
        ref: AddFormModal,
      },
    });
  };
</script>

<div class="container flex flex-col space-y-4 mt-4 mx-auto h-full">
  <FormsList />
  <div class="card p-4">
    <button class="btn btn-filled-primary" on:click={addForm}>Add Form</button>
  </div>
  <ResponseList />
</div>
