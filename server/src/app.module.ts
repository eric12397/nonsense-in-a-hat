import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RoomModule } from './room/room.module';
import { PlayerModule } from './player/player.module';
import { ConnectionGateway } from './app.gateway';

@Module({
  imports: [RoomModule, PlayerModule],
  controllers: [AppController],
  providers: [AppService, ConnectionGateway],
})
export class AppModule {}
