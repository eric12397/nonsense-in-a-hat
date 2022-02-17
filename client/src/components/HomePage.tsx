import React from 'react';
import SideNav from './SideNav';
import MainContent from './MainContent';

const HomePage = () => {
  // TODO: components to add - RoomList, RoomItem, SideMenu
  return (
    <div className='flex container mx-auto h-2/3 w-3/4 rounded-xl bg-silver shadow-lg'>
      <SideNav></SideNav>
      <MainContent></MainContent>
    </div>
  );
};

export default HomePage;
