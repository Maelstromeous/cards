import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameStatus } from '../../../constants/GameStatus';
import { GameTypes } from '../../../constants/GameTypes';
import { GameInterface } from '../../../interfaces/GameInterface';

@Injectable()
export class GameService {
  create(createGameDto: CreateGameDto) {
    return 'This action adds a new game';
  }

  findAll(): GameInterface[] {
    return [];
  }

  findOne(id: string): GameInterface {
    console.log('findOne', id);
    return {
      id,
      name: 'Pigs DONTfly!',
      status: GameStatus.PLAYING,
      locked: false,
      validToJoin: true,
      roundCount: 2,
      people: {
        host: {
          id: '7f660100-9b29-4d43-b2dc-85fa606c7123',
          name: 'Maelstromeous',
          score: 1,
          ready: true,
          chosenCard: 'card30',
        },
        players: [
          {
            id: 'dc0a7afd-62af-4706-87da-5082565a9310',
            name: 'Some AwesomeDude',
            score: 0,
            ready: true,
            chosenCard: 'card40',
          },
          {
            id: 'segegee-62af-4706-87da-5082565a9310',
            name: 'Some AwesomeLady',
            score: 0,
            ready: false,
            chosenCard: null,
          },
        ],
        spectators: [],
      },
      options: {
        gameType: GameTypes.CARD_TSAR,
        scoreToWin: 5,
        maxPlayers: 6,
        maxSpectators: 0,
        packs: [123, 124, 125],
        chatEnabled: true,
        roundTimer: 30,
        idleTimer: 60,
      },
      typeSpecificData: {
        tsar: {
          currentTsar: '7f660100-9b29-4d43-b2dc-85fa606c7123',
          previousTsars: ['dc0a7afd-62af-4706-87da-5082565a9310'],
          nextTsar: 'segegee-62af-4706-87da-5082565a9310',
        },
      },
      cards: {
        black: 'card1',
        white: [
          {
            playerId: '7f660100-9b29-4d43-b2dc-85fa606c7123',
            cards: ['card30', 'card31', 'card32', 'card33'],
          },
          {
            playerId: 'dc0a7afd-62af-4706-87da-5082565a9310',
            cards: ['card40', 'card41', 'card42', 'card43'],
          },
          {
            playerId: 'segegee-62af-4706-87da-5082565a9310',
            cards: ['card50', 'card51', 'card52', 'card53'],
          },
        ],
      },
    };
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
