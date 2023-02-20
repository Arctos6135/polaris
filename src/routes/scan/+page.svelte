<script lang="ts">
  import QrScanner from "qr-scanner";
  import { onDestroy, onMount } from "svelte";
  import { form, responseQueue, matches } from "$lib/store";
  import { deserialize } from "$lib/serialize";
  import type { Response } from "$lib/types";
  let video: HTMLVideoElement;
  let message: string | undefined;
  let success: boolean;
  onMount(() => {
    qrScanner = new QrScanner(
      video,
      (result) => {
        if (!$form) return;
        try {
          const [responseIDString, match, team, scout, serializedResponse] =
            result.data.split(";");
          const responseID = parseInt(responseIDString);
          if (!form) return;
          const data = deserialize(BigInt(serializedResponse), $form.sections);
          const response: Response = {
            data,
            id: responseID,
            match: parseInt(match),
            team: parseInt(team),
            scout: scout,
            alliance: $matches[parseInt(match)]?.red_alliance.includes(
              parseInt(team)
            )
              ? "RED"
              : "BLUE",
          };
          if (
            !$responseQueue.map((response) => response.id).includes(responseID)
          ) {
            $responseQueue = [...$responseQueue, response];
            message = `team ${team}: match ${match} by ${scout}`;
            success = true;
          }
        } catch (err) {
          console.error(err);
          message = "could not scan QR code try again";
          success = false;
        } finally {
          setTimeout(() => (message = undefined), 5000);
        }
      },
      { highlightScanRegion: true }
    );
    qrScanner.start();
  });
  onDestroy(() => {
    qrScanner?.stop();
  });
  let qrScanner: QrScanner | undefined;
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<div class="flex justify-center">
  <video bind:this={video} />
</div>
{#if message}
  <div
    class="text-xl w-full text-center {success ? 'text-success' : 'text-error'}"
  >
    {message}
  </div>
{/if}
