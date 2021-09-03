import { Test, TestingModule } from '@nestjs/testing';
import { GamechatService } from './gamechat.service';

describe('GamechatService', () => {
  let service: GamechatService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GamechatService],
    }).compile();

    service = module.get<GamechatService>(GamechatService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
