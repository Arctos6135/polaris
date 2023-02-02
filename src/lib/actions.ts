import { get } from "svelte/store";
import { activeResponses, responseQueue } from "$lib/store";

export const deleteResponse = (id: number) => {
  const responses = get(activeResponses);
  delete responses[id];
  activeResponses.set(responses);
  responseQueue.set(get(responseQueue).filter((response) => response.id != id));
};

export const submitResponse = (id: number) => {
  const responses = get(activeResponses);
  const response = responses[id];
  delete responses[id];
  activeResponses.set(responses);
  responseQueue.set([...get(responseQueue), response]);
};
