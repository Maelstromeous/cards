import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mountSuspended } from '@nuxt/test-utils/runtime'
import { defineComponent, h } from 'vue'

const { fakeSocket, io } = vi.hoisted(() => {
  const handlers: Record<string, () => void> = {}
  const fakeSocket = {
    handlers,
    on: vi.fn((event: string, handler: () => void) => {
      handlers[event] = handler
    }),
    disconnect: vi.fn(),
  }
  return { fakeSocket, io: vi.fn(() => fakeSocket) }
})

vi.mock('socket.io-client', () => ({ io }))

describe('useSocket', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  function mountWithSocket(onConnect = vi.fn()) {
    const Host = defineComponent({
      setup() {
        useSocket('/game', onConnect)
        return () => h('div')
      },
    })
    return mountSuspended(Host)
  }

  it('connects to the namespace on the configured API', async () => {
    await mountWithSocket()

    expect(io).toHaveBeenCalledWith('http://localhost:3001/game')
  })

  it('calls back with the socket once it connects', async () => {
    const onConnect = vi.fn()
    await mountWithSocket(onConnect)

    expect(onConnect).not.toHaveBeenCalled()
    fakeSocket.handlers.connect!()
    expect(onConnect).toHaveBeenCalledWith(fakeSocket)
  })

  it('disconnects when the component unmounts', async () => {
    const wrapper = await mountWithSocket()
    wrapper.unmount()

    expect(fakeSocket.disconnect).toHaveBeenCalled()
  })
})
