<script lang="ts">
  import generatePath from "$lib//third_party/generatePath";
  import { serialize } from "$lib/serialize";
  import { Ecc, QrCode, QrSegment } from "$lib/third_party/qrcodegen";
  import type { Response } from "$lib/types";
  import { form } from "$lib/store";

  export let response: Response;
  function toUtf8ByteArray(str: string): Array<number> {
    str = encodeURI(str);
    const result: Array<number> = [];
    for (let i = 0; i < str.length; i++) {
      if (str.charAt(i) != "%") result.push(str.charCodeAt(i));
      else {
        result.push(parseInt(str.substring(i + 1, 2), 16));
        i += 2;
      }
    }
    return result;
  }
  let qr: boolean[][];
  $: {
    try {
      const serializedData = serialize(response.data, $form.sections);
      const segments = [
        QrSegment.makeNumeric(response.id.toString()),
        QrSegment.makeBytes(toUtf8ByteArray(";" + response.name + ";")),
        QrSegment.makeBytes(toUtf8ByteArray(";" + response.scout + ";")),
        QrSegment.makeNumeric(serializedData.toString()),
      ];
      qr = QrCode.encodeSegments(segments, Ecc.LOW).getModules();
    } catch (err) {
      console.error(err);
      qr = [];
    }
  }
</script>

<svg
  class="w-max md:w-auto md:h-1/2 m-4 h-auto"
  viewBox={`0 0 ${qr.length} ${qr.length}`}
  shape-rendering="crispEdges"
>
  <path
    d={`M0,0 h${qr.length}v${qr.length}H0z`}
    fill="white"
    shape-rendering="crispEdges"
  />
  <path d={generatePath(qr)} fill="black" />
</svg>
