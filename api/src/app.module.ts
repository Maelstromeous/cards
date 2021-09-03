import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { CardModule } from './card/card.module';
import { GameModule } from './game/game.module';
import { GamechatModule } from './gamechat/gamechat.module';

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
