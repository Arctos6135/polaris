import { form, lastGet, matches, teams } from "$lib/store";
import type { Group, Team, Alliance, Match, Response } from "$lib/types";

export const get = async () => {
  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbw8YjDK4o78zJoyolJN79rqpAY6UM-f8kCuPNQk8D-7ewSyjAYeQ57g6Bz7eQBPXRTfKQ/exec"
  );
  const {
    matches: match_array,
    teams: team_array,
    sections,
    options,
    config,
  }: Record<string, any[][]> = await response.json();
  setForm(sections, config, options);
  setMatches(match_array);
  setTeams(team_array as [number, string][]);
  lastGet.set(Date.now());
};

export const append = async (responseQueue: Response[]) => {
  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbw8YjDK4o78zJoyolJN79rqpAY6UM-f8kCuPNQk8D-7ewSyjAYeQ57g6Bz7eQBPXRTfKQ/exec",
    {
      method: "POST",
      body: JSON.stringify(
        responseQueue.map((response) => [
          ...Object.values(response.data),
          response.id,
        ])
      ),
      headers: {
        "Content-Type": "application/json",
      },
      mode: "no-cors",
    }
  );
};
const setForm = (
  sections: string[][],
  config: string[][],
  options: string[][]
) => {
  const groups: Group[] = transpose(config).map((group) => {
    const [
      id,
      type,
      label,
      section,
      default_,
      max,
      min,
      increment,
      charset,
      option,
    ] = group;
    return {
      label,
      section,
      type: "group",
      component: {
        id,
        type,
        default: parseInt(default_),
        max: parseInt(max),
        min: parseInt(min),
        increment: parseInt(increment),
        charset,
        options: options.find((opt) => opt[0] == option)?.slice(1),
      },
    } as Group;
  });
  form.set({
    sections: sections.map((section) => {
      const [id, header] = section;
      return {
        type: "section",
        header,
        id,
        groups: groups.filter((group) => group.section == id),
      };
    }),
  });
};

const setTeams = (team_array: [number, string][]) => {
  const team_obj: Record<number, Team> = {};
  team_array.forEach(
    (team) =>
      (team_obj[team[0]] = {
        number: team[0],
        name: team[1],
      })
  );
  teams.set(team_obj);
};

const setMatches = (match_array: number[][]) => {
  const match_obj: Record<number, Match> = {};
  match_array.forEach(
    (match, i) =>
      (match_obj[i + 1] = {
        number: i + 1,
        red_alliance: match.slice(0, 3) as Alliance,
        blue_alliance: match.slice(3, 6) as Alliance,
        red_score: match[6],
        blue_score: match[7],
      })
  );
  matches.set(match_obj);
};

const transpose = <T>(matrix: T[][]) =>
  matrix[0].map((_, i) => matrix.map((array) => array[i]));
