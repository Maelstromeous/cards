<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-row justify="center">
        <h1>Open Games</h1>
      </v-row>
      <v-row>
        <v-col cols="12" md="3"> Filters </v-col>
        <v-col cols="12" md="9">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
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
                <p class="my-0 py-0">{{ item.people.host.name }} (host)</p>
                <p v-for="player in item.people.players" class="my-0 py-0">
                  {{ player.name }}
                </p>
              </v-tooltip>
            </template>
            <template #item.status="{ item }">
              {{ item.status | capitalize }}
            </template>
            <template #item.winConditions.type="{ item }">
              {{ item.winConditions.type | capitalize }}
            </template>
            <template #item.actions="{ item }">
              <NuxtLink
                v-if="item.validToJoin"
                :to="{ name: 'game-id', params: { id: item.id } }"
                no-prefetch
              >
                <v-btn class="primary">Join!</v-btn>
              </NuxtLink>
              <v-btn v-if="!item.validToJoin" class="primary" disabled
                >Join!</v-btn
              >
            </template>
          </v-data-table>
        </v-col>
      </v-row>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      gameSocket: null,
      search: '',
      loading: false,
      games: [],
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
          value: 'winConditions.type',
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
    this.socket = this.$nuxtSocket({
      name: 'main',
      channel: '/game',
    })

    this.gameSocket.on('connect', () => {
      console.log('Game List socket connected!')
      this.getGames()
    })
  },
  methods: {
    getGames() {
      this.gameSocket.emit('findAllGame', (res) => {
        console.log('got list of games', res)
        this.games = res
      })
    },
  },
}
</script>
