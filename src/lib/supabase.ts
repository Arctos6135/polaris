import { createClient, isAuthError, type AuthResponse, type PostgrestResponse, type Session, type User } from "@supabase/supabase-js";
import {
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY,
} from "$env/static/public";
import type { Database } from "$lib/database";
import { toastStore } from "@skeletonlabs/skeleton";
import { forms, online, responses, scout, scouts, team } from "./store";
import { get } from "svelte/store";

export const supabase = createClient<Database>(
  PUBLIC_SUPABASE_URL,
  PUBLIC_SUPABASE_ANON_KEY
);

interface PostgrestResponseBase {
  status: number;
  statusText: string;
}

interface PostgrestResponseSuccess<T> extends PostgrestResponseBase {
  error: null;
  data: T[];
  count: number | null;
}
interface AuthResponseSuccess {
  data: {
    user: User | null
    session: Session | null
  }
  error: null
}

const isPostgrest = <T>(response: AuthResponse | PostgrestResponse<T>): response is PostgrestResponse<T> => !isAuthError(response.error)

export function handle(response: AuthResponse): response is AuthResponseSuccess;
export function handle<T>(
  response: PostgrestResponse<T>
): response is PostgrestResponseSuccess<T>;
export function handle<T>(
  response: PostgrestResponse<T> | AuthResponse
): response is PostgrestResponseSuccess<T> | AuthResponseSuccess {
  if (isPostgrest(response) && response.status === 0) {
    online.set(false);
    return false;
  }
  if (response.error) {
    toastStore.trigger({
      message: response.error.message,
      preset: "error",
      autohide: true,
      timeout: 5000,
    });
    return false;
  }
  return true;
};

export const fetch = async () => {
  supabase
    .from("scouts")
    .select()
    .then(async (response) => {
      if (handle(response)) {
        scouts.set(response.data);
      }
    });

  supabase
    .from("forms")
    .select()
    .then((response) => {
      if (handle(response)) {
        forms.set(response.data);
      }
    });
  supabase
    .from("responses")
    .select()
    .then((response) => {
      if (handle(response)) {
        responses.set(response.data);
      }
    });
  supabase
    .from("teams")
    .select()
    .then((response) => {
      if (handle(response)) {
        team.set(
          response.data.find((team) => team.team_id === get(scout)?.team) ||
          null
        );
      }
    });
};
