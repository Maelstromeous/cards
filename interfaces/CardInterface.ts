import { CardType } from '../constants/CardTypes.js'

export interface CardInterface {
  id: string
  text: string
  type: CardType
  pack: number
}
