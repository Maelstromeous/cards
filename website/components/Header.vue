<template>
  <v-app-bar flat>
    <v-app-bar-title>
      <nuxt-link v-slot="{ navigate }" to="/" custom>
        <span role="link" @click="navigate" @keypress.enter="navigate"
          >Humanity Deck</span
        >
      </nuxt-link>
    </v-app-bar-title>
    <GamesCounter></GamesCounter>
    <v-spacer></v-spacer>
    <Username></Username>
    <DarkSwitch></DarkSwitch>
  </v-app-bar>
</template>
