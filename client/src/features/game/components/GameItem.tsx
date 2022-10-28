import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Modal from '../../../components/Modal';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { selectMyPlayer } from '../../auth/authSlice';
import { joinGame } from '../gameSlice';
import { Game } from '../interfaces/Game';
import VerifyGamePassword from './VerifyGamePassword';

interface GameItemProps {
  game: Game;
  host: any;
};

const GameItem = ({ game, host }: GameItemProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isOpen, setIsOpen] = useState(false);
  const [isPasswordVerified, setIsPasswordVerified] = useState(false);

  const toggleModal = () => setIsOpen(!isOpen);

  const handleJoin = async (event: any) => {
    event.preventDefault();
    toggleModal();
  };

  useEffect(() => {
    if (isPasswordVerified) {
      const tryJoin = async () => {
        try {
          await dispatch(joinGame(game.id!)).unwrap();
          navigate(`/games/${game.id!}`);
        } catch (err) {
          // dispatch error message
          console.log(err);
        }
      } 
      tryJoin();
    }
}, [isPasswordVerified]);

  return (
    <div className='bg-white bg-opacity-80 shadow-md'>
      <Modal isOpen={ isOpen } toggle={ toggleModal } >
        <VerifyGamePassword 
          gameId={ game.id }
          name={ game.name } 
          setIsPasswordVerified={ setIsPasswordVerified }
        />
      </Modal>

      <div className="flex items-center p-5">
        <img
          className="w-24 mr-8"
          src={ host.avatar }
        />

        <div className='flex flex-col'>
          <h3 className="font-semibold text-lg text-midnight">{ game.name }</h3>

          <div className='flex flex-row flex-wrap mt-5'>
            <div className='mr-20'>
              <h5 className='font-semibold text-lg text-midnight'>Hosted By:</h5>
              <p>{ host.name }</p>
            </div>

            <div className='mr-20'>
              <h5 className='font-semibold text-lg text-midnight'>Capacity:</h5>
              <p>{ game.currentPlayerCount } / { game.maxPlayersAllowed }</p>
            </div>
            
            <div className='mr-20'>
              <h5 className='font-semibold text-lg text-midnight'>Mode:</h5>
              <p>{ game.gameMode }</p>
            </div>

            <div className='mr-20'>
              <h5 className='font-semibold text-lg text-midnight'>Status:</h5>
              <p>{ game.isGameInProgress ? "In Progress" : "Waiting" }</p>
            </div>

            <div>
              { !game.isGameInProgress ? 
              <button className="py-3 px-12 bg-salmon text-white rounded" onClick={ handleJoin }>Join</button> 
              : "" }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GameItem