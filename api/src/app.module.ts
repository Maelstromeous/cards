import { Module } from '@nestjs/common';
import { AppController } from './app.controller.js';
import { AppService } from './app.service.js';
import { ConfigModule } from '@nestjs/config';
import { CardModule } from './card/card.module.js';
import { GameModule } from './game/game.module.js';
import { GamechatModule } from './gamechat/gamechat.module.js';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    CardModule,
    GameModule,
    GamechatModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
