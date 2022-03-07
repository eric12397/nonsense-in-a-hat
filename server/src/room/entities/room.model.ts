import { v4 as uuidv4 } from 'uuid';
import { Player } from 'src/player/entities/player.model';

export class Room {
  public id: string;

  public name: string;

  public participants: Player[];

  public host: Player;

  public maxPlayersAllowed: number;

  public gameMode: string;

  public isGameInProgress: boolean;

  public password: string;

  constructor() {
    this.id = uuidv4();
    this.participants = new Array<Player>();
  }

  public joinRoom = (player: Player): void => {
    this.participants.push(player);
  };
}
