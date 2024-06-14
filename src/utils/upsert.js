// a function to update an element in an array if it exists, or add it if it doesn't
export default function upsert(array, element) {
  const i = array.findIndex((e) => e.path === element.path);
  if (i > -1) {
    array[i] = element;
  } else {
    array.push(element);
  }
}