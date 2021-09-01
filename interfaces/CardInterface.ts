import { CardType } from '../constants/CardTypes'

export interface CardInterface {
  id: string
  text: string
  type: CardType
  pack: number
}
