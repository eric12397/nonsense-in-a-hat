import { Player } from 'src/player/player.model';

export class Room {
  public id: string;

  public name: string;

  public participants: Player[];

  public host: Player;

  public maxPlayersAllowed: number;

  public gameMode: string;

  public isGameInProgress: boolean;

  public secureCode: string;
}
