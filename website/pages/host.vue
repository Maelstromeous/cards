<template>
  <section>
    <v-container>
      <v-row>
        <v-col cols="12" class="text-center">
          <h1 v-show="!name">Host Game</h1>
          <h1 v-show="name">Create game "{{ name }}"</h1>
          <v-btn
            v-if="isSettingUp"
            color="primary"
            :disabled="isInvalid || isStarted"
            class="mt-2"
            @click="startGame()"
            >Start Game</v-btn
          >
          <v-btn v-if="isStarted" color="primary" class="mt-2" disabled
            ><v-progress-circular
              indeterminate
              color="primary"
              class="mr-2"
            ></v-progress-circular>
            Starting...</v-btn
          >
          <div></div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="6">
          <v-card class="mx-auto" outlined :disabled="isStarted">
            <v-card-title>Game Options</v-card-title>
            <v-card-text>
              <v-text-field
                v-model="name"
                :rules="[rules.required, rules.minName, rules.maxName]"
                :counter="30"
                label="Game name"
                required
                :disabled="isStarted"
              ></v-text-field>
              <v-text-field
                v-model="password"
                class="mb-2"
                :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
                :type="showPass ? 'text' : 'password'"
                name="input-10-1"
                label="Password"
                hint="Enter password to make your game private"
                @click:append="showPass = !showPass"
              ></v-text-field>
              <v-slider
                v-model="maxPlayers"
                class="align-center"
                label="Players"
                thumb-label="always"
                :thumb-size="24"
                ticks="always"
                tick-size="4"
                :min="3"
                :max="10"
              >
              </v-slider>
              <v-slider
                v-model="scoreToWin"
                class="align-center"
                label="Score to win"
                thumb-label="always"
                :thumb-size="24"
                :min="5"
                :max="25"
              >
              </v-slider>
              <v-slider
                v-model="roundTimer"
                class="align-center"
                label="Round Timer"
                thumb-label="always"
                :thumb-size="24"
                :min="15"
                :max="120"
              >
              </v-slider>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="6">
          <v-card outlined :disabled="isStarted">
            <v-card-title>Game Type</v-card-title>
            <v-card-text
              ><v-radio-group v-model="gameType">
                <v-radio label="Card Tsar" :value="gameTypes.tsar"></v-radio>
                <v-radio
                  label="Popular Vote (coming soon!)"
                  :value="gameTypes.vote"
                  disabled
                ></v-radio>
              </v-radio-group>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12">
          <v-card outlined :disabled="isStarted">
            <v-card-title>Card Packs</v-card-title>
            <v-card-text style="overflow: hidden">
              <v-checkbox
                v-model="selectedPacks"
                :value="0"
                hide-details
                label="Base Pack (always included)"
                disabled
                class="mr-6 float-left"
              ></v-checkbox>
              <v-checkbox
                v-for="pack in availablePacks"
                :key="pack.id"
                v-model="selectedPacks"
                :label="pack.name"
                :value="pack.id"
                hide-details
                class="mr-6 float-left"
              ></v-checkbox>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>
<script lang="ts">
import Vue from 'vue'
import {
  uniqueNamesGenerator,
  adjectives,
  colors,
  animals,
} from 'unique-names-generator'
import { GameTypes } from '../../constants/GameTypes'
import { PackInterface } from '../../interfaces/PackInterface'
import { GameStatus } from '../../constants/GameStatus'
export default Vue.extend({
  data() {
    return {
      generatedId: '',
      name: '',
      password: '',
      maxPlayers: 3,
      scoreToWin: 5,
      roundTimer: 15,
      status: GameStatus.SETTING_UP,
      gameType: GameTypes.CARD_TSAR,
      gameTypes: {
        tsar: GameTypes.CARD_TSAR,
        vote: GameTypes.POPULAR_VOTE,
      },
      players: [],
      availablePacks: [
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
      ],
      selectedPacks: [0],
      groupedPacks: [] as PackInterface[][],
      rules: {
        required: (v: string) => !!v || 'Required.',
        minName: (v: string) => v.length >= 4 || 'Min 4 characters',
        maxName: (v: string) => v.length < 30 || 'Max 30 characters',
        emailMatch: () => `The email and password you entered don't match`,
      },

      showPass: false,
    }
  },
  computed: {
    isInvalid(): boolean {
      return this.name === '' || this.name.length < 4
    },
    isSettingUp(): boolean {
      return this.status === GameStatus.SETTING_UP
    },
    isStarted(): boolean {
      return this.status === GameStatus.STARTING
    },
  },
  mounted() {
    console.log('Get available packs here')
    this.generatedId = this.generateGameName()
    this.chunk(this.availablePacks, 4)
  },
  methods: {
    generateGameName() {
      return uniqueNamesGenerator({
        dictionaries: [adjectives, colors, animals],
        separator: '-',
        length: 3,
      })
    },
    async startGame() {
      this.status = GameStatus.STARTING
      // eslint-disable-next-line promise/param-names
      await new Promise((r) => setTimeout(r, 2000))
      window.$nuxt.$router.push(`/game/${this.generatedId}`)
    },
    chunk(arr: PackInterface[], size: number) {
      const newArr = []
      for (let i = 0; i < arr.length; i += size) {
        newArr.push(arr.slice(i, i + size))
      }
      this.groupedPacks = newArr
      console.log('grouped packs', this.groupedPacks)
    },
  },
})
</script>
