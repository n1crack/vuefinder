import {customRef, ref} from 'vue'

const debounce = <T extends (...args: any[]) => void>(fn: T, delay = 0, immediate = false) => {
  let timeout: ReturnType<typeof setTimeout> | undefined
  return (...args: Parameters<T>) => {
    if (immediate && !timeout) fn(...args)
    clearTimeout(timeout)
    timeout = setTimeout(() => { fn(...args) }, delay)
  }
}

const useDebouncedRef = <T>(initialValue: T, delay: number, immediate?: boolean) => {
  const state = ref<T>(initialValue)
  return customRef<T>((track, trigger) => ({
    get() { track(); return state.value },
    set: debounce((value: T) => { state.value = value; trigger() }, delay, !!immediate),
  }))
}

export default useDebouncedRef


