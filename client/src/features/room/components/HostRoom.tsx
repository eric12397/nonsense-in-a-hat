import React, { useState } from 'react';
import { CreateRoom } from '../interfaces';
import { createRoom } from '../roomSlice';
import { useAppDispatch } from '../../../hooks/redux';
import { useNavigate } from 'react-router-dom';

const initialRoomData: CreateRoom = {
  name: "",
  password: "",
  hostId: "",
  maxPlayersAllowed: 2,
  rounds: 5,
  mode: "Classic"
}

const HostRoom = () => {
  const [roomData, setRoomData] = useState<CreateRoom>(initialRoomData);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const submitForm = async (event: any) => {
    event.preventDefault();
    const { id } = await dispatch(createRoom(roomData)).unwrap();
    navigate(`/rooms/${id}`);
  }

  return (
    <div className='shadow p-10 rounded bg-white'>
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

      <div className="flex flex-wrap justify-start">
        <div className="flex basis-1/3 items-center mb-12">
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

        <div className="flex basis-1/3 items-center mb-12">
          <label className="w-20 mr-16 font-bold">Number of rounds:</label>
          <select
            className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg outline-none p-3" 
            onChange={ event => setRoomData({ ...roomData, rounds: parseInt(event.target.value) }) }
            >
              <option>5</option>
              <option>10</option>
              <option>15</option>
              <option>20</option>
          </select>
        </div>

        <div className="basis-1/3 mb-12">
          <label className="mb-2 font-bold">Game mode:</label>
          <div className="mb-1">
            <label>
              <input
                type="radio"
                name="mode"
                value="Classic"
                checked={true}
                onChange={ event => setRoomData({ ...roomData, mode: event.target.value }) }
              />
              Classic
            </label>
          </div>

          <div>
            <label>
              <input
                type="radio"
                name="mode"
                value="Quiplash"
                onChange={ event => setRoomData({ ...roomData, mode: event.target.value }) }
              />
              Quiplash
            </label>
          </div>
        </div>
      </div>

      <div className="text-right">
        <button className="py-4 px-16 bg-salmon text-white rounded" onClick={ submitForm }>Create room</button> 
      </div>
    </div>
  )
}

export default HostRoom