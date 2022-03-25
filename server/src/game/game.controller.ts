import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { GameService } from './game.service';
import { GameDTO } from './dto/game.dto';
import { Game } from './entities/game.model';
import { CreateGameDTO } from './dto/createGame.dto';

@Controller()
export class GameController {
  constructor(private readonly _gameService: GameService) {}

  @Get('/games')
  public getGames(): GameDTO[] {
    return this._gameService.getAllGames();
  }

  @Post('/games')
  public createGame(@Body() gameData: CreateGameDTO): Game {
    return this._gameService.createGame(gameData);
  }

  @Post('/games/:id/verify')
  public verifyPassword(@Param('id') gameId: string, @Body('password') password: string): boolean {
    const game = this._gameService.getGameById(gameId);

    if (game.password === password) {
      return true;
    }
    return false;
  }
}
