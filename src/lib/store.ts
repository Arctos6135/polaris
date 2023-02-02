import { writable } from "svelte/store";
import type { Form, Response, Team, Match } from "$lib/types";
import { persisted } from "svelte-local-storage-store";

export const form = persisted<Form | null>("form", null);
export const teams = persisted<Record<number, Team>>("teams", {});
export const matches = persisted<Record<number, Match>>("matches", {});
export const response = persisted<number | null>("response", null);
export const code = persisted<number | null>("code", null);
export const activeResponses = persisted<Record<number, Response>>(
  "activeResponses",
  {}
);
export const responseQueue = persisted<Response[]>("responseQueue", []);
export const lastGet = persisted("lastGet", 0);
export const online = writable(true);
