<script lang="ts">
  import { goto } from "$app/navigation";
  import type { Form } from "$lib/types";
  import { deleteResponse, submitResponse } from "$lib/actions";
  import { Tab, TabGroup } from "@skeletonlabs/skeleton";
  import { setContext } from "svelte";
  import { writable } from "svelte/store";
  import Section from "./Section.svelte";

  export let id: number;
  export let form: Form;
  setContext("id", id);
  let tab = writable(form.sections[0].header);
</script>

<TabGroup selected={tab}>
  {#each form.sections as section}
    <Tab value={section.header}>{section.header}</Tab>
  {/each}
</TabGroup>
<form class="mt-4 h-full">
  <div>
    {#each form.sections as section}
      {#if section.header == $tab}
        <Section {section} />
      {/if}
    {/each}
  </div>
  <div
    class="flex justify-center absolute bottom-0 w-full py-4 bg-surface-200-700-token"
  >
    <button
      class="btn btn-filled-error"
      on:click={() => {
        deleteResponse(id);
        goto("/", { replaceState: true });
      }}>Delete</button
    >
    <button
      class="btn btn-filled-success ml-2"
      on:click={() => {
        submitResponse(id);
        goto("/", { replaceState: true });
      }}>Submit</button
    >
  </div>
</form>
