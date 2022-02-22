import { Injectable } from '@nestjs/common';
import { CreatePlayerDTO } from './dto/createPlayer.dto';
import { Player } from './entities/player.model';

@Injectable()
export class PlayerService {
  private _players: Map<string, Player>;

  constructor() {
    this._players = new Map<string, Player>();
  }

  public getPlayerById = (playerId: string): Player => {
    return this._players.get(playerId);
  };

  public createPlayer = (playerData: CreatePlayerDTO): Player => {
    const { name, avatar } = playerData;

    const newPlayer = new Player();
    newPlayer.name = name;
    newPlayer.avatar = avatar;

    this._players.set(newPlayer.id, newPlayer);
    return newPlayer;
  };
}
