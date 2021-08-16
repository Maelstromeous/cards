<template>
  <v-row>
    <v-col cols="12">
      Game ID: {{ this.id }}
      <GameGame></GameGame>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'Game',
  async asyncData({ params }) {
    const id = params.id
    return { id }
  }
};
</script>
