import { Test, TestingModule } from '@nestjs/testing';
import { GameGateway } from './game.gateway.js';
import { GameService } from './game.service.js';

describe('GameGateway', () => {
  let gateway: GameGateway;
  let service: GameService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GameGateway, GameService],
    }).compile();

    gateway = module.get<GameGateway>(GameGateway);
    service = module.get<GameService>(GameService);
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('passes the filter for findAllGame to the service', () => {
    const findAll = vi.spyOn(service, 'findAll');

    const games = gateway.findAll([]);

    expect(findAll).toHaveBeenCalledWith([]);
    expect(games).toHaveLength(2);
  });

  it('answers findOneGame with the game', () => {
    expect(gateway.findOne('foobar').id).toBe('foobar');
  });
});
