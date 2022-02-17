import React, { useState, useEffect } from 'react';
import axios from 'axios';
import RoomItem from './RoomItem';
import { Room } from '../interfaces/Room';

const RoomsList = () => {
  const [rooms, setRooms] = useState<Room[]>();

  useEffect(() => {
    axios
      .get('http://localhost:8000/rooms')
      .then(response => {
        setRooms(response.data);
      })
  }, []);

  return (
    <>
      { rooms && rooms.map(room => (
        <RoomItem 
          key={ room.id }
          room={ room }
        ></RoomItem> 
      ))}
    </>
  );
}
export default RoomsList;