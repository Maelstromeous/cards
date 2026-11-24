<script setup lang="ts">
useHead({ title: 'About' })
</script>

<template>
  <UContainer class="py-10">
    <section class="mx-auto max-w-2xl space-y-4 text-center">
      <h1 class="text-4xl font-bold sm:text-5xl">Humanity Deck</h1>
      <p class="text-muted">
        Humanity Deck was born out of the frustration with other Cards Against
        Humanity websites which are super clunky and frustrating to play with,
        often riddled with full servers or laggy gameplay. The whole point of
        this site is to provide a slick CAH gaming experience, using the most
        modern technologies available today.
      </p>
      <p class="text-muted">
        This website is open source, you can help build it! Check out the
        <ULink to="https://github.com/Maelstromeous/cards" target="_blank">
          GitHub Repository</ULink
        >!
      </p>
      <UButton to="/">K</UButton>
    </section>
  </UContainer>
</template>
