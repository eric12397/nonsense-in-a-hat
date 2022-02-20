import React, { useEffect } from 'react';
import SideNav from './SideNav';
import MainContent from './MainContent';
import { io } from "socket.io-client";

const HomePage = () => {

  // subscribe to ws after log in
  useEffect(() => {
    const socket = io("http://localhost:8000");
  }, [])
  
  return (
    <div className='flex container mx-auto h-2/3 w-3/4 rounded-xl bg-silver shadow-lg'>
      <SideNav></SideNav>
      <MainContent></MainContent>
    </div>
  );
};

export default HomePage;
