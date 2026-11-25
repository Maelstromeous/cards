import { Test, TestingModule } from '@nestjs/testing';
import { CardController } from './card.controller.js';
import { CardService } from './card.service.js';

describe('CardController', () => {
  let controller: CardController;
  let service: CardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardController],
      providers: [CardService],
    }).compile();

    controller = module.get<CardController>(CardController);
    service = module.get<CardService>(CardService);
    vi.spyOn(console, 'log').mockImplementation(() => undefined);
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('looks a card up by id', () => {
    const findOne = vi.spyOn(service, 'findOne');

    const card = controller.findOne('card2');

    expect(findOne).toHaveBeenCalledWith('card2');
    expect(card).toBe(service.findOne('card2'));
  });

  it("returns the player's hand for a game", () => {
    const findHand = vi.spyOn(service, 'findWhiteCardsForPlayerInGame');

    const hand = controller.findWhiteCardsForPlayerInGame('player-1', 'game-1');

    expect(findHand).toHaveBeenCalledWith('player-1', 'game-1');
    expect(hand).toEqual(
      service.findWhiteCardsForPlayerInGame('player-1', 'game-1'),
    );
  });
});
