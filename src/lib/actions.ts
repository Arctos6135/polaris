import { get } from "svelte/store";
import { activeResponses, responseQueue } from "$lib/store";
import { supabase, handle } from "$lib/supabase";

export const deleteResponse = (id: number) => {
  const responses = get(activeResponses);
  delete responses[id];
  activeResponses.set(responses);
  responseQueue.set(get(responseQueue).filter((response) => response.id != id));
  supabase.from("responses").delete().eq("id", id).then(handle);
};

export const submitResponse = (id: number) => {
  const responses = get(activeResponses);
  const response = responses[id];
  delete responses[id];
  activeResponses.set(responses);
  responseQueue.set([...get(responseQueue), response]);
};
