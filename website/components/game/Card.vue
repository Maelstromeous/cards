<template>
  <div>
    <v-card
      elevation="2"
      width="200"
      class="ma-2"
      :color="cardColor"
      style="word-break: break-word"
      outlined
    >
      <v-card-title style="align-items: start">
        <p
          :style="{ color: textColor }"
          style="word-break: break-word"
          v-html="render"
        ></p>
      </v-card-title>
    </v-card>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { CardInterface } from '../../../interfaces/CardInterface'
import { CardType } from '../../../constants/CardTypes'

export default Vue.extend({
  props: {
    card: {
      type: Object as () => CardInterface,
      required: true,
    },
  },
  computed: {
    render(): string | undefined {
      return this.card?.text?.replace(
        '<blank>',
        '<span class="text-decoration-underline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'
      )
    },
    cardColor(): string {
      console.log(this.card)
      return this.card?.type === CardType.BLACK_CARD
        ? 'grey darken-3'
        : 'grey lighten-4'
    },
    textColor(): string {
      return this.card?.type === CardType.BLACK_CARD ? 'white' : 'black'
    },
  },
})
</script>
