<script setup lang="ts">
import type { CardInterface } from '@humanity-deck/shared/interfaces/CardInterface'
import { CardType } from '@humanity-deck/shared/constants/CardTypes'

const props = defineProps<{ card: CardInterface }>()

const isBlack = computed(() => props.card.type === CardType.BLACK_CARD)
// Black cards mark each gap to fill with `<blank>`.
const parts = computed(() => props.card.text.split('<blank>'))
</script>

<template>
  <article
    class="flex aspect-[5/7] w-44 shrink-0 rounded-xl border p-4 text-lg leading-snug font-bold break-words shadow-sm"
    :class="
      isBlack
        ? 'border-neutral-900 bg-neutral-900 text-white dark:border-neutral-600'
        : 'border-neutral-200 bg-white text-neutral-900'
    "
  >
    <p>
      <template v-for="(part, index) in parts" :key="index">
        <span
          v-if="index > 0"
          class="inline-block w-16 border-b-2 border-current align-baseline"
          aria-label="blank"
        />{{ part }}
      </template>
    </p>
  </article>
</template>
