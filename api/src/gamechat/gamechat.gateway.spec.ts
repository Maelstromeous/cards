import { Test, TestingModule } from '@nestjs/testing';
import { GamechatGateway } from './gamechat.gateway.js';
import { GamechatService } from './gamechat.service.js';

describe('GamechatGateway', () => {
  let gateway: GamechatGateway;
  let service: GamechatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamechatGateway, GamechatService],
    }).compile();

    gateway = module.get<GamechatGateway>(GamechatGateway);
    service = module.get<GamechatService>(GamechatService);
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('answers findAllGamechat with the chat for that game', () => {
    const findAllByGame = vi.spyOn(service, 'findAllByGame');

    const log = gateway.findAll('foobar');

    expect(findAllByGame).toHaveBeenCalledWith('foobar');
    expect(log).toEqual(service.findAllByGame('foobar'));
  });
});
