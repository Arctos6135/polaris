<script lang="ts">
  import type { Input } from "$lib/types";
  import Text from "./Text.svelte";
  import Number from "./Number.svelte";
  import Picker from "./Picker.svelte";
  import Timer from "./Timer.svelte";
  import Toggle from "./Toggle.svelte";

  export let group: Input;
  let component = group.component as never;
  let components = {
    text: Text,
    num: Number,
    picker: Picker,
    timer: Timer,
    toggle: Toggle,
  };
  let Component = components[group.component.type];
  export let error: string | undefined;
</script>

<div class="mx-2 mb-4 flex flex-col">
  <span class="text-text">{group.label}</span>
  <Component bind:error {component} />
  <span class="text-error">{error || ""}</span>
</div>
