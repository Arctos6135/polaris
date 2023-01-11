<script lang="ts">
  import { loggedin } from "$lib/store";
  import { goto } from "$app/navigation";
  import { browser } from "$app/environment";

  $: if (browser && $loggedin) {
    goto("/");
  }
</script>

<slot />
