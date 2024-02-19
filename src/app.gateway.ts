import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';

@WebSocketGateway({ cors: true })
export class AppGateway implements OnGatewayConnection, OnGatewayDisconnect {
  streamer: {
    client: Socket;
    sdp: JSON;
  };
  @WebSocketServer() server: Server;
  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    console.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, message: string) {
    console.log('message', message);
  }

  @SubscribeMessage('startStream')
  startStream(client: Socket, streamerSdp: any) {
    this.streamer = { client: client, sdp: streamerSdp };
  }

  @SubscribeMessage('startViews')
  startViews(client: Socket) {
    client.emit('streamerSdp', this.streamer.sdp);
  }

  @SubscribeMessage('clientSdp')
  handlePeerAnswerMessage(client: Socket, clientSdp: any) {
    this.streamer.client.emit('clientSdp', clientSdp);
  }
}
