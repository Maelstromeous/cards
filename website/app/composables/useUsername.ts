import { useLocalStorage } from '@vueuse/core'

/** The player's chosen display name, kept in localStorage across visits. */
export function useUsername() {
  return useLocalStorage('username', '')
}
