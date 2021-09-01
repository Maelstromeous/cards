<template>
  <v-row justify="center" align="center">
    <v-col cols="12">
      <v-row justify="center">
        <h1>Open Games</h1>
      </v-row>
      <v-row>
        <v-col cols="12" md="3">
          Filters
        </v-col>
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
            <template v-slot:item.locked="{ item }">
              <v-tooltip bottom v-if="item.locked">
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on"><font-awesome-icon icon="lock"></font-awesome-icon></span>
                </template>
                <span>Game is locked with a password</span>
              </v-tooltip>
              <v-tooltip bottom v-if="!item.locked">
                <template v-slot:activator="{ on, attrs }">
                  <span v-bind="attrs" v-on="on"><font-awesome-icon icon="lock-open"></font-awesome-icon></span>
                </template>
                <span>Game is open to anyone, host will be asked to accept you</span>
              </v-tooltip>
            </template>
            <template v-slot:item.people.players.length="{ item }">
              <v-tooltip bottom>
                <template v-slot:activator="{ on, attrs }">
                  <v-chip
                    class="ma-2"
                    v-bind:color="item.people.players.length + 1 === item.options.maxPlayers ? 'red': ''"
                    v-bind="attrs"
                    v-on="on"
                  >
                    {{ item.people.players.length + 1 }}/{{ item.options.maxPlayers }}
                  </v-chip>
                </template>
                <p class="my-0 py-0">{{item.people.host.name}} (host)</p>
                <p class="my-0 py-0" v-for="player in item.people.players">{{ player.name }}</p>
              </v-tooltip>
            </template>
            <template v-slot:item.status="{ item }">
              {{ item.status | capitalize }}
            </template>
            <template v-slot:item.winConditions.type="{ item }">
              {{ item.winConditions.type | capitalize }}
            </template>
            <template v-slot:item.actions="{ item }">
              <NuxtLink v-if="item.validToJoin" :to="{name: 'game-id', params: {id: item.id} }" no-prefetch>
                <v-btn class="primary">Join!</v-btn>
              </NuxtLink>
              <v-btn v-if="!item.validToJoin" class="primary" disabled>Join!</v-btn>
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
      search: '',
      loading: false,
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
      games: [
        {
          id: 'swimming-pelicans',
          name: 'Mael\'s Game',
          status: 'lobby',
          locked: true,
          validToJoin: true,
          people: {
            host: {
              name: "Maelstromeous"
            },
            players: [
              {name: "SomeAwesomeDude"},
              {name: "SomeAnnoyingDude"},
              {name: "A lady in red"},
            ]
          },
          options: {
            pointsToWin: 4,
            maxPlayers: 10,
          },
          winConditions: {
            type: 'tsar',
          }
        },
        {
          id: 'shark-tale',
          name: 'A medium game',
          status: 'lobby',
          locked: true,
          validToJoin: true,
          people: {
            host: {
              name: "Warcore"
            },
            players: [
              {name: "SomeAwesomeDude"},
              {name: "SomeAnnoyingDude"},
              {name: "A lady in red"},
              {name: "A dude in blue"},
              {name: "A gentlemen in blue"},
            ]
          },
          options: {
            pointsToWin: 5,
            maxPlayers: 7,
          },
          winConditions: {
            type: 'tsar',
          }
        },
        {
          id: 'swimming-fish',
          name: 'A full game',
          status: 'lobby',
          locked: true,
          validToJoin: false,
          people: {
            host: {
              name: "Fryla"
            },
            players: [
              {name: "SomeAwesomeDude"},
              {name: "SomeAnnoyingDude"},
              {name: "A lady in red"},
              {name: "A guy in blue"}
            ]
          },
          options: {
            pointsToWin: 5,
            maxPlayers: 5,
          },
          winConditions: {
            type: 'tsar',
          }
        },
        {
          id: 'swimming-bears',
          name: 'A open game',
          status: 'playing',
          locked: false,
          validToJoin: true,
          people: {
            host: {
              name: "Biohunter"
            },
            players: [
              {name: "SomeAwesomeDude"},
              {name: "SomeAnnoyingDude"},
              {name: "A lady in red"},
            ]
          },
          options: {
            pointsToWin: 5,
            maxPlayers: 5,
          },
          winConditions: {
            type: 'tsar',
          }
        }
      ]
    }
  }
}
</script>