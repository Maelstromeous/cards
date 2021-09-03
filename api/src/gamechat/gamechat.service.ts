import { Injectable } from '@nestjs/common';
import { CreateGamechatDto } from './dto/create-gamechat.dto';
import { GameChatInterface } from '../../../interfaces/GameChatInterface';
import { GameChatType } from '../../../constants/GameChatType';

@Injectable()
export class GamechatService {
  create(createGamechatDto: CreateGamechatDto) {
    return 'This action adds a new gamechat';
  }

  findAllByGame(gameId: string): GameChatInterface[] {
    return this.exampleGameChat;
  }

  public exampleGameChat = [
    {
      id: '12345',
      gameId: 'foobar',
      type: GameChatType.SYSTEM,
      timestamp: '1630693840',
      content: 'Game "Pigs DONT fly" is ready to play. Awaiting players.',
    },
    {
      id: '12345',
      gameId: 'foobar',
      type: GameChatType.GAME,
      timestamp: '1630693843',
      personId: '7f660100-9b29-4d43-b2dc-85fa606c7123',
      content: 'Has joined the game!',
    },
    {
      id: '12345',
      gameId: 'foobar',
      type: GameChatType.PLAYER,
      timestamp: '1630693847',
      content: 'Hi :3',
      personId: '7f660100-9b29-4d43-b2dc-85fa606c7123',
    },
    {
      id: '12345',
      gameId: 'foobar',
      type: GameChatType.GAME,
      timestamp: '1630693850',
      personId: 'dc0a7afd-62af-4706-87da-5082565a9310',
      content: 'Has joined the game!',
    },
    {
      id: '12345',
      gameId: 'foobar',
      type: GameChatType.GAME,
      timestamp: '1630693852',
      personId: 'segegee-62af-4706-87da-5082565a9310',
      content: 'Has joined the game!',
    },
    {
      id: '12345',
      gameId: 'foobar',
      type: GameChatType.GAME,
      timestamp: '1630693855',
      content: 'LET THE GAMES BEGIN!',
    },
  ];
}
