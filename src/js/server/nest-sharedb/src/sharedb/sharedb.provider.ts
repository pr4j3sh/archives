import { Injectable, OnModuleInit } from '@nestjs/common';
import ShareDB from 'sharedb';
import mongodb from 'sharedb-mongo';
import WebSocket from 'ws';
import WebSocketJSONStream from '@teamwork/websocket-json-stream';

@Injectable()
export class ShareDBService implements OnModuleInit {
  private shareDB: ShareDB;

  constructor() {
    this.shareDB = new ShareDB({
      db: mongodb('mongodb://localhost:27017/sharedb'),
    });
  }

  getConnection() {
    return this.shareDB.connect();
  }

  onModuleInit() {
    const wss = new WebSocket.Server({ port: 8080 });
    wss.on('connection', (ws) => {
      const stream = new WebSocketJSONStream(ws);
      this.shareDB.listen(stream);
    });
    console.log('ShareDB WebSocket server started on ws://localhost:8080');
  }
}
