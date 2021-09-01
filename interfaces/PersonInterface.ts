import {CardInterface} from "./CardInterface";

export interface PersonInterface {
    id: string
    name: string
    score: number
    ready: boolean
    chosenCard: CardInterface['id']
}
