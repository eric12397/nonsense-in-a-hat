import { Player } from 'src/player/player.model';

export class CreateRoomDTO {
  public id: string;
  public name: string;
  public host: Player;
}
