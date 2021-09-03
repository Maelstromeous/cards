import { Module } from '@nestjs/common';
import { GamechatService } from './gamechat.service';
import { GamechatGateway } from './gamechat.gateway';

@Module({
  providers: [GamechatGateway, GamechatService],
})
export class GamechatModule {}
