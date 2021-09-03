<template>
  <div>
    <v-dialog v-model="dialog" width="500">
      <template #activator="{ on, attrs }">
        <v-chip
          color="indigo"
          text-color="white"
          class="mr-2"
          v-bind="attrs"
          v-on="on"
        >
          <v-avatar left>
            <font-awesome-icon icon="user"></font-awesome-icon>
          </v-avatar>
          <span v-show="!username">Who are you?</span>
          <span v-if="username">{{ username }}</span>
        </v-chip>
      </template>

      <v-card>
        <v-card-title> Who are you, exactly? </v-card-title>
        <v-card-text>
          <v-text-field
            v-model="username"
            :rules="[rules.required, rules.minName, rules.maxName]"
            :counter="40"
            required
            @change="updateUsername"
          ></v-text-field
        ></v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="dialog = false"> Bloody popups </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      dialog: false,
      username: '',
      rules: {
        required: (v: string) => !!v || 'Required.',
        minName: (v: string) => v.length >= 2 || 'Min 2 characters',
        maxName: (v: string) => v.length < 40 || 'Max 40 characters',
      },
    }
  },
  mounted() {
    const username = localStorage.getItem('username')
    if (username && username !== '') {
      this.username = username
    }
  },
  methods: {
    updateUsername(value: string) {
      localStorage.setItem('username', value)
    },
  },
})
</script>
