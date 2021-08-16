<template>
  <v-app dark>
    <v-main>
      <Header></Header>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-footer app>
      <span>Cards Against Humanity &copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {}
  },
}
</script>
