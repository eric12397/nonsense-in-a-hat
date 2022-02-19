import React from 'react';
import { Room } from '../interfaces/Room';

interface RoomItemProps {
  key: string;
  room: Room;
  host: any;
};

const RoomItem = ({ room, host }: RoomItemProps) => {
  return (
    <div className='bg-white shadow-md '>
      <div className="flex items-center p-5">
        <img
          className="w-24 mr-8"
          src={ host.avatar }
        />

        <div className='flex flex-col'>
          <h3 className="font-semibold text-lg text-midnight">{ room.name }</h3>

          <div className='flex flex-row mt-5'>
            <div className='mr-20'>
              <h5 className='font-semibold text-lg text-midnight'>Hosted By:</h5>
              <p>{ host.name }</p>
            </div>

            <div className='mr-20'>
              <h5 className='font-semibold text-lg text-midnight'>Capacity:</h5>
              <p>{ room.currentPlayerCount } / { room.maxPlayersAllowed }</p>
            </div>
            
            <div className='mr-20'>
              <h5 className='font-semibold text-lg text-midnight'>Mode:</h5>
              <p>{ room.gameMode }</p>
            </div>

            <div>
              <h5 className='font-semibold text-lg text-midnight'>Status:</h5>
              <p>{ room.isGameInProgress ? "In Progress" : "Waiting" }</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default RoomItem