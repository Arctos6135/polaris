<script lang="ts">
  export let tabs: { label: string; id: string }[];
  export let tab: string;
</script>

<div class="flex space-x-1 p-1 bg-secondary/50 w-full">
  {#each tabs as tab_ (tab_.id)}
    <button
      class="{tab_.id == tab
        ? 'bg-background shadow text-text'
        : 'text-white/90 hover:bg-background/20 hover:text-white'} w-full rounded-lg py-2.5 font-medium leading-5"
      on:click={() => (tab = tab_.id)}>{tab_.label}</button
    >
  {/each}
</div>
