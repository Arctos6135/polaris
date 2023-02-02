export type Response = {
  data: Record<string, string | number>;
  id: number;
  name: string;
  scout: string;
};
export type Num = {
  type: "num";
  min: number;
  max: number;
  increment: number;
  default?: number;
  id: string;
};
export type Picker = {
  type: "picker";
  options: string[];
  default?: string;
  id: string;
};
export type Text = {
  type: "text";
  maxlength: number;
  password: boolean;
  default?: string;
  charset: string;
  id: string;
};
export type Timer = {
  type: "timer";
  max: number;
  id: string;
};
export type Toggle = {
  type: "toggle";
  id: string;
};

export type ComponentMap = {
  num: Num;
  picker: Picker;
  text: Text;
  timer: Timer;
  toggle: Toggle;
};
export type Component = Num | Picker | Text | Timer | Toggle;

export type Group = {
  type: "group";
  label: string;
  component: Component;
  section: string;
};

export type Section = {
  type: "section";
  id: string;
  header?: string;
  groups: Array<Group>;
};

export type Form = {
  sections: Section[];
};

export type Team = {
  number: number;
  name: string;
};

export type Alliance = [number, number, number];

export type Match = {
  number: number;
  red_alliance: Alliance;
  blue_alliance: Alliance;
  red_score?: number;
  blue_score?: number;
};
