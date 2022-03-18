import React from 'react';

interface SideBarProps {
  children: React.ReactNode
}

const SideBar = ({ children }: SideBarProps) => {
  return (
    <div className='w-1/5 rounded-l-xl bg-midnight'>
      { children }
    </div>
  )
};

export default SideBar;
