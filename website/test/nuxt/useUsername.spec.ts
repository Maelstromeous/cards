import { beforeEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'

describe('useUsername', () => {
  beforeEach(() => {
    localStorage.clear()
  })

  it('starts empty for a new visitor', () => {
    expect(useUsername().value).toBe('')
  })

  it('remembers the name in localStorage', async () => {
    const username = useUsername()
    username.value = 'Matt'
    await nextTick()

    expect(localStorage.getItem('username')).toBe('Matt')
  })

  it('reads a name saved on an earlier visit', () => {
    localStorage.setItem('username', 'Returning player')

    expect(useUsername().value).toBe('Returning player')
  })
})
