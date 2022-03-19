import React, { useEffect } from 'react';
import SideBar from '../../../components/SideBar';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { selectMyPlayer } from '../../auth/authSlice';
import { joinRoom, leaveRoom, selectRoomById } from '../roomSlice';
import { useParams } from 'react-router-dom';

const RoomDetails = () => {
  const { id } = useParams(); // room id
  const room = useAppSelector(state => selectRoomById(state, id!));
  const myPlayer = useAppSelector(selectMyPlayer);
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    dispatch(joinRoom(room?.id!, myPlayer.id!));

    return () => {
      dispatch(leaveRoom(room?.id!, myPlayer.id!))
    }
  }, []);

  return (
    <div className='flex container mx-auto h-2/3 w-3/4 rounded-xl bg-silver shadow-lg'>
      <SideBar>
        <div className="p-3 w-full">
          <ul className="relative">
          { room?.participants && room.participants.map(player => (
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

      Room123
    </div>
  )
}

export default RoomDetails