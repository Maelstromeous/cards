import { Test, TestingModule } from '@nestjs/testing';
import { CardService } from './card.service.js';
import { CardType } from '@humanity-deck/shared/constants/CardTypes';

describe('CardService', () => {
  let service: CardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardService],
    }).compile();

    service = module.get<CardService>(CardService);
  });

  describe('findOne', () => {
    it('returns the card with the given id', () => {
      const card = service.findOne('card2');

      expect(card).toMatchObject({ id: 'card2', type: CardType.BLACK_CARD });
    });

    it('returns undefined for an unknown id', () => {
      expect(service.findOne('no-such-card')).toBeUndefined();
    });
  });

  describe('findWhiteCardsForPlayerInGame', () => {
    it("returns the player's hand of white cards", () => {
      const hand = service.findWhiteCardsForPlayerInGame('player', 'game');

      expect(hand.length).toBeGreaterThan(0);
      for (const card of hand) {
        expect(card.type).toBe(CardType.WHITE_CARD);
        expect(card.id).toEqual(expect.any(String));
        expect(card.text).toEqual(expect.any(String));
      }
    });
  });
});
