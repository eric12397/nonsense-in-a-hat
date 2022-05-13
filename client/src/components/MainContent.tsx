import React from 'react';

interface MainContentProps {
  children: React.ReactNode
}

const MainContent = ({ children }: MainContentProps) => {
  return (
    <div className='w-4/5 p-6'>
      { children }
    </div>
  )
};

export default MainContent;
