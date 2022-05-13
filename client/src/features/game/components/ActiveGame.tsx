import React from 'react'
import MainContent from '../../../components/MainContent';
import SideBar from '../../../components/SideBar'
import { Game } from '../interfaces/Game';

interface ActiveGameProps {
  game: Game;
};

const ActiveGame = ({ game }: ActiveGameProps) => {
  return (
    <>
      <SideBar>
        <div className="p-3 w-full">
          <ul className="relative">
          { game?.board?.players && game?.board?.players.map(p => (
            <li className="relative flex items-center p-3 text-white">
              <img
                className="w-20 mr-4"
                src={ p.player.avatar }
                alt=""
              />
              <div className='flex flex-col'>
                <span className='mb-2'>{ p.player.name }</span>
                <span className='mb-2'>Score: { p.score }</span>
              </div>  
            </li>
          ))} 
          </ul>
        </div>
      </SideBar>
      
      <MainContent>
        <div>Game has started!</div>
      </MainContent>
    </>
  )
}

export default ActiveGame