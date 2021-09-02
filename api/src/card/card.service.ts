import { Injectable } from '@nestjs/common';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';
import { CardType } from '../../../constants/CardTypes';

@Injectable()
export class CardService {
  create(createCardDto: CreateCardDto) {
    return 'This action adds a new card';
  }

  findOne(id: string) {
    const index = this.cards
      .map((e) => {
        return e.id;
      })
      .indexOf(id);

    return this.cards[index];
  }

  update(id: string, updateCardDto: UpdateCardDto) {
    return `This action updates a #${id} card`;
  }

  remove(id: string) {
    return `This action removes a #${id} card`;
  }

  findWhiteCardsForPlayerInGame(playerId: string, gameId: string) {
    return [
      {
        id: 'card30',
        text: 'Kissing nan on the forehead and turning off her life support.',
        type: CardType.WHITE_CARD,
        pack: 123,
      },
      {
        id: 'card31',
        text: 'Sexual tension.',
        type: CardType.WHITE_CARD,
        pack: 123,
      },
      {
        id: 'card32',
        text: 'An AK-47 assault rifle.',
        type: CardType.WHITE_CARD,
        pack: 123,
      },
      {
        id: 'card33',
        text: 'My good bra.',
        type: CardType.WHITE_CARD,
        pack: 123,
      },
      {
        id: 'card34',
        text: 'Egging an MP.',
        type: CardType.WHITE_CARD,
        pack: 123,
      },
      {
        id: 'card35',
        text: 'Madeleine McCann',
        type: CardType.WHITE_CARD,
        pack: 123,
      },
    ];
  }

  // Temp AF
  public cards = [
    {
      id: 'card1',
      text: 'How am I maintaining my relationship status?',
      type: CardType.BLACK_CARD,
      pack: 123,
    },
    {
      id: 'card2',
      text: "<blank>. That's why mums go to Iceland.",
      type: CardType.BLACK_CARD,
      pack: 123,
    },
    {
      id: 'card3',
      text: 'Make a haiku.',
      type: CardType.BLACK_CARD,
      pack: 123,
    },
    {
      id: 'card4',
      text: 'Hey guys, welcome to TGIF! Would you like to start the night off right with <blank>?',
      type: CardType.BLACK_CARD,
      pack: 123,
    },
    {
      id: 'card5',
      text: "I got 99 problems but <blank> ain't one.",
      type: CardType.BLACK_CARD,
      pack: 123,
    },
    {
      id: 'card6',
      text: "<blank>. It's a trap!",
      type: CardType.BLACK_CARD,
      pack: 123,
    },
    // White
    {
      id: 'card7',
      text: 'One titty hanging out.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card8',
      text: 'Justin Bieber.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card9',
      text: 'Oompa-Loompas.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card10',
      text: 'Inappropriate yodeling.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    { id: 'card11', text: 'Puberty.', type: CardType.WHITE_CARD, pack: 123 },
    { id: 'card12', text: 'Ghosts.', type: CardType.WHITE_CARD, pack: 123 },
    { id: 'card13', text: 'Amputees.', type: CardType.WHITE_CARD, pack: 123 },
    {
      id: 'card14',
      text: 'Fucking my sister.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    { id: 'card15', text: 'Poverty.', type: CardType.WHITE_CARD, pack: 123 },
    {
      id: 'card16',
      text: 'Kamikaze pilots.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card17',
      text: 'Committing suicide.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card18',
      text: 'German dungeon porn.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card19',
      text: 'Being on fire.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card20',
      text: 'Teenage pregnancy.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    { id: 'card21', text: 'Gandhi.', type: CardType.WHITE_CARD, pack: 123 },
    {
      id: 'card22',
      text: 'Your weird brother.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card23',
      text: 'A Fleshlight.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card24',
      text: 'A pyramid of severed heads.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card25',
      text: 'An erection that lasts longer than four hours.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    { id: 'card26', text: 'Druids.', type: CardType.WHITE_CARD, pack: 123 },
    { id: 'card27', text: 'The past.', type: CardType.WHITE_CARD, pack: 123 },
    {
      id: 'card28',
      text: 'My genitals.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card29',
      text: 'An endless stream of diarrhoea.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card30',
      text: 'Kissing nan on the forehead and turning off her life support.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card31',
      text: 'Sexual tension.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card32',
      text: 'An AK-47 assault rifle.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card33',
      text: 'My good bra.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card34',
      text: 'Egging an MP.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card35',
      text: 'Madeleine McCann',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    { id: 'card36', text: 'Being rich.', type: CardType.WHITE_CARD, pack: 123 },
    {
      id: 'card37',
      text: 'Sweet sweet vengeance.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    { id: 'card38', text: 'Tories.', type: CardType.WHITE_CARD, pack: 123 },
    {
      id: 'card39',
      text: 'Bisexuality.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card40',
      text: '50,000 volts straight to the nipples.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card41',
      text: 'A balanced breakfast.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card42',
      text: 'Dead birds everywhere.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card43',
      text: 'The arrival of the pizza.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card44',
      text: 'Permanent Orgasm-Face Disorder.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card45',
      text: 'The cool, refreshing taste of Pepsi.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card46',
      text: 'Chemical weapons.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card47',
      text: 'A posh wank.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card48',
      text: 'Daddies Brown Sauce.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    { id: 'card49', text: 'Bananas.', type: CardType.WHITE_CARD, pack: 123 },
    {
      id: 'card50',
      text: 'Passive-aggressive Post-it notes.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card51',
      text: 'A Chelsea smile.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card52',
      text: 'Knife crime.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    {
      id: 'card53',
      text: 'Peeing a little bit',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
    { id: 'card54', text: 'Wet dreams.', type: CardType.WHITE_CARD, pack: 123 },
    { id: 'card55', text: 'The Jews.', type: CardType.WHITE_CARD, pack: 123 },
    {
      id: 'card56',
      text: 'My cheating son-of-a-bitch husband.',
      type: CardType.WHITE_CARD,
      pack: 123,
    },
  ];
}
