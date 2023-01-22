import { derived, writable } from "svelte/store";
import { localStorageStore } from "@skeletonlabs/skeleton";
import type { Form, Response } from "$lib/types";

export const forms = localStorageStore<Form[]>("forms", []);
export const responses = localStorageStore<Response[]>("responses", []);
export const activeResponses = localStorageStore<Record<number, Response>>(
  "activeResponses",
  {}
);
export const responseQueue = localStorageStore<Response[]>("responseQueue", []);
export const online = writable(true);
