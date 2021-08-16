<template>
  <div>
    <v-row>
      <h1 class="text-center">Game #{{ id }}</h1>
    </v-row>
    <v-row>
      <template>
        <v-progress-linear value="15"></v-progress-linear>
        <div class="center">Time left: 00:15</div>
      </template>
    </v-row>
    <v-row>
      <Card :cardText="blackCards[selectedBlackCard]" type="black"></Card>
    </v-row>
    <v-row>
      <Card :cardText="whiteCards[selectedWhiteCards[0]]" type="white"></Card>
      <Card :cardText="whiteCards[selectedWhiteCards[1]]" type="white"></Card>
      <Card :cardText="whiteCards[selectedWhiteCards[2]]" type="white"></Card>
      <Card :cardText="whiteCards[selectedWhiteCards[3]]" type="white"></Card>
    </v-row>
  </div>
</template>

<script>
export default {
  params: [
    'id'
  ],
  data() {
    return {
      id: 12345,
      usedBlackCards: [],
      usedWhiteCards: [],
      selectedBlackCard: 1,
      selectedWhiteCards: [0,6,3,9],
      blackCards: [
        'How am I maintaining my relationship status?',
        '<blank>. That\'s why mums go to Iceland.',
        'Make a haiku.',
        'Hey guys, welcome to TGIF! Would you like to start the night off right with <blank>?',
        'I got 99 problems but <blank> ain\'t one.',
        '<blank>. It\'s a trap!'
      ],
      whiteCards: [
        'One titty hanging out.',
        'Justin Bieber.',
        'Oompa-Loompas.',
        'Inappropriate yodeling.',
        'Puberty.',
        'Ghosts.',
        'Amputees.',
        'Fucking my sister.',
        'Poverty.',
        'Kamikaze pilots.',
        'Committing suicide.',
        'German dungeon porn.',
        'Being on fire.',
        'Teenage pregnancy.',
        'Gandhi.',
        'Your weird brother.',
        'A Fleshlight.',
        'A pyramid of severed heads.',
        'An erection that lasts longer than four hours.',
        'Druids.',
        'The past.',
        'My genitals.',
        'An endless stream of diarrhoea.',
        'Kissing nan on the forehead and turning off her life support.',
        'Sexual tension.',
        'An AK-47 assault rifle.',
        'My good bra.',
        'Egging an MP.',
        'Madeleine McCann',
        'Being rich.',
        'Sweet sweet vengeance.',
        'Tories.',
        'Bisexuality.',
        '50,000 volts straight to the nipples.',
        'A balanced breakfast.',
        'Dead birds everywhere.',
        'The arrival of the pizza.',
        'Permanent Orgasm-Face Disorder.',
        'The cool, refreshing taste of Pepsi.',
        'Chemical weapons.',
        'A posh wank.',
        'Daddies Brown Sauce.',
        'Bananas.',
        'Passive-aggressive Post-it notes.',
        'A Chelsea smile.',
        'Knife crime.',
        'Peeing a little bit',
        'Wet dreams.',
        'The Jews.',
        'My cheating son-of-a-bitch husband.',
      ]
    }
  }
}
</script>
