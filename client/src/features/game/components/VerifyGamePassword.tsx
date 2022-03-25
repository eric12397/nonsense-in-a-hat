import React, { useState } from 'react'
import { gameAPI } from '../api';
import { VerifyGame } from '../interfaces/VerifyGame';

interface VerifyGamePasswordProps {
  gameId: string;
  name: string;
  setIsPasswordVerified: React.Dispatch<React.SetStateAction<boolean>>
}

const initialGameData: VerifyGame = {
  gameId: "",
  password: ""
}

const VerifyGamePassword = ({ gameId, name, setIsPasswordVerified }: VerifyGamePasswordProps) => {
  const [gameData, setGameData] = useState<VerifyGame>(initialGameData);

  const submitForm = async (event: any) => {
    // TODO: add form validation
    event.preventDefault();
    const { password } = gameData;

    if (!password) {
      return;
    }
    gameData.gameId = gameId;
    const isPasswordVerified = await gameAPI.verifyGamePassword(gameData);
    setIsPasswordVerified(isPasswordVerified);
  };

  return (
    <form>
      <h2 className='text-xl font-semibold text-gray-700'>Join { name }</h2>
      <div className="flex flex-wrap items-center mt-5">
        <label className="mr-12 font-bold text-gray-700">Password:</label>
        <input 
          type="text" 
          placeholder="Enter the game's password"  
          className="flex-1 shadow-sm bg-gray-50 border border-gray-300 rounded-lg outline-none p-3" 
          onChange={ event => setGameData({ ...gameData, password: event.target.value }) }
          />
      </div>

      <div className="text-right mt-5">
        <button className="py-3 px-12 bg-salmon text-white rounded" onClick={ submitForm }>Verify</button> 
      </div>
    </form>
  )
}
export default VerifyGamePassword