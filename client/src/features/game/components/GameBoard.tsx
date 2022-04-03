import React, { useEffect, useState } from 'react';
import SideBar from '../../../components/SideBar';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { selectMyPlayer } from '../../auth/authSlice';
import { joinGame, leaveGame, selectGameById, selectGameRemovedFlag, submitScript, updateGameRemovedFlag } from '../gameSlice';
import { useNavigate, useParams } from 'react-router-dom';
import Modal from '../../../components/Modal';

const GameBoard = () => {
  const { id } = useParams(); // game id
  const [script, setScript] = useState("");
  const game = useAppSelector(state => selectGameById(state, id!));
  const isGameRemoved = useAppSelector(selectGameRemovedFlag);
  const myPlayer = useAppSelector(selectMyPlayer);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const toggleModal = () => {
    dispatch(updateGameRemovedFlag(false))
    navigate('/home/games');
  }

  const submitForm = async (event: any) => {
    if (event.key === "Enter") {
      event.preventDefault();
      dispatch(submitScript(script));
      setScript("");
    }
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

      <div className='w-4/5 p-6 flex flex-col'>
        <div className='mb-10'>
          <h1 className='text-2xl font-extrabold'>Pre-Game Lobby</h1>
        </div>
        
        <div className='flex flex-row flex-wrap'>
          <div className="w-1/4 p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ game?.gameMode }</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">Mode</p>
          </div>

          <div className="w-1/4 p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ game?.maxRounds }</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">Total Rounds</p>
          </div>

          <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">How to play:</h5>
            <p className="font-normal text-gray-700 dark:text-gray-400">{ game?.board?.howToPlay }</p>
          </div>
        </div>
        
        <div className="mt-auto p-3 h-1/4 bg-white rounded-lg border border-gray-200 shadow-md">
          <textarea 
            className='w-full h-full shadow-sm bg-gray-50 border border-gray-300 rounded-lg outline-none p-3'
            onChange={ event => setScript(event.target.value) }
            onKeyPress={ submitForm }
          />
        </div>
      </div>
    </div>
  )
}

export default GameBoard