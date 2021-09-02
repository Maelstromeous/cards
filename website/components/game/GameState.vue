<template>
  <v-container>
    <div v-if="!loading">
      <v-row>
        <h1 class="text-center">Game "{{ state.name }}"</h1>
      </v-row>
      <v-row>
        <template>
          <v-progress-linear value="15"></v-progress-linear>
          <div class="center">Time left: 00:15</div>
        </template>
      </v-row>
      <v-row>
        <GameCard v-if="blackCard" :card="blackCard"></GameCard>
      </v-row>
      <v-row>
        <GameCard
          v-for="card in whiteCards"
          :key="card.id"
          :card="card"
        ></GameCard>
      </v-row>
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
      blackCard: null as BlackCardInterface | null,
      whiteCards: [],
      playerId: '7f660100-9b29-4d43-b2dc-85fa606c7123',
    }
  },
  mounted(): void {
    this.gameSocket = this.$nuxtSocket({
      name: 'main',
      channel: '/game',
    })

    this.gameSocket?.on('connect', () => {
      console.log('Game Socket connected!')
      this.getGame(this.id)
    })
  },
  methods: {
    getGame(id: string): void {
      console.log('getGame', id)
      this.gameSocket?.emit(
        'findOneGame',
        { id },
        async (res: GameInterface) => {
          console.log('Got game', res)
          this.state = res
          await this.getBlackCard(this.state.cards.black)
          await this.getWhiteCards(this.playerId, this.state.id)
          this.loading = false
        }
      )
    },
    async getBlackCard(cardId: string): Promise<void> {
      console.log('getting black card')
      this.blackCard = await this.$axios.$get('/card/' + cardId)

      console.log('blackCard', this.blackCard)
    },

    async getWhiteCards(playerId: string, gameId: string): Promise<void> {
      console.log('getting white cards for player', playerId, 'in game', gameId)
      this.whiteCards = await this.$axios.$get(
        `/card/player/${playerId}/game/${gameId}`
      )

      console.log('whiteCards', this.whiteCards)
    },
  },
})
</script>
