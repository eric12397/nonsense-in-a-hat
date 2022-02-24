import React from 'react';
import { Outlet, Link } from 'react-router-dom';

const MainContent = () => {
  return (
    <div className='w-4/5 p-6'>
      <div className='mb-5'>
        <h1 className='text-2xl font-extrabold'>Play Now</h1>
      </div>

      <nav className='mb-5'>
        <ul className='flex space-x-5'>
          <Link to="rooms"><li>Join Room</li></Link>
          <Link to="rooms/host"><li>Host Room</li></Link>
        </ul>
      </nav>

      <Outlet />
    </div>
  )
};

export default MainContent;
