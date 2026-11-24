import { Module } from '@nestjs/common';
import { GamechatService } from './gamechat.service.js';
import { GamechatGateway } from './gamechat.gateway.js';

@Module({
  providers: [GamechatGateway, GamechatService],
})
export class GamechatModule {}
