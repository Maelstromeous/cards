<template>
  <section>
    <v-container>
      <v-row justify="center" align="center">
        <v-col cols="12">
          <v-card-title class="text-h2 justify-center">
            A card game for horrible people
          </v-card-title>
          <v-card-text class="pb-0">
            <p class="text-center mb-2">
              Welcome to Humanity Deck! This website enables you to play the
              Cards Against Humanity game online and enjoy it with friends. This
              may or may not say this is a clone of the game. Whatever you wanna
              believe, we won't judge. That's like, your opinion man.
            </p>
          </v-card-text>
          <v-card-actions class="justify-center">
            <v-btn color="primary" nuxt to="/host">Host a game!</v-btn>
            <v-btn color="secondary" nuxt to="/about">wtf is this?!</v-btn>
          </v-card-actions>
        </v-col>
      </v-row>
      <v-row class="ma-0">
        <v-col cols="12">
          <v-divider></v-divider>
        </v-col>
      </v-row>
      <HomepageGamesList></HomepageGamesList>
    </v-container>
  </section>
</template>
