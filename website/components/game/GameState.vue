<template>
  <v-container>
    <div v-if="!loading">
      <v-row>
        <h1 class="text-center">Game "{{ state.id.id }}"</h1>
      </v-row>
      <v-row>
        <template>
          <v-progress-linear value="15"></v-progress-linear>
          <div class="center">Time left: 00:15</div>
        </template>
      </v-row>
      <!--      <v-row>-->
      <!--        <GameCard :card-text="blackCard.text" type="black"></GameCard>-->
      <!--      </v-row>-->
      <!--      <v-row>-->
      <!--        <GameCard-->
      <!--          :card-text="state.whiteCards[state.selectedWhiteCards[0]]"-->
      <!--          type="white"-->
      <!--        ></GameCard>-->
      <!--        <GameCard-->
      <!--          :card-text="state.whiteCards[state.selectedWhiteCards[1]]"-->
      <!--          type="white"-->
      <!--        ></GameCard>-->
      <!--        <GameCard-->
      <!--          :card-text="state.whiteCards[state.selectedWhiteCards[2]]"-->
      <!--          type="white"-->
      <!--        ></GameCard>-->
      <!--        <GameCard-->
      <!--          :card-text="state.whiteCards[state.selectedWhiteCards[3]]"-->
      <!--          type="white"-->
      <!--        ></GameCard>-->
      <!--      </v-row>-->
    </div>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
// eslint-disable-next-line import/named
import { NuxtSocket } from 'nuxt-socket-io'
import { GameInterface } from '../../../interfaces/GameInterface'
import { BlackCardInterface } from '../../../interfaces/BlackCardInterface'

export default Vue.extend({
  props: ['id'],
  data() {
    return {
      loading: true,
      state: null as GameInterface | null,
      gameSocket: null as NuxtSocket | null,
      cardSocket: null as NuxtSocket | null,
      blackCard: null as BlackCardInterface | null,
      whiteCards: [],
    }
  },
  mounted(): void {
    this.gameSocket = this.$nuxtSocket({
      name: 'main',
      channel: '/game',
    })

    this.gameSocket.on('connect', () => {
      console.log('Game Socket connected!')
      this.getGame(this.id)
    })
  },
  methods: {
    getGame(id: string): void {
      console.log('getGame', id)
      this.gameSocket?.emit('findOneGame', { id }, (res: GameInterface) => {
        console.log('Got game', res)
        this.state = res
        this.loading = false
        this.getBlackCard(this.state.cards.black)
      })
    },
    getBlackCard(cardId: string): void {
      console.log('getting black card')
      this.blackCard = await this.$http.$get('/card/' + cardId)
    },
  },
})
</script>
