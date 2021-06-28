<template>
  <v-row justify="center" align="center">
    <v-col cols="12" sm="8" md="6">
      <v-card>
        <v-card-title class="headline">
          Humanity Deck
        </v-card-title>
        <v-card-text>
          <p>
            Welcome to Humanity Deck! This website enables you to play the Cards Against Humanity game online and enjoy it with friends. You could or could not say this is a clone of the game. Whatever you wanna believe man, we won't judge. That's like, your opinion.
          </p>
        </v-card-text>
        <v-card-actions>
          <v-btn color="primary" nuxt to="/game"> Host a game </v-btn>
          <v-spacer />
          <v-btn color="secondary" nuxt to="/join"> Join a game </v-btn>
        </v-card-actions>
      </v-card>
    </v-col>
  </v-row>
</template>
