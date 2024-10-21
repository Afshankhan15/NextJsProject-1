import React from 'react'
import Navbar from '@/components/navbar'
const DefaultLayout: React.FC<{ children: React.ReactNode}> = ({children}) => {
  return (
    <div className='flex flex-col w-full min-h-screen'>
        <Navbar />
        <main>{children}</main>
        <footer className='flex justify-center items-center py-3'>
          <p className='text-md text-gray-600'>Powered by {" "}
            <span className='text-blue-800'>Quadrical AI</span>
          </p>
        </footer>
    </div>
  )
}

export default DefaultLayout