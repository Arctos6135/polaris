import type { Section, Group, ComponentMap, GroupMap } from "$lib/types";

const componentSerializers: {
  [T in keyof ComponentMap]: (
    data: any,
    previous: bigint,
    component: ComponentMap[T]
  ) => bigint;
} = {
  num(data: number, previous, component) {
    const min = component.min / component.increment;
    const max = component.max / component.increment + 1;
    const intVal = Math.round((data - min) / component.increment);
    return previous * BigInt(max - min) + BigInt(intVal);
  },
  picker(data: string, previous, component) {
    if (!component.options.includes(data))
      throw new TypeError("Invalid choice");
    return (
      previous * BigInt(component.options.length) +
      BigInt(component.options.indexOf(data))
    );
  },
  text(data: string, previous, component) {
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
  timer(data: number, previous, component) {
    const max = component.max / 100 + 1;
    const intVal = Math.round(data / 100);
    return previous * BigInt(max) + BigInt(intVal);
  },
  toggle(data: number, previous) {
    return previous * BigInt(2) + BigInt(data);
  },
};

const serializers: {
  [T in keyof GroupMap]: (
    data: { [key: string]: number | string },
    previous: bigint,
    group: GroupMap[T]
  ) => bigint;
} = {
  input(data, previous, group) {
    return componentSerializers[group.component.type](
      data[group.component.id],
      previous,
      group.component as never
    );
  },
  row(data, previous, group) {
    group.components.forEach((component) => {
      previous = serializers.input(data, previous, component);
    });
    return previous;
  },
  grid(data, previous, group) {
    group.components.forEach((component) => {
      previous = componentSerializers.num(data[component.id], previous, {
        min: 0,
        max: 9,
        increment: 1,
        type: "num",
        id: component.id,
      });
    });
    return previous;
  },
};

export function extractGroups(schema: Section[]) {
  const groups: Group[] = [];
  schema.forEach((section) =>
    section.groups.forEach((group) => groups.push(group))
  );
  return groups;
}

export function serialize(
  data: { [key: string]: number | string },
  schema: Section[]
) {
  let out = 0n;
  extractGroups(schema).forEach((group) => {
    const serialize = serializers[group.type];
    out = serialize(data, out, group as never);
  });

  return out;
}

const componentDeserializers: {
  [T in keyof ComponentMap]: (
    data: bigint,
    component: ComponentMap[T]
  ) => { data: any; remaining: bigint };
} = {
  num: (data, component) => {
    const min = component.min / component.increment;
    const max = component.max / component.increment + 1;
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
    const max = component.max / 100 + 1;
    const intVal = data % BigInt(max);
    const val = Number(intVal) * 100;
    return {
      data: val,
      remaining: data / BigInt(max),
    };
  },
};
const deserializers: {
  [T in keyof GroupMap]: (
    data: bigint,
    out: { [key: string]: number | string },
    group: GroupMap[T]
  ) => { remaining: bigint; out: { [key: string]: number | string } };
} = {
  input(data, out, group) {
    const res = componentDeserializers[group.component.type](
      data,
      group.component as never
    );
    out[group.component.id] = res.data;
    return { out, remaining: res.remaining };
  },
  row(data, out, group) {
    group.components.reverse().forEach((component) => {
      const res = deserializers.input(data, out, component);
      out = res.out;
      data = res.remaining;
    });
    return { out, remaining: data };
  },
  grid(data, out, group) {
    group.components.reverse().forEach((component) => {
      const res = componentDeserializers.num(data, {
        min: 0,
        max: 9,
        increment: 1,
        type: "num",
        id: component.id,
      });
      out[component.id] = res.data;
      data = res.remaining;
    });
    return { out, remaining: data };
  },
};
export function deserialize(data: bigint, schema: Section[]) {
  let out: { [key: string]: number | string } = {};
  extractGroups(schema)
    .reverse()
    .forEach((group) => {
      const deserialize = deserializers[group.type];
      const res = deserialize(data, out, group as never);
      out = res.out;
      data = res.remaining;
    });

  return out;
}
