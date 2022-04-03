import { ClassicMode, Game } from './game.model';

export class GameFactory {
  public static createGame(mode: string): Game {
    switch (mode) {
      case 'Classic':
        return new Game(new ClassicMode());
      default:
        return new Game(new ClassicMode());
    }
  }
}
