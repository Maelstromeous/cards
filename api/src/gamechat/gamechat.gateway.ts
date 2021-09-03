import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { GamechatService } from './gamechat.service';
import { CreateGamechatDto } from './dto/create-gamechat.dto';

@WebSocketGateway({ cors: true, namespace: 'gamechat' })
export class GamechatGateway {
  constructor(private readonly gamechatService: GamechatService) {}

  @SubscribeMessage('createGamechat')
  create(@MessageBody() createGamechatDto: CreateGamechatDto) {
    return this.gamechatService.create(createGamechatDto);
  }

  @SubscribeMessage('findAllGamechat')
  findAll(@MessageBody() gameId: string) {
    console.log('findAllGameChat', gameId);
    return this.gamechatService.findAllByGame(gameId);
  }
}
