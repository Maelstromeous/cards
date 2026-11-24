<script setup lang="ts">
const username = useUsername()
const draft = ref('')
const open = ref(false)

const error = computed(() => {
  if (!draft.value) return 'Required.'
  if (draft.value.length < 2) return 'Min 2 characters'
  if (draft.value.length >= 40) return 'Max 40 characters'
  return undefined
})

watch(open, (isOpen) => {
  if (isOpen) draft.value = username.value
})

function save() {
  if (error.value) return
  username.value = draft.value
  open.value = false
}
</script>

<template>
  <UModal v-model:open="open" title="Who are you, exactly?">
    <UButton icon="i-lucide-user" variant="subtle">
      <ClientOnly fallback="Who are you?">
        {{ username || 'Who are you?' }}
      </ClientOnly>
    </UButton>

    <template #body>
      <form @submit.prevent="save">
        <UFormField
          label="Your name"
          :error="error"
          :help="`${draft.length}/40`"
        >
          <UInput v-model="draft" autofocus class="w-full" :maxlength="40" />
        </UFormField>
      </form>
    </template>

    <template #footer>
      <UButton :disabled="!!error" @click="save">Bloody popups</UButton>
    </template>
  </UModal>
</template>
