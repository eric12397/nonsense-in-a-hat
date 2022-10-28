import React, { useState } from 'react';
import { CreateGame } from '../interfaces/CreateGame';
import { createGame, joinGame } from '../gameSlice';
import { useAppDispatch } from '../../../hooks/redux';
import { useNavigate } from 'react-router-dom';


const initialGameData: CreateGame = {
  name: "",
  password: "",
  hostId: "",
  maxPlayersAllowed: 2,
  rounds: 5,
  mode: "Classic"
}

const HostGame = () => {
  const [gameData, setGameData] = useState<CreateGame>(initialGameData);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const submitForm = async (event: any) => {
    event.preventDefault();
    try {
      const { id } = await dispatch(createGame(gameData)).unwrap();

      if (id) {
        await dispatch(joinGame(id)).unwrap();
        navigate(`/games/${id}`);
      }
    } catch (err) {
      // dispatch error message
      console.log(err);
    }
  }

  return (
    <div className='shadow p-10 rounded bg-white'>
      <div className="flex flex-wrap items-center mb-12">
        <label className="w-20 mr-16 font-bold">Name:</label>
        <input 
          type="text" 
          placeholder='Enter a unique room name'  
          className="flex-1 shadow-sm bg-gray-50 border border-gray-300 rounded-lg outline-none p-3" 
          onChange={ event => setGameData({ ...gameData, name: event.target.value }) }
          />
      </div>

      <div className="flex flex-wrap items-center mb-12">
        <label className="w-20 mr-16 font-bold">Password:</label>
        <input 
          type="text" 
          placeholder='Create a password'
          className="flex-1 shadow-sm bg-gray-50 border border-gray-300 rounded-lg outline-none p-3" 
          onChange={ event => setGameData({ ...gameData, password: event.target.value }) }
          />
      </div>

      <div className="flex flex-wrap justify-start">
        <div className="flex basis-1/3 items-center mb-12">
          <label className="w-20 mr-16 font-bold">Max players:</label>
          <select
            className="shadow-sm bg-gray-50 border border-gray-300 rounded-lg outline-none p-3" 
            onChange={ event => setGameData({ ...gameData, maxPlayersAllowed: parseInt(event.target.value) }) }
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
            onChange={ event => setGameData({ ...gameData, rounds: parseInt(event.target.value) }) }
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
                onChange={ event => setGameData({ ...gameData, mode: event.target.value }) }
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
                onChange={ event => setGameData({ ...gameData, mode: event.target.value }) }
              />
              Quiplash
            </label>
          </div>
        </div>
      </div>

      <div className="text-right">
        <button className="py-4 px-16 bg-salmon text-white rounded" onClick={ submitForm }>Create game</button> 
      </div>
    </div>
  )
}

export default HostGame