import React, { useState } from 'react'
import { useAppDispatch } from '../../../hooks/redux';
import { Player } from '../../player/interfaces/Player';
import { submitScript } from '../gameSlice';
import { Game } from '../interfaces/Game';

interface PreGameLobbyProps {
  game: Game;
  myPlayer: Player;
  startGameHandler: () => Promise<void>;
};

const PreGameLobby = ({ game, myPlayer, startGameHandler }: PreGameLobbyProps) => {
  const [script, setScript] = useState("");

  const dispatch = useAppDispatch();

  const submitForm = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      dispatch(submitScript(script));
      setScript("");
    }
  }

  return (
    <div className='w-4/5 p-6'>
      <div className='mb-10'>
        <h1 className='text-2xl font-extrabold'>Pre-Game Lobby</h1>
      </div>
      
      <div className='grid grid-cols-4 grid-rows-6 gap-6'>
        <div className="col-span-1 row-span-1 p-6 bg-white rounded-lg shadow-md hover:bg-gray- 100">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{ game?.gameMode }</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">Mode</p>
        </div>

        <div className="col-span-1 row-span-1 p-6 bg-white rounded-lg shadow-md hover:bg-gray-100">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{ game?.board?.maxRounds }</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">Total Rounds</p>
        </div>

        <div className="col-span-2 row-span-3 p-6 bg-white rounded-lg shadow-md hover:bg-gray-100">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">How to play:</h5>
          <p className="font-normal text-gray-700 dark:text-gray-400">{ game?.board?.howToPlay }</p>
        </div>
        
        <div className="col-span-2 row-span-2 p-6 flex items-center bg-white rounded-lg shadow-md hover:bg-gray-100">
          <svg aria-hidden="true" focusable="false" data-prefix="fas" className="w-3 h-3 mr-3" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <path fill="currentColor" d="M216 0h80c13.3 0 24 10.7 24 24v168h87.7c17.8 0 26.7 21.5 14.1 34.1L269.7 378.3c-7.5 7.5-19.8 7.5-27.3 0L90.1 226.1c-12.6-12.6-3.7-34.1 14.1-34.1H192V24c0-13.3 10.7-24 24-24zm296 376v112c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V376c0-13.3 10.7-24 24-24h146.7l49 49c20.1 20.1 52.5 20.1 72.6 0l49-49H488c13.3 0 24 10.7 24 24zm-124 88c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20zm64 0c0-11-9-20-20-20s-20 9-20 20 9 20 20 20 20-9 20-20z"></path>
          </svg>

          <div className='flex flex-col'>
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">{ game?.board?.hat?.length }</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">Number of scripts</p>
          </div>
        </div>

        <div className="col-span-4 row-span-2 p-3 bg-white rounded-lg shadow-md">
          <textarea 
            className='w-full h-full shadow-sm bg-gray-50 border border-gray-300 rounded-lg outline-none p-3'
            onChange={ event => setScript(event.target.value) }
            value={ script }
            onKeyPress={ submitForm }
          />
        </div>

        { myPlayer.id === game?.host.id && 
          <div className="col-span-1">
            <button className="py-4 px-16 bg-salmon text-white rounded" onClick={ startGameHandler }>Start game</button> 
          </div>
        }
      </div>
    </div>
  )
}

export default PreGameLobby