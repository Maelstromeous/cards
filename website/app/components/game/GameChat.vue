<script setup lang="ts">
import { format } from 'date-fns'
import type { GameChatInterface } from '#interfaces/GameChatInterface'
import type { GamePeopleInterface } from '#interfaces/GameInterface'
import { GameChatType } from '#constants/GameChatType'

const props = defineProps<{ gameId: string; people: GamePeopleInterface }>()

const chatLog = ref<GameChatInterface[] | null>(null)
const messageToSend = ref('')

useSocket('/gamechat', (socket) => {
  socket.emit('findAllGamechat', props.gameId, (res: GameChatInterface[]) => {
    chatLog.value = res
  })
})

function person(personId?: string) {
  return props.people.players.find((player) => player.id === personId)
}

function time(timestamp: string) {
  return format(Number.parseInt(timestamp) * 1000, 'HH:mm:ss')
}

function sendMessage() {
  // TODO: send over the socket so the API can distribute it to other players.
  messageToSend.value = ''
}
</script>

<template>
  <UCard class="self-start" :ui="{ body: 'max-h-[60vh] overflow-y-auto' }">
    <template #header>
      <h2 class="font-semibold">Chat</h2>
    </template>

    <div v-if="!chatLog" class="space-y-3">
      <USkeleton v-for="i in 6" :key="i" class="h-4 w-full" />
    </div>
    <ul v-else class="space-y-1 text-sm">
      <li
        v-for="line in chatLog"
        :key="line.id"
        :class="{ 'text-muted italic': line.type !== GameChatType.PLAYER }"
      >
        <span class="text-primary">{{ time(line.timestamp) }}</span>{{ ' ' }}
        <template v-if="line.type === GameChatType.SYSTEM">
          [SYSTEM] {{ line.content }}
        </template>
        <template v-else-if="!line.personId">
          {{ line.content }}
        </template>
        <template v-else-if="person(line.personId)">
          <template v-if="line.type === GameChatType.GAME">
            {{ person(line.personId)?.name }} has joined the game!
          </template>
          <template v-else>
            <span v-if="person(line.personId)?.isHost" class="text-error">
              [HOST]
            </span>
            <b>{{ person(line.personId)?.name }}:</b> {{ line.content }}
          </template>
        </template>
      </li>
    </ul>

    <template #footer>
      <form @submit.prevent="sendMessage">
        <UInput
          v-model="messageToSend"
          placeholder="Enter your message"
          class="w-full"
        >
          <template #trailing>
            <UButton
              type="submit"
              icon="i-lucide-send"
              variant="link"
              size="sm"
              aria-label="Send"
            />
          </template>
        </UInput>
      </form>
    </template>
  </UCard>
</template>
