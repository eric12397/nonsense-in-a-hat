import React, { useState, useEffect } from 'react';
import GameItem from './GameItem';
import { getGames, selectGames } from '../gameSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';

const GamesList = () => {
  const games = useAppSelector(selectGames);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getGames());
  }, [dispatch]);

  return (
    <div className='grid grid-cols-1 divide-y divide-silver'>
      { games && games.length > 0 ? 
        games.map(game => (
          <GameItem 
            key={ game.id }
            game={ game }
            host={ game.host }
          ></GameItem> 
        )) 
        : "No games active. Check back again soon." }
    </div>
  );
}
export default GamesList;