export type Response = {
  data: Record<string, string | number>;
  form: number;
  id: number;
  name: string;
  scout: string;
  team: string;
}
export type Num = {
  type: "num";
  min: number;
  max: number;
  increment: number;
  default?: number;
  valueID: string;
};
export type Picker = {
  type: "picker";
  options: string[];
  default?: string;
  valueID: string;
};
export type Text = {
  type: "text";
  maxlength: number;
  password: boolean;
  default?: string;
  charset: string;
  valueID: string;
};
export type Timer = {
  type: "timer";
  max: number;
  valueID: string;
};
export type Toggle = {
  type: "toggle";
  valueID: string;
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
  description?: string;
};

export type Row = {
  type: "row";
  components: Group[];
};

export type Section = {
  type: "section";
  header?: string;
  groups: Array<Group | Row>;
};

export type Form = {
  sections: Section[];
  team: string;
  id: number;
  name: string;
};
