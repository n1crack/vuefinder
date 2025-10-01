export interface Upsertable { path: string; [key: string]: unknown }

export default function upsert<T extends Upsertable>(array: T[], element: T): void {
  const i = array.findIndex((e) => e.path === element.path);
  if (i > -1) {
    array[i] = element;
  } else {
    array.push(element);
  }
}


