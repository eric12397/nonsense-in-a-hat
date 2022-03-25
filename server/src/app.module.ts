import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GameModule } from './game/game.module';
import { PlayerModule } from './player/player.module';
import { ConnectionGateway } from './app.gateway';

@Module({
  imports: [GameModule, PlayerModule],
  controllers: [AppController],
  providers: [AppService, ConnectionGateway],
})
export class AppModule {}
