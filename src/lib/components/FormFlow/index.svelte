<script lang="ts">
  import { goto } from "$app/navigation";
  import { response, form, activeResponses, responseQueue } from "$lib/store";
  import { setContext } from "svelte";
  import Tabs from "../Tabs.svelte";
  import Section from "./Section.svelte";

  setContext("id", $response);

  let tab = $form?.sections[0].id as string;

  export const deleteResponse = () => {
    if (!$response) return;
    const res = $activeResponses;
    delete res[$response];
    $activeResponses = res;
    $responseQueue = $responseQueue.filter(
      (response) => response.id != $response
    );
    goto("/", { replaceState: true });
  };

  export const submitResponse = () => {
    if (!$response) return;
    const responses = $activeResponses;
    const res = responses[$response];
    delete responses[$response];
    $activeResponses = responses;
    $responseQueue = [...$responseQueue, res];
    $response = null;
    goto("/", { replaceState: true });
  };
</script>

{#if $form && $response}
  <Tabs
    bind:tab
    tabs={$form.sections.map((section) => ({
      label: section.header,
      id: section.id,
    }))}
  />
  <form class="mt-4 h-full">
    <div>
      {#each $form.sections as section}
        {#if section.id == tab}
          <Section {section} />
        {/if}
      {/each}
    </div>
    <div
      class="flex justify-center absolute bottom-0 w-full py-4 bg-surface-200-700-token"
    >
      <button class="btn btn-filled-error" on:click={deleteResponse}
        >Delete</button
      >
      <button class="btn btn-filled-success ml-2" on:click={submitResponse}
        >Submit</button
      >
    </div>
  </form>
{/if}
