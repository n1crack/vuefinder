import {customRef, ref} from 'vue'
import { debounce } from '../utils/debounce'

const useDebouncedRef = <T>(initialValue: T, delay: number, immediate?: boolean) => {
  const state = ref<T>(initialValue)
  return customRef<T>((track, trigger) => ({
    get() { track(); return state.value },
    set: debounce((value: T) => { state.value = value; trigger() }, delay, !!immediate),
  }))
}

export default useDebouncedRef


