<script lang="ts">
  export let tabs: { label: string; id: string }[];
  export let tab: string;
</script>

<div class="flex space-x-1 p-1 bg-primary/40 w-full">
  {#each tabs as tab_ (tab_.id)}
    <button
      class="{tab_.id == tab
        ? 'bg-white shadow text-primary'
        : 'text-white/90 hover:bg-white/[0.12] hover:text-white'} w-full rounded-lg py-2.5 text-sm font-medium leading-5 ring-white ring-opacity-60 ring-offset-2 ring-offset-primary/90 focus:outline-non focus:ring-2 "
      on:click={() => (tab = tab_.id)}>{tab_.label}</button
    >
  {/each}
</div>
