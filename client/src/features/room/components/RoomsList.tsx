import React, { useState, useEffect } from 'react';
import RoomItem from './RoomItem';
import { Room } from '../interfaces';
import rabbitPink from "../../../assets/rabbit-pink.svg";
import rabbitBlue from "../../../assets/rabbit-blue.svg";
import { getRooms, selectRooms } from '../roomSlice';
import { useAppDispatch, useAppSelector } from '../../../hooks/redux';
import { useSelector } from 'react-redux';

const RoomsList = () => {
  const rooms = useAppSelector(selectRooms);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getRooms());
  }, [dispatch]);

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