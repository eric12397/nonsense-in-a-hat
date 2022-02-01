import { Player } from 'src/player/player.model';

export class Room {
  public id: string;
  public name: string;
  public participants: Player[];
  public host: Player;
  public secureCode: string;
}
