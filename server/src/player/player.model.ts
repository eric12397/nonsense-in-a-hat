import { CreatePlayerDTO } from './dto/createPlayer.dto';

export class Player {
  public id: string;
  public name: string;
  public rabbit: string;

  constructor(player: CreatePlayerDTO) {
    this.name = player.name;
    this.rabbit = player.rabbit;
  }
}
