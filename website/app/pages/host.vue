<script setup lang="ts">
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator'
import { GameTypes } from '@humanity-deck/shared/constants/GameTypes'
import { GameStatus } from '@humanity-deck/shared/constants/GameStatus'
import type { PackInterface } from '@humanity-deck/shared/interfaces/PackInterface'

useHead({ title: 'Host a game' })

const name = ref('')
const password = ref('')
const showPass = ref(false)
const maxPlayers = ref(3)
const scoreToWin = ref(5)
const roundTimer = ref(15)
const gameType = ref(GameTypes.CARD_TSAR)
const status = ref(GameStatus.SETTING_UP)
const selectedPacks = ref<number[]>([])

const gameTypeOptions = [
  { label: 'Card Tsar', value: GameTypes.CARD_TSAR },
  {
    label: 'Popular Vote (coming soon!)',
    value: GameTypes.POPULAR_VOTE,
    disabled: true,
  },
]

// TODO: load the available packs from the API.
const availablePacks: PackInterface[] = [
  { id: 1, name: 'Jews Pack', official: false },
  { id: 2, name: 'Murica Pack', official: false },
  { id: 3, name: 'Trump Pack', official: false },
  { id: 4, name: 'South Park Pack', official: false },
  { id: 5, name: 'Hot diggity dog long Pack', official: false },
  { id: 6, name: 'COVID19 Pack', official: false },
  { id: 7, name: 'Official UK Pack', official: true },
  { id: 8, name: 'Official US Pack', official: true },
  { id: 9, name: 'Degenerate Pack', official: false },
  { id: 10, name: 'Jim Jong Un Pack', official: false },
  { id: 11, name: 'Inbred Pack', official: false },
  { id: 12, name: 'School Shootings Pack', official: false },
  { id: 13, name: 'I need sleep Pack', official: false },
  { id: 14, name: 'Work Pack', official: false },
  { id: 15, name: 'Video Games Pack', official: false },
  { id: 16, name: 'Dungeon & Dragons Pack', official: false },
  { id: 17, name: "I'm running out of options Pack", official: false },
  { id: 18, name: 'Please Help Me Pack', official: false },
  { id: 19, name: 'Another Pack', official: false },
  { id: 20, name: 'Yet another Pack', official: false },
  { id: 21, name: 'MacBook Pack', official: false },
]

const nameError = computed(() => {
  if (!name.value) return 'Required.'
  if (name.value.length < 4) return 'Min 4 characters'
  if (name.value.length >= 30) return 'Max 30 characters'
  return undefined
})
const isStarting = computed(() => status.value === GameStatus.STARTING)

function togglePack(id: number, checked: boolean | 'indeterminate') {
  selectedPacks.value = checked
    ? [...selectedPacks.value, id]
    : selectedPacks.value.filter((pack) => pack !== id)
}

async function startGame() {
  status.value = GameStatus.STARTING
  const gameId = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: '-',
    length: 3,
  })
  // TODO: create the game on the API instead of waiting.
  await new Promise((resolve) => setTimeout(resolve, 2000))
  await navigateTo(`/game/${gameId}`)
}
</script>

<template>
  <UContainer class="space-y-6 py-10">
    <div class="text-center">
      <h1 class="text-3xl font-bold">
        Create Game<template v-if="name"> "{{ name }}"</template>
      </h1>
      <UButton
        class="mt-4"
        size="lg"
        :disabled="!!nameError"
        :loading="isStarting"
        @click="startGame"
      >
        {{ isStarting ? 'Starting...' : 'Start Game' }}
      </UButton>
    </div>

    <fieldset :disabled="isStarting" class="grid gap-6 md:grid-cols-2">
      <UCard>
        <template #header>
          <h2 class="font-semibold">Game Options</h2>
        </template>
        <div class="space-y-5">
          <UFormField
            label="Game name"
            required
            :error="name ? nameError : undefined"
            :help="`${name.length}/30`"
          >
            <UInput v-model="name" class="w-full" :maxlength="30" />
          </UFormField>

          <UFormField
            label="Password"
            help="Enter password to make your game private"
          >
            <UInput
              v-model="password"
              :type="showPass ? 'text' : 'password'"
              class="w-full"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="link"
                  size="sm"
                  :icon="showPass ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="showPass ? 'Hide password' : 'Show password'"
                  @click="showPass = !showPass"
                />
              </template>
            </UInput>
          </UFormField>

          <UFormField :label="`Players: ${maxPlayers}`">
            <USlider v-model="maxPlayers" :min="3" :max="10" />
          </UFormField>
          <UFormField :label="`Score to win: ${scoreToWin}`">
            <USlider v-model="scoreToWin" :min="5" :max="25" />
          </UFormField>
          <UFormField :label="`Round timer: ${roundTimer}s`">
            <USlider v-model="roundTimer" :min="15" :max="120" />
          </UFormField>
        </div>
      </UCard>

      <UCard>
        <template #header>
          <h2 class="font-semibold">Game Type</h2>
        </template>
        <URadioGroup v-model="gameType" :items="gameTypeOptions" />
      </UCard>

      <UCard class="md:col-span-2">
        <template #header>
          <h2 class="font-semibold">Card Packs</h2>
        </template>
        <div class="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <UCheckbox
            label="Base Pack (always included)"
            :model-value="true"
            disabled
          />
          <UCheckbox
            v-for="pack in availablePacks"
            :key="pack.id"
            :label="pack.name"
            :model-value="selectedPacks.includes(pack.id)"
            @update:model-value="togglePack(pack.id, $event)"
          />
        </div>
      </UCard>
    </fieldset>
  </UContainer>
</template>
