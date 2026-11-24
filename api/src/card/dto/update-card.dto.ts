import { PartialType } from '@nestjs/mapped-types';
import { CreateCardDto } from './create-card.dto.js';

export class UpdateCardDto extends PartialType(CreateCardDto) {}
