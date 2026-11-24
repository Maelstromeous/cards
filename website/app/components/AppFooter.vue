<script setup lang="ts">
const year = new Date().getFullYear()
</script>

<template>
  <UFooter>
    <p class="text-center text-sm text-muted">
      "Cards Against Humanity" &copy; {{ year }} is the property of Cards
      Against Humanity LLC. Card content licensed under CC 2.0. &copy; Copyright
      {{ year }}
      <ULink to="https://mattcavanagh.me" target="_blank" class="text-primary"
        >Matt Cavanagh</ULink
      >
    </p>
  </UFooter>
</template>
