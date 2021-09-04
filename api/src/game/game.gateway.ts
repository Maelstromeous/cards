import {
  WebSocketGateway,
  SubscribeMessage,
  MessageBody,
} from '@nestjs/websockets';
import { GameService } from './game.service';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';
import { GameInterface } from '../../../interfaces/GameInterface';
import { GameTypes } from '../../../constants/GameTypes';

@WebSocketGateway({
  namespace: 'game',
  cors: true,
})
export class GameGateway {
  constructor(private readonly gameService: GameService) {}

  @SubscribeMessage('createGame')
  create(@MessageBody() createGameDto: CreateGameDto) {
    return this.gameService.create(createGameDto);
  }

  @SubscribeMessage('findAllGame')
  findAll(@MessageBody() gameTypes?: GameTypes[]): GameInterface[] {
    console.log('findAllGame');
    return this.gameService.findAll(gameTypes);
  }

  @SubscribeMessage('findOneGame')
  findOne(@MessageBody() id: string): GameInterface {
    console.log('findOneGame');
    return this.gameService.findOne(id);
  }

  @SubscribeMessage('updateGame')
  update(@MessageBody() updateGameDto: UpdateGameDto) {
    return this.gameService.update(updateGameDto.id, updateGameDto);
  }

  @SubscribeMessage('removeGame')
  remove(@MessageBody() id: number) {
    return this.gameService.remove(id);
  }
}
