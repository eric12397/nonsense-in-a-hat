import React, { useEffect } from 'react';
import SideBar from '../../../components/SideBar';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { selectMyPlayer } from '../../auth/authSlice';
import { joinGame, leaveGame, selectGameById, selectGameRemovedFlag, updateGameRemovedFlag } from '../gameSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../../components/Modal';

const GameBoard = () => {
  const { id } = useParams(); // game id
  const game = useAppSelector(state => selectGameById(state, id!));
  // const game = useAppSelector(state => selectGameById(state, id!));
  const isGameRemoved = useAppSelector(selectGameRemovedFlag);
  const myPlayer = useAppSelector(selectMyPlayer);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const toggleModal = () => {
    dispatch(updateGameRemovedFlag(false))
    navigate('/home/games');
  }

  useEffect(() => {
    dispatch(joinGame(game?.id!, myPlayer.id!));

    return () => {
      dispatch(leaveGame(game?.id!, myPlayer.id!))
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
          { game?.participants && game.participants.map(player => (
            <li className="relative flex items-center p-3 text-white">
              <img
                className="w-20 mr-4"
                src={ player.avatar }
                alt=""
              /> 
              <span>{ player.name }</span>
            </li>
          ))} 
          </ul>
        </div>
      </SideBar>

      Game123
    </div>
  )
}

export default GameBoard