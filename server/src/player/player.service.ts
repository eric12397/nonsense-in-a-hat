import { Injectable } from '@nestjs/common';
import { CreatePlayerDTO } from './dto/createPlayer.dto';
import { Player } from './player.model';

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
    const { name } = playerData;

    const newPlayer = new Player();
    newPlayer.name = name;

    this._players.set(newPlayer.id, newPlayer);
    return newPlayer;
  };
}
