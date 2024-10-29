import React from 'react'
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import ErrorSVG from '../public/error.svg'
import Image from 'next/image';
import NextLink from 'next/link'
const NotFoundPage = () => {
  return (
    <div className='w-full flex flex-col gap-6 my-5 md:my-10 px-4 '>
      <div className='flex justify-center items-center'>
      <Image src={ErrorSVG} alt='error' />
      </div>
      <h1 className='text-2xl sm:text-3xl font-semibold text-center '>Sorry, the page can’t be found</h1>
      <p className='text-gray-500 text-center text-lg sm:text-xl max-w-[31rem] mx-auto'>The page you were looking for appears to have been moved, deleted or does not exist.</p>
      <div className='flex justify-center'>
        <NextLink href='/'>
      <button className='flex gap-2 justify-center items-center bg-blue-700 hover:bg-blue-600 text-white px-4 py-4 border rounded-xl w-[200px] text-xl font-semibold'>
        <span><KeyboardBackspaceIcon /></span>
       <p>Back to Home</p>
      </button>
      </NextLink>
      </div>
    </div>
  )
}

export default NotFoundPage
