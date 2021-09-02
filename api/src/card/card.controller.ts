import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CardService } from './card.service';
import { CreateCardDto } from './dto/create-card.dto';
import { UpdateCardDto } from './dto/update-card.dto';

@Controller('card')
export class CardController {
  constructor(private readonly cardService: CardService) {}

  @Post()
  create(@Body() createCardDto: CreateCardDto) {
    return this.cardService.create(createCardDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    console.log('findOne - Card', id);
    return this.cardService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCardDto: UpdateCardDto) {
    return this.cardService.update(id, updateCardDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cardService.remove(id);
  }

  @Get('player/:player/game/:game')
  findWhiteCardsForPlayerInGame(
    @Param('player') playerId: string,
    @Param('game') gameId: string,
  ) {
    console.log(`finding white cards for player ${playerId} in game ${gameId}`);
    return this.cardService.findWhiteCardsForPlayerInGame(playerId, gameId);
  }
}
