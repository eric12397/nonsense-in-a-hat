import React, { useState } from 'react';
import rabbitPink from "../../../assets/rabbit-pink.svg";
import rabbitBlue from "../../../assets/rabbit-blue.svg";
import rabbitPurple from "../../../assets/rabbit-purple.svg";
import { useNavigate } from 'react-router-dom';
import { Player } from '../../player/interfaces/Player';
import { useAppDispatch } from '../../../hooks/redux';
import { loginAsGuest } from '../authSlice';

const defaultPlayer: Player = {
  name: "",
  avatar: rabbitPink
}

export const LoginPage = () => {
  const avatarArray = [rabbitPink, rabbitBlue, rabbitPurple];
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [avatarIndex, setAvatarIndex] = useState(0);
  const [player, setPlayer] = useState<Player>(defaultPlayer);
  
  const submitForm = async (event: any) => {
    event.preventDefault();
    await dispatch(loginAsGuest(player)).unwrap();
    navigate('/home/rooms');
  }

  const handleAvatarSelect = (direction: string) => {
    let index = avatarIndex;

    if (direction === "left") {
      if (index > 0) index--;
      else index = avatarArray.length - 1;
    } 
    else if (direction === "right") {
      if (index < avatarArray.length - 1) index++;
      else index = 0;
    }

    setAvatarIndex(index);
    setPlayer({ ...player, avatar: avatarArray[index] });
  }

  return (
    <div id="loginContainer">
      <form>
        <input 
          id="inputName" 
          type="text" 
          autoComplete="off" 
          placeholder="Enter your name" 
          onChange={ event => setPlayer({ ...player, name: event.target.value }) }
        />
        
        <div className="rabbit-select-container">
          <i 
            className="arrow rabbit-select-left fa fa-angle-left fa-2x" 
            onClick={ () => handleAvatarSelect("left") }>
          </i>
          
          <div className="img-container">
            <img src={ avatarArray[avatarIndex] } alt=''/>
          </div>

          <i 
            className="arrow rabbit-select-right fa fa-angle-right fa-2x" 
            onClick={ () => handleAvatarSelect("right") }>
          </i> 
        </div>

        <button id="joinGameBtn" className="btn" onClick={ submitForm }>Let's Play</button>
      </form>
    </div>
  )
};

export default LoginPage;

