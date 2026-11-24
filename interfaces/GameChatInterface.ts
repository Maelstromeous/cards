import {GameChatType} from "../constants/GameChatType.js";
import {PersonInterface} from "./PersonInterface.js";

export interface GameChatInterface {
    id: string
    gameId: string
    type: GameChatType
    personId?: PersonInterface['id']
    timestamp: string
    content: string
}
