import React, { useState, useEffect } from 'react';
import RoomItem from './RoomItem';
import { Room } from '../interfaces';
import rabbitPink from "../../../assets/rabbit-pink.svg";
import rabbitBlue from "../../../assets/rabbit-blue.svg";

const initialRoomData1: Room = {
  id: "123",
  name: "Naansense",
  host: { name: "Zekey Education", avatar: rabbitPink  },
  currentPlayerCount: 1,
  maxPlayersAllowed: 8,
  gameMode: "Classic",
  isGameInProgress: false,
}
const initialRoomData2: Room = {
  id: "124",
  name: "Resume Workshop",
  host: { name: "Gordi", avatar: rabbitBlue },
  currentPlayerCount: 4,
  maxPlayersAllowed: 8,
  gameMode: "Classic",
  isGameInProgress: true,
}

const RoomsList = () => {
  const [rooms, setRooms] = useState<Room[]>([initialRoomData1,initialRoomData2]);

  useEffect(() => {
    // axios
    //   .get<Room[]>('http://localhost:8000/rooms')
    //   .then(response => {
    //     setRooms(response.data);
    //   })
  }, []);

  return (
    <div className='grid grid-cols-1 divide-y divide-silver'>
      { rooms && rooms.map(room => (
        <RoomItem 
          key={ room.id }
          room={ room }
          host={ room.host }
        ></RoomItem> 
      ))}
    </div>
  );
}
export default RoomsList;