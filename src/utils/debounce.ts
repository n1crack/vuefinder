export const debounce = <T extends (...args: any[]) => void>(
  fn: T,
  delay = 0,
  immediate = false
) => {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  return (...args: Parameters<T>) => {
    if (immediate && !timeout) fn(...args);
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
