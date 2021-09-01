<template>
  <div>
    <v-btn outlined @click="toggleTheme()"><font-awesome-icon icon="adjust"></font-awesome-icon></v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDark: false
    }
  },
  methods: {
    toggleTheme() {
      this.$vuetify.theme.dark =! this.$vuetify.theme.dark;
      localStorage.setItem("useDarkTheme", this.$vuetify.theme.dark.toString())
      this.isDark = !this.isDark
    },
    getIsDark() {
      return localStorage.getItem("useDarkTheme");
    }
  },

  mounted() {
    // If not set or indeed set to white

    const isDarkAlready = this.getIsDark();

    if (isDarkAlready === 'true') {
      this.$vuetify.theme.dark = true;
      this.isDark = true
    }
  }
}
</script>
