import {GameChatType} from "../constants/GameChatType";
import {PersonInterface} from "./PersonInterface";

export interface GameChatInterface {
    id: string
    gameId: string
    type: GameChatType
    personId?: PersonInterface['id']
    timestamp: string
    content: string
}
