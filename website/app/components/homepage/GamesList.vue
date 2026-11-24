<script setup lang="ts">
import type { TableColumn } from '@nuxt/ui'
import type { GameInterface } from '#interfaces/GameInterface'
import { GameTypesFriendly } from '#constants/GameTypes'
import { GameStatus, GameStatusFriendly } from '#constants/GameStatus'

const games = ref<GameInterface[]>([])
const loading = ref(true)
const search = ref('')
const selectedStatuses = ref<GameStatus[]>([])

const statusOptions = Object.values(GameStatus)
  .filter((value): value is GameStatus => typeof value === 'number')
  .map((value) => ({ label: GameStatusFriendly[value], value }))

const socket = useSocket('/game', () => getGames())

function getGames() {
  loading.value = true
  socket.value?.emit(
    'findAllGame',
    selectedStatuses.value,
    (res: GameInterface[]) => {
      games.value = res
      loading.value = false
    },
  )
}

watch(selectedStatuses, getGames)

const columns: TableColumn<GameInterface>[] = [
  { id: 'locked', header: '' },
  { accessorKey: 'name', header: 'Game Name' },
  {
    id: 'host',
    accessorFn: (game) => game.people.host.name,
    header: 'Host',
  },
  { id: 'players', header: 'Players' },
  {
    id: 'status',
    accessorFn: (game) => GameStatusFriendly[game.status],
    header: 'Status',
  },
  {
    id: 'gameType',
    accessorFn: (game) => GameTypesFriendly[game.options.gameType],
    header: 'Game Type',
  },
  { id: 'actions', header: '' },
]

/** The host is not in the players list, so add one for them. */
function playerCount(game: GameInterface) {
  return game.people.players.length + 1
}
</script>

<template>
  <section>
    <h2 class="mb-6 text-center text-3xl font-bold">Open Games</h2>

    <div class="grid gap-6 md:grid-cols-4">
      <UCard class="md:col-span-1">
        <template #header>
          <h3 class="font-semibold">Filters</h3>
        </template>
        <UFormField label="Status">
          <USelectMenu
            v-model="selectedStatuses"
            :items="statusOptions"
            value-key="value"
            multiple
            placeholder="Any status"
            class="w-full"
          />
        </UFormField>
      </UCard>

      <div class="min-w-0 space-y-3 md:col-span-3">
        <UInput
          v-model="search"
          icon="i-lucide-search"
          placeholder="Search for game name or host"
          class="w-full"
        />
        <UCard :ui="{ body: 'p-0 sm:p-0' }">
          <!-- The games arrive over the socket in the browser, so the table
               renders client-side only (it also avoids a hydration mismatch). -->
          <ClientOnly>
            <template #fallback>
              <div class="space-y-3 p-4">
                <USkeleton v-for="i in 3" :key="i" class="h-8 w-full" />
              </div>
            </template>
            <UTable
              v-model:global-filter="search"
              :data="games"
              :columns="columns"
              :loading="loading"
              empty="No open games right now."
            >
              <template #locked-cell="{ row }">
                <UTooltip
                  :text="
                    row.original.locked
                      ? 'Game is locked with a password'
                      : 'Game is open to anyone, host will be asked to accept you'
                  "
                >
                  <UIcon
                    :name="
                      row.original.locked
                        ? 'i-lucide-lock'
                        : 'i-lucide-lock-open'
                    "
                    class="size-4"
                  />
                </UTooltip>
              </template>

              <template #players-cell="{ row }">
                <UTooltip>
                  <UBadge
                    :color="
                      playerCount(row.original) >=
                      row.original.options.maxPlayers
                        ? 'error'
                        : 'neutral'
                    "
                    variant="subtle"
                  >
                    {{ playerCount(row.original) }}/{{
                      row.original.options.maxPlayers
                    }}
                  </UBadge>
                  <template #content>
                    <ul class="text-xs">
                      <li>[HOST] {{ row.original.people.host.name }}</li>
                      <li
                        v-for="player in row.original.people.players"
                        :key="player.id"
                      >
                        {{ player.name }}
                      </li>
                    </ul>
                  </template>
                </UTooltip>
              </template>

              <template #actions-cell="{ row }">
                <div class="text-right">
                  <UButton
                    :to="`/game/${row.original.id}`"
                    :disabled="!row.original.validToJoin"
                    size="sm"
                  >
                    Join
                  </UButton>
                </div>
              </template>
            </UTable>
          </ClientOnly>
        </UCard>
      </div>
    </div>
  </section>
</template>
