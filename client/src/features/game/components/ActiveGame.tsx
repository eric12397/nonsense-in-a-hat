import React from 'react'
import MainContent from '../../../components/MainContent';
import SideBar from '../../../components/SideBar'
import { Game } from '../interfaces/Game';
import { Player } from '../../player/interfaces/Player';

interface ActiveGameProps {
  game: Game;
  myPlayer: Player;
};

const ActiveGame = ({ game, myPlayer }: ActiveGameProps) => {
  const activePlayer = game?.board?.players.find(p => p.name === "Active");


  return (
    <>
      <SideBar>
        <div className="p-3 w-full">
          <ul className="relative">
          { game?.board?.players && game?.board?.players.map(p => (
            <li className="relative flex items-center p-3 text-white">
              <img
                className="w-20 mr-4"
                src={ p.avatar }
                alt=""
              />
              <div className='flex flex-col'>
                <span className='mb-2'>{ p.name }</span>
                {/* <span className='mb-2'>Score: { p.score }</span> */}
              </div>  
            </li>
          ))} 
          </ul>
        </div>
      </SideBar>
      
      <MainContent>
        <div>
          { myPlayer.id === activePlayer?.id ?
            <div>
              {/* { activePlayer?.script?.text } */}
            </div> 
            :
            <div>
              Please wait your turn...
            </div> 
          }
        </div>
      </MainContent>
    </>
  )
}

export default ActiveGame