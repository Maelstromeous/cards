export enum GameStatus {
  SETTING_UP = 0,
  STARTING = 1,
  READY = 2,
  PLAYING = 3,
  FINISHED_NEW_ROUND = 4,
  ENDED = 5,
}

export const GameStatusFriendly = {
  [GameStatus.SETTING_UP]: 'Setting Up',
  [GameStatus.STARTING]: 'Starting',
  [GameStatus.READY]: 'Ready to play',
  [GameStatus.PLAYING]: 'Playing',
  [GameStatus.FINISHED_NEW_ROUND]: 'Starting new round',
  [GameStatus.ENDED]: 'Ended',
}

export const GameStatusSelect = {
  items: [
      [GameStatusFriendly[GameStatus.SETTING_UP]],
      [GameStatusFriendly[GameStatus.STARTING]],
      [GameStatusFriendly[GameStatus.READY]],
      [GameStatusFriendly[GameStatus.PLAYING]],
      [GameStatusFriendly[GameStatus.FINISHED_NEW_ROUND]],
      [GameStatusFriendly[GameStatus.ENDED]],
  ],
  value: [
      GameStatus.SETTING_UP,
      GameStatus.STARTING,
      GameStatus.READY,
      GameStatus.PLAYING,
      GameStatus.FINISHED_NEW_ROUND,
      GameStatus.ENDED,
  ]
}

export const GameStatusTranslate = {
    [GameStatusFriendly[GameStatus.SETTING_UP]]: GameStatus.SETTING_UP,
    [GameStatusFriendly[GameStatus.STARTING]]: GameStatus.STARTING,
    [GameStatusFriendly[GameStatus.READY]]: GameStatus.READY,
    [GameStatusFriendly[GameStatus.PLAYING]]: GameStatus.PLAYING,
    [GameStatusFriendly[GameStatus.FINISHED_NEW_ROUND]]: GameStatus.FINISHED_NEW_ROUND,
    [GameStatusFriendly[GameStatus.ENDED]]: GameStatus.ENDED,
}
