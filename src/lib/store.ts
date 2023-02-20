import { derived, get, writable } from "svelte/store";
import type { Form, Response, Team, Match } from "$lib/types";
import { persisted } from "svelte-local-storage-store";
import { extractGroups } from "./serialize";

export const form = persisted<Form | null>("form", null);
export const scout = persisted<string>("scout", "");
export const teams = persisted<Record<number, Team>>("teams", {});
export const matches = persisted<Record<number, Match>>("matches", {});
export const response = persisted<number | null>("response", null);
export const code = persisted<number | null>("code", null);
export const activeResponses = persisted<Record<number, Response>>(
  "activeResponses",
  {}
);
export const scans = persisted<number[]>("scans", []);
export const responseQueue = persisted<Response[]>("responseQueue", []);
export const lastGet = persisted("lastGet", 0);
export const online = writable(true);
export const theme = persisted("theme", "arctos");
// export const defaultData = derived(form, (form) => {
//   if (!form) return {};
//   const data = {};
// });
export const errors = persisted<Record<number, boolean>>("errors", {});
// export const errors = derived(activeResponses, (responses) => {
//   const sections = get(form)?.sections;
//   if (!sections) return {};
//   const errors: Record<number, Record<string, string | undefined>> = {};
//   Object.values(responses).forEach((response) => {
//     extractGroups(sections).forEach((group) => {
//       const component = group.component;
//     });
//   });
// });
