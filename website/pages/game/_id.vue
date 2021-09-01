<template>
  <section>
    <GameState v-if="id" :id="id"></GameState>
  </section>
</template>

<script>
export default {
  data() {
    return {
      id: '',
    }
  },
  fetch() {
    this.id = this.$route.params.id
  },
}
</script>
