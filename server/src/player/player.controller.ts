import { Body, Controller, Post } from '@nestjs/common';
import { CreatePlayerDTO } from './dto/createPlayer.dto';
import { Player } from './entities/player.model';
import { PlayerService } from './player.service';

@Controller()
export class PlayerController {
  constructor(private readonly _playerService: PlayerService) {}

  @Post('/players')
  public createPlayer(@Body() playerData: CreatePlayerDTO): Player {
    return this._playerService.createPlayer(playerData);
  }
}
