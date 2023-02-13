<script lang="ts">
  import QrScanner from "qr-scanner";
  import { onDestroy, onMount } from "svelte";
  import { form, responseQueue } from "$lib/store";
  import { deserialize } from "$lib/serialize";
  import type { Response } from "$lib/types";
  let video: HTMLVideoElement;
  onMount(() => {
    qrScanner = new QrScanner(
      video,
      (result) => {
        if (!$form) return;
        try {
          const [responseIDString, match, team, scoutName, serializedResponse] =
            result.data.split(";");
          const responseID = parseInt(responseIDString);
          if (!form) return;
          const data = deserialize(BigInt(serializedResponse), $form.sections);
          const response: Response = {
            data,
            id: responseID,
            match: parseInt(match),
            team: parseInt(team),
            scout: scoutName,
          };
          if (
            !$responseQueue.map((response) => response.id).includes(responseID)
          ) {
            $responseQueue = [...$responseQueue, response];
          }
        } catch (err) {
          console.error(err);
        }
      },
      { highlightScanRegion: true }
    );
    qrScanner.start();
  });
  onDestroy(() => {
    qrScanner.stop();
  });
  let qrScanner: QrScanner;
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video bind:this={video} />
