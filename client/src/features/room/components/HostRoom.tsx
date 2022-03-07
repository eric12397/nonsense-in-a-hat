import React, { useState } from 'react';
import { CreateRoom } from '../interfaces';
import { createRoom } from '../roomSlice';
import { useAppDispatch } from '../../../hooks/redux';
import { useNavigate } from 'react-router-dom';

const initialRoomData: CreateRoom = {
  name: "",
  password: "",
  hostId: "",
  maxPlayersAllowed: 0,
}

const HostRoom = () => {
  const [roomData, setRoomData] = useState<CreateRoom>(initialRoomData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submitForm = async (event: any) => {
    event.preventDefault();
    await dispatch(createRoom(roomData)).unwrap();
    navigate('/home/rooms');
  }

  return (
    <div className='shadow p-8 rounded bg-white'>
      <div className="flex flex-wrap items-center mb-12">
        <label className="w-20 mr-16 font-bold">Name:</label>
        <input 
          type="text" 
          placeholder='Enter a unique room name'  
          className="flex-1 shadow-sm bg-gray-50 border border-gray-300 rounded-lg outline-none p-3" 
          onChange={ event => setRoomData({ ...roomData, name: event.target.value }) }
          />
      </div>

      <div className="flex flex-wrap items-center mb-12">
        <label className="w-20 mr-16 font-bold">Password:</label>
        <input 
          type="text" 
          placeholder='Create a password'
          className="flex-1 shadow-sm bg-gray-50 border border-gray-300 rounded-lg outline-none p-3" 
          onChange={ event => setRoomData({ ...roomData, password: event.target.value }) }
          />
      </div>

      <div className="flex flex-wrap">
        <div className="flex items-center mb-12">
          <label className="w-20 mr-16 font-bold">Max players:</label>
          <select
            className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg outline-none p-3" 
            onChange={ event => setRoomData({ ...roomData, maxPlayersAllowed: parseInt(event.target.value) }) }
            >
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
          </select>
        </div>
      </div>

      <div className="text-right">
        <button className="py-4 px-16 bg-salmon text-white rounded" onClick={ submitForm }>Create room</button> 
      </div>
    </div>
  )
}

export default HostRoom