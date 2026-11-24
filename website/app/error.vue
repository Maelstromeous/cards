<script setup lang="ts">
import type { NuxtError } from '#app'

const props = defineProps<{ error: NuxtError }>()

const title = computed(() =>
  props.error.statusCode === 404 ? '404 Not Found' : 'An error occurred',
)

useHead({ title })
</script>

<template>
  <UApp>
    <UError :error="{ ...error, statusMessage: title }" />
  </UApp>
</template>
