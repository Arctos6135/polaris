import type { Section, Group, ComponentMap } from "$lib/types";

const serializers: {
  [T in keyof ComponentMap]: (
    data: any,
    previous: bigint,
    component: ComponentMap[T]
  ) => bigint;
} = {
  num: (data: number, previous, component) => {
    const min = component.min / component.increment;
    const max = component.max / component.increment;
    const intVal = Math.round((data - min) / component.increment);
    return previous * BigInt(max - min) + BigInt(intVal);
  },
  picker: (data: string, previous, component) => {
    if (!component.options.includes(data))
      throw new TypeError("Invalid choice");
    return (
      previous * BigInt(component.options.length) +
      BigInt(component.options.indexOf(data))
    );
  },
  text: (data: string, previous, component) => {
    const charmap: { [key: string]: bigint } = {};
    for (let i = 0; i < component.charset.length; i++) {
      charmap[component.charset[i]] = BigInt(i);
    }
    for (let i = 0; i < data.length; i++) {
      previous *= BigInt(component.charset.length);
      previous += charmap[data[i]];
      if (!(data[i] in charmap))
        throw new TypeError(`Invalid character ${data[i]}`);
    }
    previous *= BigInt(component.maxlength);
    previous += BigInt(data.length);
    return previous;
  },
  timer: (data: number, previous, component) => {
    const max = component.max / 100;
    const intVal = Math.round(data / 100);
    return previous * BigInt(max) + BigInt(intVal);
  },
  toggle: (data: number, previous) => {
    return previous * BigInt(2) + BigInt(data);
  },
};

function extractGroups(schema: Section[]): Group[] {
  const groups: Group[] = [];
  const processGroup = (group: Group) => {
    groups.push(group);
  };

  const processSection = (section: Section) => {
    for (const g of section.groups) {
      processGroup(g);
    }
  };

  for (const section of schema) processSection(section);

  return groups;
}

export function serialize(
  data: { [key: string]: number | string },
  schema: Section[]
) {
  let out = 0n;
  const processGroup = (group: Group) => {
    const serialize = serializers[group.component.type];
    out = serialize(
      data[group.component.id] as never,
      out,
      group.component as never
    );
  };

  extractGroups(schema).forEach(processGroup);
  return out;
}

const deserializers: {
  [T in keyof ComponentMap]: (
    data: bigint,
    component: ComponentMap[T]
  ) => { data: any; remaining: bigint };
} = {
  num: (data, component) => {
    const min = component.min / component.increment;
    const max = component.max / component.increment;
    const intVal = data % BigInt(max - min);
    const val = (Number(intVal) + min) * component.increment;
    return {
      data: val,
      remaining: data / BigInt(max - min),
    };
  },
  picker: (data, component) => {
    return {
      data: component.options[Number(data % BigInt(component.options.length))],
      remaining: data / BigInt(component.options.length),
    };
  },
  text: (data, component) => {
    const length = data % BigInt(component.maxlength);
    data /= BigInt(component.maxlength);
    let out = "";
    for (let i = 0n; i < length; i++) {
      out += component.charset[Number(data % BigInt(component.charset.length))];
      data /= BigInt(component.charset.length);
    }
    out = out.split("").reverse().join("");
    return { data: out, remaining: data };
  },
  toggle: (data) => {
    return {
      data: Number(data % BigInt(2)),
      remaining: data / BigInt(2),
    };
  },
  timer: (data, component) => {
    const max = component.max / 100;
    const intVal = data % BigInt(max);
    const val = Number(intVal) * 100;
    return {
      data: val,
      remaining: data / BigInt(max),
    };
  },
};
export function deserialize(data: bigint, schema: Section[]) {
  const groups = extractGroups(schema);
  groups.reverse();
  const out: { [key: string]: number | string } = {};

  const processGroup = (group: Group) => {
    const deserialize = deserializers[group.component.type];
    const res = deserialize(data, group.component as never);
    out[group.component.id] = res.data;
    data = res.remaining;
  };

  groups.forEach(processGroup);

  return out;
}
