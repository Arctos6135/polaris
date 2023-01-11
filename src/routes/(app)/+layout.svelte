<script lang="ts">
  import { loggedin, responseQueue } from "$lib/store";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";
  import { onMount } from "svelte";
  import { fetch, handle, supabase } from "$lib/supabase";

  $: if (browser && !$loggedin) {
    goto("/login", { replaceState: true });
  }
  onMount(() => {
    if ($loggedin) {
      fetch();
      function sync() {
        setTimeout(async () => {
          if ($responseQueue.length != 0) {
            const ids = $responseQueue.map((response) => response.id);
            await supabase
              .from("responses")
              .insert($responseQueue)
              .then((response) => {
                if (handle(response)) {
                  $responseQueue = $responseQueue.filter(
                    (response) => !ids.includes(response.id)
                  );
                }
              });
          }
          sync();
        }, 6000);
      }
      sync();
    }
  });
</script>

<slot />
