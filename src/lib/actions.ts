import { get } from "svelte/store";
import { activeResponses, response, responseQueue } from "$lib/store";

export const deleteResponse = (id: number) => {
  const responses = get(activeResponses);
  delete responses[id];
  activeResponses.set(responses);
  responseQueue.set(get(responseQueue).filter((response) => response.id != id));
};

export const submitResponse = (id: number) => {
  const responses = get(activeResponses);
  const res = responses[id];
  delete responses[id];
  activeResponses.set(responses);
  responseQueue.set([...get(responseQueue), res]);
  response.set(null);
};

export function unsubmitResponse(id: number) {
  const response = get(responseQueue).find((response) => response.id === id);
  if (!response) return;
  responseQueue.set(
    get(responseQueue).filter((response) => response.id !== id)
  );
  const responses = get(activeResponses);
  responses[id] = response;
  activeResponses.set(responses);
}
