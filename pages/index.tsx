import React, { useState } from 'react'
import DefaultLayout from '@/layouts/default'
import evrenLogo from "@/public/logo-light.png"
import HulLogo from "@/public/hul-light.svg"
import Image from 'next/image'
import clsx from 'clsx'
import { div } from 'framer-motion/client'
const HomePage = () => {

  const [isSend, setIsSend] = useState(false)
  return (
    <DefaultLayout>
     <div className='w-full flex flex-col items-center gap-8 px-6'>
     
     <div className='flex w-full max-w-[800px] items-center'>
      <div className='w-1/2'><Image src={evrenLogo} alt='Logo'/></div>
      <div className='w-1/2'><Image src={HulLogo} alt='Logo' /></div>
     </div>

     <h1 className='text-3xl px-4 sm:text-4xl md:text-5xl font-semibold text-center'>Demand Management Interface</h1>

     <p className='text-2xl text-center text-gray-600 px-4'>Transition Sustainable One Private Limited</p>

     {/*card  */}
     <div className='w-full max-w-[450px] flex flex-col gap-2 rounded shadow-md py-6 px-8'>
      <p className='text-sm text-gray-700 font-bold'>Email</p>
      <input type="text" 
      placeholder='Email'
      className='px-3 py-1 border rounded shadow outline-none'/>
      <button onClick={() => setIsSend(!isSend)} 
      className={clsx(
        'w-[120px] bg-blue-500 text-white font-semibold border rounded-md py-2 mt-4',
       isSend ? '' : 'opacity-50 cursor-not-allowed'
  )}
      >
        {/* Send Code */}
        {isSend ? 'Send Code' : 'Processing...'}
      </button>
      
      {/* after send enabaled OTP */}
      {!isSend && (
        <div> 
          <p className='text-gray-700 font-semibold my-2'>Enter 4-digit Code</p>
       <div className='flex justify-between'>
        <input className='border rounded-md w-12 h-12 outline-blue-600 py-2 text-center text-xl text-gray-700' 
        type="text"
        maxLength={1}
        inputMode='numeric'
        autoComplete='one-time-code'
        pattern='\d{1}'
        onKeyDown={(e) => {
          if (!/[0-9]/.test(e.key) && e.key !== 'Backspace') {
            e.preventDefault(); // Only allow numbers and Backspace
          }
        }}
        onInput={(e) => {
          const input = e.target as HTMLInputElement; // Explicitly cast to HTMLInputElement
          if (input.value && input.nextElementSibling) {
            (input.nextElementSibling as HTMLInputElement).focus(); // Move to next input
          }
        }}
         />
        <input className='border rounded-md w-12 h-12 outline-blue-600 py-2 text-center text-xl text-gray-700' 
        type="text"
        maxLength={1}
        inputMode='numeric'
        autoComplete='one-time-code'
        pattern='\d{1}'
        onInput={(e) => {
          const input = e.target as HTMLInputElement; // Explicitly cast to HTMLInputElement
          if (input.value && input.nextElementSibling) {
            (input.nextElementSibling as HTMLInputElement).focus(); // Move to next input
          }
        }}
         />
         <input className='border rounded-md w-12 h-12 outline-blue-600 py-2 text-center text-xl text-gray-700' 
        type="text"
        maxLength={1}
        inputMode='numeric'
        autoComplete='one-time-code'
        pattern='\d{1}'
        onInput={(e) => {
          const input = e.target as HTMLInputElement; // Explicitly cast to HTMLInputElement
          if (input.value && input.nextElementSibling) {
            (input.nextElementSibling as HTMLInputElement).focus(); // Move to next input
          }
        }}
         />
         <input className='border rounded-md w-12 h-12 outline-blue-600 py-2 text-center text-xl text-gray-700' 
        type="text"
        maxLength={1}
        inputMode='numeric'
        autoComplete='one-time-code'
        pattern='\d{1}'
        
        onInput={(e) => {
          const input = e.target as HTMLInputElement; // Explicitly cast to HTMLInputElement
          if (input.value && input.nextElementSibling) {
            (input.nextElementSibling as HTMLInputElement).focus(); // Move to next input
          }
        }}
         />
       </div>
       <button className='w-[120px] bg-blue-500 text-white font-semibold border rounded-md py-2 mt-4'>Login</button>
        </div>
      )}
     </div>
    


     </div>
    </DefaultLayout>
  )
}

export default HomePage