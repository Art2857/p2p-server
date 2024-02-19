import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { WebSocketModule } from './websocket.module';

@Module({
  imports: [WebSocketModule],
  controllers: [AppController],
})
export class AppModule {}
