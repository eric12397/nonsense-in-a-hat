import React, { useState } from 'react'
import { roomAPI } from '../api';
import { VerifyRoom } from '../interfaces/VerifyRoom';

interface VerifyRoomPasswordProps {
  roomId: string;
  name: string;
  setIsPasswordVerified: React.Dispatch<React.SetStateAction<boolean>>
}

const initialRoomData: VerifyRoom = {
  roomId: "",
  password: ""
}

const VerifyRoomPassword = ({ roomId, name, setIsPasswordVerified }: VerifyRoomPasswordProps) => {
  const [roomData, setRoomData] = useState<VerifyRoom>(initialRoomData);

  const submitForm = async (event: any) => {
    // TODO: add form validation
    event.preventDefault();
    const { password } = roomData;

    if (!password) {
      return;
    }
    roomData.roomId = roomId;
    const isPasswordVerified = await roomAPI.verifyRoomPassword(roomData);
    setIsPasswordVerified(isPasswordVerified);
  };

  return (
    <form>
      <h2 className='text-xl font-semibold text-gray-700'>Join { name }</h2>
      <div className="flex flex-wrap items-center mt-5">
        <label className="mr-12 font-bold text-gray-700">Password:</label>
        <input 
          type="text" 
          placeholder='Enter the room password'  
          className="flex-1 shadow-sm bg-gray-50 border border-gray-300 rounded-lg outline-none p-3" 
          onChange={ event => setRoomData({ ...roomData, password: event.target.value }) }
          />
      </div>

      <div className="text-right mt-5">
        <button className="py-3 px-12 bg-salmon text-white rounded" onClick={ submitForm }>Verify</button> 
      </div>
    </form>
  )
}
export default VerifyRoomPassword