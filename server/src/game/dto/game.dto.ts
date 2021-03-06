import { Player } from 'src/player/entities/player.model';

export class GameDTO {
  public id: string;

  public name: string;

  public host: Player;

  public currentPlayerCount: number;

  public maxPlayersAllowed: number;

  public gameMode: string;

  public isGameInProgress: boolean;
}
