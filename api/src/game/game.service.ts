import { Injectable } from '@nestjs/common';
import { CreateGameDto } from './dto/create-game.dto';
import { UpdateGameDto } from './dto/update-game.dto';

@Injectable()
export class GameService {
  create(createGameDto: CreateGameDto) {
    return 'This action adds a new game';
  }

  findAll() {
    return [
      {
        id: 'swimming-pelicans',
        name: 'Mael\'s Game',
        status: 'lobby',
        locked: true,
        validToJoin: true,
        people: {
          host: {
            name: "Maelstromeous"
          },
          players: [
            {name: "SomeAwesomeDude"},
            {name: "SomeAnnoyingDude"},
            {name: "A lady in red"},
          ]
        },
        options: {
          pointsToWin: 4,
          maxPlayers: 10,
        },
        winConditions: {
          type: 'tsar',
        }
      },
      {
        id: 'shark-tale',
        name: 'A medium game',
        status: 'lobby',
        locked: true,
        validToJoin: true,
        people: {
          host: {
            name: "Warcore"
          },
          players: [
            {name: "SomeAwesomeDude"},
            {name: "SomeAnnoyingDude"},
            {name: "A lady in red"},
            {name: "A dude in blue"},
            {name: "A gentlemen in blue"},
          ]
        },
        options: {
          pointsToWin: 5,
          maxPlayers: 7,
        },
        winConditions: {
          type: 'tsar',
        }
      },
      {
        id: 'swimming-fish',
        name: 'A full game',
        status: 'lobby',
        locked: true,
        validToJoin: false,
        people: {
          host: {
            name: "Fryla"
          },
          players: [
            {name: "SomeAwesomeDude"},
            {name: "SomeAnnoyingDude"},
            {name: "A lady in red"},
            {name: "A guy in blue"}
          ]
        },
        options: {
          pointsToWin: 5,
          maxPlayers: 5,
        },
        winConditions: {
          type: 'tsar',
        }
      },
      {
        id: 'swimming-bears',
        name: 'A open game',
        status: 'playing',
        locked: false,
        validToJoin: true,
        people: {
          host: {
            name: "Biohunter"
          },
          players: [
            {name: "SomeAwesomeDude"},
            {name: "SomeAnnoyingDude"},
            {name: "A lady in red"},
          ]
        },
        options: {
          pointsToWin: 5,
          maxPlayers: 5,
        },
        winConditions: {
          type: 'tsar',
        }
      }
    ]
  }

  findOne(id: number) {
    return `This action returns a #${id} game`;
  }

  update(id: number, updateGameDto: UpdateGameDto) {
    return `This action updates a #${id} game`;
  }

  remove(id: number) {
    return `This action removes a #${id} game`;
  }
}
