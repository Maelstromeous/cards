<!--suppress ALL -->
<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-row justify="center">
        <h1>Open Games</h1>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          <v-card>
            <v-card-title>Filters</v-card-title>
            <v-card-text>
              <v-select
                v-model="selectedStatuses"
                :items="items"
                attach
                chips
                label="Status"
                multiple
                @change="getGamesFromStatus"
              ></v-select>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="9">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search for game name or host"
            single-line
            hide-details
          ></v-text-field>
          <v-data-table
            :headers="headers"
            :items="games"
            :items-per-page="10"
            :search="search"
            class="elevation-1"
            :loading="loading"
            loading-text="Give me a god damn minute will ya..."
          >
            <template #item.locked="{ item }">
              <v-tooltip v-if="item.locked" bottom>
                <template #activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on"
                    ><font-awesome-icon icon="lock"></font-awesome-icon
                  ></span>
                </template>
                <span>Game is locked with a password</span>
              </v-tooltip>
              <v-tooltip v-if="!item.locked" bottom>
                <template #activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on"
                    ><font-awesome-icon icon="lock-open"></font-awesome-icon
                  ></span>
                </template>
                <span
                  >Game is open to anyone, host will be asked to accept
                  you</span
                >
              </v-tooltip>
            </template>
            <template #item.people.players.length="{ item }">
              <v-tooltip bottom>
                <template #activator="{ on, attrs }">
                  <v-chip
                    class="ma-2"
                    :color="
                      item.people.players.length + 1 === item.options.maxPlayers
                        ? 'red'
                        : ''
                    "
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ item.people.players.length + 1 }}/{{
                      item.options.maxPlayers
                    }}
                  </v-chip>
                </template>
                <p v-for="player in item.people.players" class="my-0 py-0">
                  <span v-if="player.isHost">[HOST] </span>{{ player.name }}
                </p>
              </v-tooltip>
            </template>
            <template #item.status="{ item }">
              {{ getGameStatus(item.status) }}
            </template>
            <template #item.options.gameType="{ item }">
              {{ getGameType(item.options.gameType) }}
            </template>
            <template #item.actions="{ item }">
              <NuxtLink
                v-if="item.validToJoin"
                :to="{ name: 'game-id', params: { id: item.id } }"
                no-prefetch
              >
                <v-btn class="primary">Join</v-btn>
              </NuxtLink>
              <v-btn v-if="!item.validToJoin" class="primary" disabled
                >Join</v-btn
              >
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script lang="ts">
import Vue from 'vue'
// eslint-disable-next-line import/named
import { NuxtSocket } from 'nuxt-socket-io'
import { GameInterface } from '../../../interfaces/GameInterface'
import { GameTypes, GameTypesFriendly } from '../../../constants/GameTypes'
import {
  GameStatus,
  GameStatusFriendly,
  GameStatusSelect,
  GameStatusTranslate,
} from '../../../constants/GameStatus'

export default Vue.extend({
  data() {
    return {
      gameSocket: null as NuxtSocket | null,
      search: '',
      loading: true,
      games: [] as GameInterface[],
      items: GameStatusSelect.items,
      value: GameStatusSelect.value,
      selectedStatuses: [],
      translatedStatuses: [] as GameStatus[],
      headers: [
        {
          text: '',
          align: 'start',
          sortable: false,
          value: 'locked',
        },
        {
          text: 'Game Name',
          align: 'start',
          value: 'name',
        },
        {
          text: 'Host',
          align: 'center',
          value: 'people.host.name',
        },
        {
          text: 'Players',
          align: 'center',
          value: 'people.players.length',
        },
        {
          text: 'Status',
          align: 'center',
          value: 'status',
        },
        {
          text: 'Game Type',
          align: 'center',
          value: 'options.gameType',
        },
        {
          text: '',
          align: 'end',
          sortable: false,
          value: 'actions',
        },
      ],
    }
  },
  created() {
    this.gameSocket = this.$nuxtSocket({
      name: 'main',
      channel: '/game',
    })

    this.gameSocket?.on('connect', () => {
      console.log('Game List socket connected!')
      this.getGames()
    })
  },
  methods: {
    getGames() {
      this.gameSocket?.emit(
        'findAllGame',
        this.translatedStatuses,
        (res: GameInterface[]) => {
          this.games = res
          this.loading = false
        }
      )
    },
    getGamesFromStatus(status: string[]) {
      const translatedStatuses = []
      for (const key in status) {
        translatedStatuses.push(GameStatusTranslate[status[key]])
      }
      this.translatedStatuses = translatedStatuses
      this.getGames()
    },
    getGameStatus(status: GameStatus) {
      return GameStatusFriendly[status]
    },
    getGameType(type: GameTypes) {
      return GameTypesFriendly[type]
    },
  },
})
</script>
