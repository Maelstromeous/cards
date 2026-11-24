<script setup lang="ts">
import type { GameInterface } from '#interfaces/GameInterface'
import type { BlackCardInterface } from '#interfaces/BlackCardInterface'
import type { CardInterface } from '#interfaces/CardInterface'

const props = defineProps<{ id: string }>()

const { apiBase, siteUrl } = useRuntimeConfig().public
const toast = useToast()
const { copy } = useClipboard()

const state = ref<GameInterface | null>(null)
const blackCard = ref<BlackCardInterface | null>(null)
const whiteCards = ref<CardInterface[]>([])
// TODO: replace with the signed-in player's id.
const playerId = '7f660100-9b29-4d43-b2dc-85fa606c7123'

const gameUrl = computed(() => `${siteUrl}/game/${state.value?.id}`)

useSocket('/game', (socket) => {
  socket.emit('findOneGame', { id: props.id }, async (game: GameInterface) => {
    const [black, white] = await Promise.all([
      $fetch<BlackCardInterface>(`/card/${game.cards.black}`, {
        baseURL: apiBase,
      }),
      $fetch<CardInterface[]>(`/card/player/${playerId}/game/${game.id}`, {
        baseURL: apiBase,
      }),
    ])
    blackCard.value = black
    whiteCards.value = white
    state.value = game
  })
})

async function copyLink() {
  try {
    await copy(gameUrl.value)
    toast.add({ title: 'Game link copied', description: gameUrl.value })
  } catch {
    toast.add({ title: 'Failed to copy the game link', color: 'error' })
  }
}
</script>

<template>
  <div v-if="!state" class="flex justify-center py-20">
    <UIcon name="i-lucide-loader-circle" class="size-8 animate-spin" />
  </div>

  <div v-else class="space-y-6">
    <div class="flex flex-wrap items-center gap-3">
      <h1 class="text-3xl font-bold">Game "{{ state.name }}"</h1>
      <UButton
        icon="i-lucide-copy"
        color="neutral"
        variant="outline"
        @click="copyLink"
      >
        Copy Link
      </UButton>
    </div>

    <div>
      <UProgress :model-value="15" :max="100" />
      <p class="mt-1 text-center text-sm text-muted">Time left: 00:15</p>
    </div>

    <div class="grid gap-6 lg:grid-cols-4">
      <div class="space-y-6 lg:col-span-3">
        <GameCard v-if="blackCard" :card="blackCard" />
        <div class="flex flex-wrap gap-4">
          <GameCard v-for="card in whiteCards" :key="card.id" :card="card" />
        </div>
      </div>
      <GameChat :game-id="state.id" :people="state.people" />
    </div>
  </div>
</template>
