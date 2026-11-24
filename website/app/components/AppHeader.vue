<template>
  <UHeader title="Humanity Deck" to="/" :toggle="false">
    <GamesCounter class="hidden md:flex" />

    <template #right>
      <UsernameButton />
      <UColorModeButton />
    </template>
  </UHeader>
</template>
