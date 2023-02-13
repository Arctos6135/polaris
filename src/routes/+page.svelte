<script lang="ts">
  import AddForm from "$lib/components/AddForm.svelte";
  import FormsList from "$lib/components/FormsList.svelte";
  import ResponseList from "$lib/components/ResponseList.svelte";
</script>

<div class="container flex flex-col space-y-4 mt-4 mx-auto">
  <FormsList />
  <div class="card p-4">
    <AddForm />
  </div>
  <ResponseList />
</div>
