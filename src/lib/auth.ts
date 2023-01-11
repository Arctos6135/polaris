import { AuthError } from "@supabase/supabase-js";
import {
  activeResponses,
  forms,
  responseQueue,
  responses,
  scout,
  scouts,
  team,
} from "./store";
import { supabase, handle } from "./supabase";

export const signup = async (data: {
  email: string;
  password: string;
  name: string;
  team_id: string;
  team_name: string;
}): Promise<boolean> => {
  const user = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });
  if (!handle(user)) {
    return false;
  }
  let response = await supabase.from("teams").insert({
    email: data.email,
    team_id: data.team_id,
    team_name: data.team_name,
  });
  if (!handle(response)) {
    return false;
  }
  response = await supabase.from("scouts").insert({
    admin: true,
    id: user.data.user!.id,
    name: data.name,
    email: data.email,
    team: data.team_id,
    accepted: true,
  });
  if (!handle(response)) {
    return false;
  }
  return true;
};
export const join = async (data: {
  email: string;
  password: string;
  name: string;
  team_id: string;
}) => {
  const team = await supabase
    .from("teams")
    .select()
    .eq("team_id", data.team_id);
  if (!team.data?.length) {
    handle({
      data: { user: null, session: null },
      error: new AuthError("Team doesn't exist"),
    });
    return false;
  }
  const user = await supabase.auth.signUp({
    email: data.email,
    password: data.password,
  });
  if (!handle(user)) {
    return false;
  }
  const scout = await supabase.from("scouts").insert({
    id: user.data.user!.id,
    name: data.name,
    team: data.team_id,
    email: data.email,
  });
  if (!handle(scout)) {
    return false;
  }
  return true;
};

export const login = async (data: {
  email: string;
  password: string;
}): Promise<boolean> => {
  const signIn = await supabase.auth.signInWithPassword({ ...data });
  if (!handle(signIn)) {
    return false;
  }
  const scoutResponse = await supabase
    .from("scouts")
    .select()
    .eq("id", signIn.data.user?.id);
  if (!handle(scoutResponse)) {
    return false;
  }
  scout.set(scoutResponse.data[0]);
  return true;
};

export const logout = async () => {
  await supabase.auth.signOut();
  scout.set(null);
  scouts.set([]);
  forms.set([]);
  responses.set([]);
  activeResponses.set({});
  responseQueue.set([]);
  team.set(null);
};
