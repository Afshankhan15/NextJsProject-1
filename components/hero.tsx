import { div } from 'framer-motion/client'
import React from 'react'
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
const HeroComponenent = () => {
  return (
    <div className='w-full bg-gradient-to-tr from-[#f2c3d7] to-[#c0bcf8] opacity-100'>
        <div className='max-w-3xl mx-auto flex flex-col py-32 sm:py-48 gap-4'>
        <h1 className='text-5xl sm:text-6xl md:text-7xl font-semibold text-center px-6 md:px-0'>Data to enrich your online business</h1>
        <p className='text-gray-700 text-xl md:text-2xl mt-4 text-center px-6 md:px-0'>Anim aute id magna aliqua ad ad non deserunt sunt. Qui irure qui lorem cupidatat commodo. Elit sunt amet fugiat veniam occaecat.</p>
        <div className='flex gap-4 mt-6 mx-auto'>
            <button className='bg-blue-700 hover:bg-blue-600 text-white border rounded-md px-4 py-2 font-semibold'>Get started</button>
            <button className='bg-slate-200 hover:bg-slate-100 text-black rounded-md px-4 py-2 font-semibold'>Learn more <span>< ArrowRightAltIcon/></span></button>
        </div>
    </div>
    </div>
  )
}

export default HeroComponenent
// 