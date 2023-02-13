<script lang="ts">
  import type { Group } from "$lib/types";
  import Text from "./Text.svelte";
  import Number from "./Number.svelte";
  import Picker from "./Picker.svelte";
  import Timer from "./Timer.svelte";
  import Toggle from "./Toggle.svelte";

  export let group: Group;
  let component = group.component as never;
  let components = {
    text: Text,
    num: Number,
    picker: Picker,
    timer: Timer,
    toggle: Toggle,
  };
  let Component = components[group.component.type];
  let error: string | undefined;
</script>

<div class="m-3 flex flex-col">
  <span>{group.label}</span>
  <Component bind:error {component} />
  <span class="text-error">{error || ""}</span>
</div>
