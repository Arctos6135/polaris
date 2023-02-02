import { writable } from "svelte/store";
import { localStorageStore } from "@skeletonlabs/skeleton";
import type { Form, Response, Team, Match } from "$lib/types";

export const form = localStorageStore<Form>("form", { sections: [] });
export const teams = localStorageStore<Record<number, Team>>("teams", {});
export const matches = localStorageStore<Record<number, Match>>("matches", {});
export const activeResponses = localStorageStore<Record<number, Response>>(
  "activeResponses",
  {}
);
export const responseQueue = localStorageStore<Response[]>("responseQueue", []);
export const lastGet = localStorageStore("lastGet", 0);
export const online = writable(true);
