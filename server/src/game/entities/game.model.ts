import { v4 as uuidv4 } from 'uuid';
import { Player } from 'src/player/entities/player.model';

export class Game {
  public id: string;

  public name: string;

  public participants: Player[];

  public host: Player;

  public maxPlayersAllowed: number;

  public rounds: number;

  public gameMode: string;

  public isGameInProgress: boolean;

  public password: string;

  constructor() {
    this.id = uuidv4();
    this.participants = new Array<Player>();
  }

  public joinGame = (player: Player): void => {
    this.participants.push(player);
  };

  public leaveGame = (player: Player): void => {
    this.participants = this.participants.filter((p) => p.id !== player.id);
  };
}
