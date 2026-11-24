<script setup lang="ts">
useHead({ title: 'Home' })
</script>

<template>
  <UContainer class="py-10">
    <section class="mx-auto max-w-2xl text-center">
      <h1 class="text-4xl font-bold sm:text-5xl">
        A card game for horrible people
      </h1>
      <p class="mt-4 text-muted">
        Welcome to Humanity Deck! This website enables you to play the Cards
        Against Humanity game online and enjoy it with friends. This may or may
        not say this is a clone of the game. Whatever you wanna believe, we
        won't judge. That's like, your opinion man.
      </p>
      <div class="mt-6 flex justify-center gap-3">
        <UButton to="/host" size="lg">Host a game!</UButton>
        <UButton to="/about" size="lg" color="secondary" variant="soft">
          wtf is this?!
        </UButton>
      </div>
    </section>

    <USeparator class="my-10" />

    <HomepageGamesList />
  </UContainer>
</template>
