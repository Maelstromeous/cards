import { Test, TestingModule } from '@nestjs/testing';
import { GameService } from './game.service.js';
import { GameStatus } from '../../../constants/GameStatus.js';

describe('GameService', () => {
  let service: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameService],
    }).compile();

    service = module.get<GameService>(GameService);
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('findAll', () => {
    it('returns every game when no filter is given', () => {
      const games = service.findAll([]);

      expect(games.map((game) => game.id)).toEqual(['foobar', 'foobar2']);
      expect(games[1].status).toBe(GameStatus.SETTING_UP);
    });

    it('treats a missing filter as no filter', () => {
      expect(service.findAll()).toHaveLength(2);
    });

    it('narrows the list when a filter is given', () => {
      const games = service.findAll([0]);

      expect(games.map((game) => game.id)).toEqual(['foobar']);
    });
  });

  describe('findOne', () => {
    it('returns a game with its players and cards', () => {
      const game = service.findOne('foobar');

      expect(game.id).toBe('foobar');
      expect(game.people.host.id).toEqual(expect.any(String));
      expect(game.people.players.length).toBeGreaterThan(0);
      expect(game.cards.black).toEqual(expect.any(String));
    });
  });
});
