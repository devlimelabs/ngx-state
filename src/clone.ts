export function clone<T>(value: T): T {
  let clone;

  if (Array.isArray(value)) {
    clone = [...value];
  } else if (typeof value === 'object' && value !== null) {
    clone = { ...value };
  } else {
    clone = value;
  }

  return clone;
}
