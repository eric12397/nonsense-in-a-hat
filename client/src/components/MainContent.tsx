import React from 'react';
import { Route, Routes } from 'react-router-dom';
import RoomsList from '../features/room/components/RoomsList';

const MainContent = () => {
  return (
    <div className='w-4/5 p-6'>
      <div className='mb-5'>
        <h1 className='text-2xl font-extrabold'>Play Now</h1>
      </div>

      <nav className='mb-5'>
        <ul className='flex space-x-5'>
          <li>Join Public Room</li>
        </ul>
      </nav>

      <RoomsList />
    </div>
  )
};

export default MainContent;
