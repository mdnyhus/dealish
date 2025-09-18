import React from 'react';
import Header from './Header';

interface PageContainerProps {
  children: React.ReactNode;
}

export default function PageContainer({children}: PageContainerProps) {
  return (
    <div className='flex flex-col min-h-screen bg-white text-blue-500'>
      <Header />
      <main className='flex-1 flex flex-col items-center justify-center px-4'>
        <div className='w-full max-w-md flex flex-col items-center space-y-4'>
          {children}
        </div>
      </main>
    </div>
  );
}
