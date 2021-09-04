<template>
  <v-card outlined>
    <v-card-title>Chat</v-card-title>
    <v-card-text>
      <div v-if="chatLog.length === 0">
        <v-skeleton-loader
          v-for="i in 6"
          :key="i"
          type="list-item-three-line"
        ></v-skeleton-loader>
      </div>
      <div v-if="chatLog.length > 0">
        <p
          v-for="line in chatLog"
          :key="line.id"
          class="mb-1"
          :class="chatLineClass(line)"
          v-html="chatLineFormatter(line)"
        ></p>
      </div>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>

    <v-card-actions class="mb-1">
      <v-text-field
        v-model="messageToSend"
        class="mx-2"
        filled
        dense
        hide-details
        placeholder="Enter your message"
        append-icon="mdi-send"
      ></v-text-field>
    </v-card-actions>
  </v-card>
</template>
<script lang="ts">
import Vue from 'vue'
// eslint-disable-next-line import/named
import { NuxtSocket } from 'nuxt-socket-io'
import { GameChatInterface } from '../../../interfaces/GameChatInterface'
import { PersonInterface } from '../../../interfaces/PersonInterface'
import { GameChatType } from '../../../constants/GameChatType'
import { GamePeopleInterface } from '../../../interfaces/GameInterface'

const { format } = require('date-fns-tz')

export default Vue.extend({
  props: {
    gameId: {
      type: String,
      required: true,
    },
    people: {
      type: Object as () => GamePeopleInterface,
      required: true,
    },
  },
  data() {
    return {
      chatLog: [] as GameChatInterface[],
      chatSocket: null as NuxtSocket | null,
      messageToSend: '',
      chatTypes: {
        system: GameChatType.SYSTEM,
        game: GameChatType.GAME,
        player: GameChatType.PLAYER,
      },
    }
  },
  mounted() {
    this.chatSocket = this.$nuxtSocket({
      name: 'main',
      channel: '/gamechat',
    })

    this.chatSocket?.on('connect', () => {
      console.log('GameChat socket connected!')
      this.getGameChat()
    })
  },
  methods: {
    getGameChat() {
      console.log('Getting game chat')
      this.chatSocket?.emit(
        'findAllGamechat',
        this.gameId,
        (res: GameChatInterface[]) => {
          this.chatLog = res
          console.log(this.chatLog)
        }
      )
    },
    sendMessage() {
      console.log('Sending message to game', this.messageToSend)
      // Socket call to create message which then gets distributed to other players
    },
    resolvePerson(personId: string): PersonInterface {
      return this.people.players.filter(
        (player: PersonInterface) => player.id === personId
      )[0]
    },
    chatLineClass(chat: GameChatInterface): any {
      return { 'font-italic': chat.type !== GameChatType.PLAYER }
    },
    chatLineFormatter(chat: GameChatInterface): string {
      console.log(chat)
      const message = this.timeFormatter(chat.timestamp)

      if (chat.type === GameChatType.SYSTEM) {
        return `${message} [SYSTEM] ${chat.content}`
      }

      if (chat.type === GameChatType.GAME && !chat.personId) {
        return `${message} ${chat.content}`
      }

      if (chat.personId) {
        const player = this.resolvePerson(chat.personId)

        if (!player) {
          console.log("Player couldn't be resolved!")
          return ''
        }

        if (chat.type === GameChatType.GAME && chat.personId) {
          return `${message} ${player.name}
        } has joined the game!`
        }

        if (chat.type === GameChatType.PLAYER && chat.personId) {
          const tag = player.isHost
            ? '<span class="red--text">[HOST]</span> '
            : ''
          return `${message} ${tag}<b>${player.name}:</b> ${chat.content}`
        }
      }

      return ''
    },
    timeFormatter(time: string) {
      return format(parseInt(time) * 1000, 'H:m:ss')
    },
  },
})
</script>
