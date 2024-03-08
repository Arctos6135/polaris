import { derived, get, writable } from "svelte/store";
import type { Form, Response, Team, Match, Field } from "$lib/types";
import { persisted } from "svelte-local-storage-store";
import { extractGroups } from "./serialize";

//Details of which type of form is being used
export const form = persisted<Form | null>("form", null);

//for autofilling form creation data
export const scout = persisted<string>("scout", "");
export const teams = persisted<Record<number, Team>>("teams", {});
export const matches = persisted<Record<number, Match>>("matches", {});

//The currently active response (the one the user sees on the form page)
export const response = persisted<number | null>("response", null);

//ID of the response we are displaying the QR code of
export const code = persisted<number | null>("code", null);

//list of responses which are "active" eg. can be edited (not yet submitted)
//Structured as a map of ids to responses
export const activeResponses = persisted<Record<number, Response>>(
  "activeResponses",
  {}
);

//something to do with grid, shouldn't be necessary this year
export const fields = persisted<Record<number, Record<string, Field>>>(
  "fields",
  {}
);

//This is used for formatting responses before they are sent to the server (order of keys)
export const keys = persisted<string[]>("keys", []);

//list of QRs that have already been scanned so they don't get scanned twice
export const scans = persisted<number[]>("scans", []);

//list of submitted responses waiting to go to server
export const responseQueue = persisted<Response[]>("responseQueue", []);

//the time that the get function was last called? not sure what get does yet
export const lastGet = persisted("lastGet", 0);

//check is device connected to internet (writable only works online)
export const online = writable(true);

//colour theme stuff, not necessary
export const theme = persisted("theme", "arctos");

//looks like a list of IDs and boolean values for whether or not those forms have errors?
export const errors = persisted<Record<number, boolean>>("errors", {});
