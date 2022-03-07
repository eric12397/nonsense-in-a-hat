import { Module } from '@nestjs/common';
import { PlayerModule } from 'src/player/player.module';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';

@Module({
  imports: [PlayerModule],
  controllers: [RoomController],
  providers: [RoomService],
  exports: [RoomService],
})
export class RoomModule {}
