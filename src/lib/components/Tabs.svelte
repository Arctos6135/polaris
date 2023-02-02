<script lang="ts">
export let tabs: {label: string, id: string}[];
export let tab: string;
</script>
{#each tabs as tab_ (tab_.id)}
<button class="" on:click={() => (tab = tab_.id)}>{tab_.label}</button>
{/each}
