<script lang="ts">
  import { goto } from "$app/navigation";
  import {
    response,
    form,
    activeResponses,
    responseQueue,
    errors,
  } from "$lib/store";
  import { setContext } from "svelte";
  import Tabs from "../Tabs.svelte";
  import Section from "./Section.svelte";

  $: setContext("id", $response);

  let tab = $form?.sections[0].id as string;

  export const deleteResponse = () => {
    if (!$response) return;
    const res = $activeResponses;
    delete res[$response];
    $activeResponses = res;
    $responseQueue = $responseQueue.filter(
      (response) => response.id != $response
    );
    $response = null;
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
  let error: Record<string, Record<string, string | undefined>> = {};
  $: {
    if ($response) {
      $errors[$response] = Object.values(error).reduce(
        (prev, cur) =>
          prev ||
          Object.values(cur).reduce(
            (prev, cur) => prev || cur != undefined,
            false
          ),
        false
      );
    }
  }
</script>

{#if $form && $response}
  <Tabs
    bind:tab
    tabs={$form.sections.map((section) => ({
      label: section.header,
      id: section.id,
    }))}
  />
  <div class="mt-3">
    <div>
      {#each $form.sections as section}
        <div class="mx-3" class:hidden={!(section.id == tab)}>
          <Section {section} bind:errors={error[section.id]} />
        </div>
      {/each}
    </div>
    <div
      class="flex justify-center gap-4 bottom-0 w-full pb-4 pt-2 bg-surface-200-700-token"
    >
      <button
        class="rounded-md p-2 shadow-sm border-2 bg-error/50 border-error hover:bg-error/40 text-text/80"
        on:click={deleteResponse}>Delete</button
      >
      <button
        class="rounded-md p-2 shadow-sm border-2 bg-success/50 border-success hover:bg-success/40 text-text/80 disabled:bg-success/10 disabled:border-success/20"
        disabled={$errors[$response]}
        on:click={submitResponse}>Submit</button
      >
    </div>
  </div>
{/if}
