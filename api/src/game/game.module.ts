import { Module } from '@nestjs/common';
import { GameService } from './game.service.js';
import { GameGateway } from './game.gateway.js';

@Module({
  providers: [GameGateway, GameService],
})
export class GameModule {}
