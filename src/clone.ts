export function clone<T>(value: T): T {
  let cloned;

  if (Array.isArray(value)) {
    cloned = [...value];
  } else if (typeof value === 'object' && value !== null) {
    cloned = { ...value };
  } else {
    cloned = value;
  }

  return cloned;
}
