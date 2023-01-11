<script lang="ts">
  import QrScanner from "qr-scanner";
  import { onMount } from "svelte";
  import { forms, scout, responseQueue, responses } from "$lib/store";
  import { deserialize } from "$lib/serialize";
  import type { Response } from "$lib/types";
  let video: HTMLVideoElement;
  onMount(() => {
    qrScanner = new QrScanner(
      video,
      (result) => {
        try {
          const [responseIDString, name, formID, scoutID, serializedResponse] =
            result.data.split(";");
          const responseID = parseInt(responseIDString);
          const form = $forms.find((form) => form.id === parseInt(formID));
          if (!form) return;
          const data = deserialize(BigInt(serializedResponse), form.sections);
          const response: Response = {
            data,
            form: form.id,
            id: responseID,
            name,
            team: $scout!.team,
            scout: scoutID,
          };
          if (
            !$responseQueue
              .map((response) => response.id)
              .includes(responseID) &&
            !$responses.map((response) => response.id).includes(responseID)
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
  let qrScanner: QrScanner;
</script>

<!-- svelte-ignore a11y-media-has-caption -->
<video bind:this={video} />
