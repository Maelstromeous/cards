import { Test, TestingModule } from '@nestjs/testing';
import { GamechatGateway } from './gamechat.gateway';
import { GamechatService } from './gamechat.service';

describe('GamechatGateway', () => {
  let gateway: GamechatGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamechatGateway, GamechatService],
    }).compile();

    gateway = module.get<GamechatGateway>(GamechatGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
