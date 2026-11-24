import { Module } from '@nestjs/common';
import { CardService } from './card.service.js';
import { CardController } from './card.controller.js';

@Module({
  controllers: [CardController],
  providers: [CardService],
})
export class CardModule {}
