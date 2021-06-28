<template>
  <div>
    <v-card elevation="5" height="250" width="200" class="ma-2" :color="cardColor">
      <v-card-title>
        <p v-bind:style="{color: textColor}" v-html="render"></p>
      </v-card-title>
      <v-card-actions v-if="type === 'white'">
        <v-btn elevation="2" color="primary">Pick</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return []
  },
  computed: {
    render() {
      return this.cardText.replace('<blank>', '<span class="text-decoration-underline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>')
    },
    cardColor() {
      return this.type === 'black' ? 'grey darken-4' : 'grey lighten-3'
    },
    textColor() {
      return this.type === 'black' ? 'white' : 'black'
    }
  },
  props: ['cardText', 'type'],
}
</script>
