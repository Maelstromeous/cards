import { describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { flushPromises } from '@vue/test-utils'
import { GameChat } from '#components'
import { GameChatType } from '@humanity-deck/shared/constants/GameChatType'
import type { GameChatInterface } from '@humanity-deck/shared/interfaces/GameChatInterface'
import type { GamePeopleInterface } from '@humanity-deck/shared/interfaces/GameInterface'

const host = {
  id: 'p1',
  name: 'Hosty',
  score: 0,
  ready: true,
  isHost: true,
  chosenCard: '',
}
const guest = { ...host, id: 'p2', name: 'Guesty', isHost: false }
const people: GamePeopleInterface = {
  host: { id: host.id, name: host.name },
  players: [host, guest],
}

// 1 January 2026, 12:00:05 UTC, in seconds as the API sends it.
const at = (offset: number) => String(1767268805 + offset)

const chatLog: GameChatInterface[] = [
  {
    id: '1',
    gameId: 'g',
    type: GameChatType.SYSTEM,
    timestamp: at(0),
    content: 'Ready to play.',
  },
  {
    id: '2',
    gameId: 'g',
    type: GameChatType.GAME,
    timestamp: at(1),
    personId: 'p2',
    content: '',
  },
  {
    id: '3',
    gameId: 'g',
    type: GameChatType.PLAYER,
    timestamp: at(2),
    personId: 'p1',
    content: 'Hello!',
  },
  {
    id: '4',
    gameId: 'g',
    type: GameChatType.PLAYER,
    timestamp: at(3),
    personId: 'p2',
    content: 'Hi',
  },
  {
    id: '5',
    gameId: 'g',
    type: GameChatType.GAME,
    timestamp: at(4),
    content: 'Round 1: Fight',
  },
]

const { fakeSocket } = vi.hoisted(() => {
  const handlers: Record<string, () => void> = {}
  return {
    fakeSocket: {
      handlers,
      on: vi.fn((event: string, handler: () => void) => {
        handlers[event] = handler
      }),
      emit: vi.fn(),
      disconnect: vi.fn(),
    },
  }
})

vi.mock('socket.io-client', () => ({ io: () => fakeSocket }))

async function mountChat() {
  fakeSocket.emit.mockImplementation(
    (
      _event: string,
      _gameId: string,
      ack: (log: GameChatInterface[]) => void,
    ) => ack(chatLog),
  )
  const wrapper = await mountSuspended(GameChat, {
    props: { gameId: 'g', people },
  })
  fakeSocket.handlers.connect!()
  await flushPromises()
  return wrapper
}

describe('GameChat', () => {
  it('asks the gamechat namespace for this game’s log', async () => {
    await mountChat()

    expect(fakeSocket.emit).toHaveBeenCalledWith(
      'findAllGamechat',
      'g',
      expect.any(Function),
    )
  })

  it('formats each kind of chat line', async () => {
    const wrapper = await mountChat()
    const lines = wrapper.findAll('li').map((li) => li.text())

    expect(lines).toHaveLength(5)
    expect(lines[0]).toMatch(/\[SYSTEM\] Ready to play\.$/)
    expect(lines[1]).toMatch(/Guesty has joined the game!$/)
    expect(lines[2]).toMatch(/\[HOST\]\s+Hosty: Hello!$/)
    expect(lines[3]).toMatch(/Guesty: Hi$/)
    expect(lines[3]).not.toContain('[HOST]')
    expect(lines[4]).toMatch(/Round 1: Fight$/)
  })

  it('starts each line with the time it was sent', async () => {
    const wrapper = await mountChat()

    for (const line of wrapper.findAll('li')) {
      expect(line.text()).toMatch(/^\d{2}:\d{2}:\d{2} /)
    }
  })
})
