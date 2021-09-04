import {GameStatus} from "../constants/GameStatus";
import {PersonInterface} from "./PersonInterface";
import {GameTypes} from "../constants/GameTypes";
import {CardInterface} from "./CardInterface";

export interface GameInterface {
    id: string
    name: string
    status: GameStatus
    locked: boolean
    validToJoin: boolean
    roundCount: number
    people: GamePeopleInterface
    options: GameOptionsInterface
    typeSpecificData: GameTypeSpecificDataInterface
    cards: GameCardsInterface
}

export interface GamePeopleInterface {
    host: {
        id: PersonInterface['id'],
        name: PersonInterface['name']
    }
    players: PersonInterface[]
    spectators?: PersonInterface[]
}

export interface GameOptionsInterface {
    gameType: GameTypes
    scoreToWin: number
    maxPlayers: number
    maxSpectators: number
    packs: number[]
    chatEnabled: boolean
    roundTimer: number
    idleTimer: number
}

export interface GameTypeSpecificDataInterface {
    tsar: TsarGameDataInterface
}

export interface TsarGameDataInterface {
    currentTsar: PersonInterface['id']
    previousTsars: PersonInterface['id'][]
    nextTsar: PersonInterface['id']
}

interface GameCardsInterface {
    black: string,
    white: PlayerGameCardsInterface[]
}

interface PlayerGameCardsInterface {
    playerId: string
    cards: CardInterface['id'][]
}
