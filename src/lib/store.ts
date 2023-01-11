import { derived, writable } from "svelte/store";
import { localStorageStore } from "@skeletonlabs/skeleton";
import type { Form, Response, Team, Scout } from "$lib/types";

export const forms = localStorageStore<Form[]>("forms", []);
export const responses = localStorageStore<Response[]>("responses", []);
export const activeResponses = localStorageStore<Record<number, Response>>(
  "activeResponses",
  {}
);
export const responseQueue = localStorageStore<Response[]>("responseQueue", []);
export const team = localStorageStore<Team | null>("team", null);
export const scout = localStorageStore<Scout | null>("scout", null);
export const scouts = localStorageStore<Scout[]>("scouts", []);
export const admin = derived(scout, ($scout) => !!$scout?.admin);
export const loggedin = derived(scout, ($scout) => !!$scout);
export const online = writable(true);
