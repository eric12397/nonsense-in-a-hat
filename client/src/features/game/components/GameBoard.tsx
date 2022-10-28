import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { selectMyPlayer } from '../../auth/authSlice';
import { leaveGame, selectGameById, selectGameRemovedFlag, startGame, updateGameRemovedFlag } from '../gameSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../../components/Modal';
import PreGameLobby from './PreGameLobby';
import ActiveGame from './ActiveGame';

const GameBoard = () => {
  const { id } = useParams(); // game id

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
    try {
      await dispatch(startGame(game?.id!)).unwrap();
    } catch (err) {
      // dispatch error message
      console.log(err);
    }
    
  }

  useEffect(() => {
    return () => {
      dispatch(leaveGame(id!))
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

      { game?.isGameInProgress ? 
        <ActiveGame game={ game! } myPlayer={ myPlayer }/> : 
        <PreGameLobby game={ game! } myPlayer={ myPlayer } startGameHandler={ handleStart }/> }
    </div>
  )
}

export default GameBoard;