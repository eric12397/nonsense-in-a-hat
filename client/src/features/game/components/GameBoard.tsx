import React, { useEffect, useState } from 'react';
import SideBar from '../../../components/SideBar';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { selectMyPlayer } from '../../auth/authSlice';
import { joinGame, leaveGame, selectGameById, selectGameRemovedFlag, startGame, updateGameRemovedFlag } from '../gameSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../../components/Modal';
import PreGameLobby from './PreGameLobby';
import ActiveGame from './ActiveGame';

const GameBoard = () => {
  const { id } = useParams(); // game id
  const [isGameActive, setIsGameActive] = useState(false);

  const game = useAppSelector(state => selectGameById(state, id!));
  const isGameRemoved = useAppSelector(selectGameRemovedFlag);
  const myPlayer = useAppSelector(selectMyPlayer);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const toggleModal = () => {
    dispatch(updateGameRemovedFlag(false))
    navigate('/home/games');
  }

  const handleStart = async (): Promise<void> => {
    await dispatch(startGame(game?.id!));
    setIsGameActive(true);
  }

  useEffect(() => {
    dispatch(joinGame(id!, myPlayer.id!));

    return () => {
      dispatch(leaveGame(id!, myPlayer.id!))
    }
  }, []);

  return (
    <div className='flex container mx-auto h-2/3 w-3/4 rounded-xl bg-silver shadow-lg'>
      <Modal isOpen={ isGameRemoved } toggle={ toggleModal } >
        <div>
          <h2 className='text-xl font-semibold text-gray-700'>Oh no!</h2>
          <div className="flex flex-wrap items-center mt-5">
            The game is no longer available. Please click OK to return to the main menu.
          </div>

          <div className="text-right mt-5">
            <button className="py-3 px-12 bg-salmon text-white rounded" onClick={ toggleModal }>Ok</button> 
          </div>
        </div>
      </Modal>

      <SideBar>
        <div className="p-3 w-full">
          <ul className="relative">
          { game?.players && game?.players.map(p => (
            <li className="relative flex items-center p-3 text-white">
              <img
                className="w-20 mr-4"
                src={ p.avatar }
                alt=""
              /> 
              <span>{ p.name }</span>
            </li>
          ))} 
          </ul>
        </div>
      </SideBar>
      
      { isGameActive ? 
        <ActiveGame /> : <PreGameLobby game={ game! } myPlayer={ myPlayer } startGameHandler={ handleStart }/> }
    </div>
  )
}

export default GameBoard;