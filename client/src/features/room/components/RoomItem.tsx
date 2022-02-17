import React from 'react';
import { Room } from '../interfaces/Room';

interface RoomItemProps {
  key: string;
  room: Room;
};

const RoomItem = ({ room }: RoomItemProps) => {
  return (
    <div className='p-3 rounded bg-white shadow-md'>
      <p>{ room.name }</p>
    </div>
  )
}

export default RoomItem