import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AddressInfo } from 'net';
import { io, Socket } from 'socket.io-client';
import { AppModule } from './../src/app.module.js';
import { CardType } from '@humanity-deck/shared/constants/CardTypes';

describe('AppController (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('/ (GET)', () => {
    return request(app.getHttpServer())
      .get('/')
      .expect(200)
      .expect('Hello World!');
  });

  it('/card/:id (GET) returns that card', async () => {
    const res = await request(app.getHttpServer())
      .get('/card/card2')
      .expect(200);

    expect(res.body).toMatchObject({ id: 'card2', type: CardType.BLACK_CARD });
  });

  it("/card/player/:player/game/:game (GET) returns the player's hand", async () => {
    const res = await request(app.getHttpServer())
      .get('/card/player/player-1/game/foobar')
      .expect(200);

    expect(res.body.length).toBeGreaterThan(0);
    for (const card of res.body) {
      expect(card.type).toBe(CardType.WHITE_CARD);
    }
  });
});

describe('Socket.IO gateways (e2e)', () => {
  let app: INestApplication;
  let port: number;
  const sockets: Socket[] = [];

  function connect(namespace: string): Socket {
    const socket = io(`http://localhost:${port}${namespace}`, {
      transports: ['websocket'],
    });
    sockets.push(socket);
    return socket;
  }

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.listen(0);
    port = (app.getHttpServer().address() as AddressInfo).port;
  });

  afterEach(async () => {
    sockets.splice(0).forEach((socket) => socket.disconnect());
    await app.close();
  });

  it('answers findAllGame with the list of games', async () => {
    const games = await connect('/game').emitWithAck('findAllGame', []);

    expect(Array.isArray(games)).toBe(true);
    expect(games.length).toBeGreaterThan(0);
    expect(games[0]).toHaveProperty('id');
    expect(games[0]).toHaveProperty('name');
  });

  it('answers findOneGame with a game', async () => {
    const game = await connect('/game').emitWithAck('findOneGame', {
      id: 'foobar',
    });

    expect(game).toMatchObject({ id: 'foobar' });
    expect(game.people.players.length).toBeGreaterThan(0);
  });

  it('answers findAllGamechat with the chat log', async () => {
    const log = await connect('/gamechat').emitWithAck(
      'findAllGamechat',
      'foobar',
    );

    expect(log.length).toBeGreaterThan(0);
    expect(log[0]).toHaveProperty('content');
  });
});
