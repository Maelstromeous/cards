<script setup lang="ts">
const route = useRoute()
const id = computed(() => String(route.params.id))

useHead({ title: 'Game' })
</script>

<template>
  <UContainer class="py-10">
    <GameState :id="id" />
  </UContainer>
</template>
