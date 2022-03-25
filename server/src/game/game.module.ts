import { Module } from '@nestjs/common';
import { PlayerModule } from 'src/player/player.module';
import { GameController } from './game.controller';
import { GameGateway } from './game.gateway';
import { GameService } from './game.service';

@Module({
  imports: [PlayerModule],
  controllers: [GameController],
  providers: [GameService, GameGateway],
  exports: [GameService, GameGateway],
})
export class GameModule {}
