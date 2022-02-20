import { Player } from 'src/player/entities/player.model';

export class CreateRoomDTO {
  public id: string;
  public name: string;
  public host: Player;
}
