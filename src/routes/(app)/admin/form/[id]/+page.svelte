<script lang="ts">
  import { forms } from "$lib/store";
  import { page } from "$app/stores";
  import { supabase, handle } from "$lib/supabase";

  let form = $forms.findIndex((form) => form.id == parseInt($page.params.id));
  const edit = () => {
    supabase
      .from("forms")
      .update({ sections: JSON.parse(sections) })
      .eq("id", parseInt($page.params.id))
      .then((response) => {
        if (handle(response)) {
          $forms[form].sections = JSON.parse(sections);
        }
      });
  };
  let sections = JSON.stringify($forms[form]?.sections, null, 2);
</script>

{#if sections}
<div class="flex h-full flex-col">
  <textarea class="flex-grow" bind:value={sections} />
  <button class="btn btn-filled-primary" on:click={edit}>Edit</button>
</div>
{/if}
