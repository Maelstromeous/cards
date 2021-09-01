<template>
  <div>
    <v-card
      elevation="2"
      width="200"
      class="ma-2"
      :color="cardColor"
      style="word-break: break-word"
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

<script>
export default {
  props: ['cardText', 'type'],
  data() {
    return {}
  },
  computed: {
    render() {
      return this.cardText.replace(
        '<blank>',
        '<span class="text-decoration-underline">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span>'
      )
    },
    cardColor() {
      return this.type === 'black' ? 'grey darken-4' : 'grey lighten-4'
    },
    textColor() {
      return this.type === 'black' ? 'white' : 'black'
    },
  },
}
</script>
