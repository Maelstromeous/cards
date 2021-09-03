<template>
  <section>
    <v-container fluid>
      <div v-if="loading">Loading...</div>
      <div v-if="!loading">
        <v-row>
          <v-col cols="12">
            <h1 class="mb-4">
              Game "{{ state.name }}"
              <v-btn
                v-clipboard:copy="gameUrl"
                v-clipboard:success="onCopy"
                v-clipboard:error="onError"
              >
                <font-awesome-icon icon="copy" class="mr-2"></font-awesome-icon>
                Copy Link
              </v-btn>
            </h1>
          </v-col>
        </v-row>
        <v-row>
          <template>
            <v-progress-linear value="15"></v-progress-linear>
            <div class="center">Time left: 00:15</div>
          </template>
        </v-row>
        <v-row>
          <v-col cols="12" md="8" lg="9">
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
          </v-col>
          <v-col cols="12" md="4" lg="3">
            <GameChat :game-id="state.id" :people="state.people"></GameChat>
          </v-col>
        </v-row>
      </div>
    </v-container>
  </section>
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
  computed: {
    gameUrl(): string {
      return `${process.env.baseUrl}/game/${this.state?.id}`
    },
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
    onCopy(e: any) {
      alert('Game URL: ' + e.text + ' copied!')
    },
    onError(e: string) {
      alert('Failed to copy texts!' + e)
    },
  },
})
</script>
