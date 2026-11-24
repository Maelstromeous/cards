import type { GameChatType } from "../constants/GameChatType.js";
import type { PersonInterface } from "./PersonInterface.js";

export interface GameChatInterface {
    id: string
    gameId: string
    type: GameChatType
    personId?: PersonInterface['id']
    timestamp: string
    content: string
}
