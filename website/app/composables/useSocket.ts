import { io, type Socket } from 'socket.io-client'

/**
 * Connects to a Socket.IO namespace on the API (for example `/game`) while
 * the calling component is mounted, and disconnects when it unmounts.
 * The socket only exists in the browser, so read it inside `onConnect`.
 */
export function useSocket(
  namespace: `/${string}`,
  onConnect?: (socket: Socket) => void,
) {
  const { apiBase } = useRuntimeConfig().public
  const socket = shallowRef<Socket | null>(null)

  onMounted(() => {
    const client = io(`${apiBase}${namespace}`)
    if (onConnect) client.on('connect', () => onConnect(client))
    socket.value = client
  })

  onBeforeUnmount(() => {
    socket.value?.disconnect()
    socket.value = null
  })

  return socket
}
