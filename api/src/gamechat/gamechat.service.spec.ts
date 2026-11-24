import { Test, TestingModule } from '@nestjs/testing';
import { GamechatService } from './gamechat.service.js';
import { GameChatType } from '../../../constants/GameChatType.js';

describe('GamechatService', () => {
  let service: GamechatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamechatService],
    }).compile();

    service = module.get<GamechatService>(GamechatService);
  });

  describe('findAllByGame', () => {
    it('returns the chat log in time order', () => {
      const log = service.findAllByGame('foobar');
      const times = log.map((line) => Number(line.timestamp));

      expect(log.length).toBeGreaterThan(0);
      expect(times).toEqual([...times].sort((a, b) => a - b));
    });

    it('includes system, game, and player lines', () => {
      const types = new Set(
        service.findAllByGame('foobar').map((line) => line.type),
      );

      expect(types).toEqual(
        new Set([GameChatType.SYSTEM, GameChatType.GAME, GameChatType.PLAYER]),
      );
    });

    it('names a person on every player line', () => {
      const playerLines = service
        .findAllByGame('foobar')
        .filter((line) => line.type === GameChatType.PLAYER);

      for (const line of playerLines) {
        expect(line.personId).toEqual(expect.any(String));
      }
    });
  });
});
