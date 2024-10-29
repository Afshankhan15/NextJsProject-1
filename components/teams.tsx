import React from 'react'
import Image from 'next/image'
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import afshanImage from '../public/afshan.jpg'
import johnImage from '../public/johncena.jpg'
import viratImage from '../public/virat.jpg'
const TeamComponent = () => {

  const teamArray = [
    {name: "Afshan Khan", role: "Software Engineer", image: afshanImage},
    {name: "Ali Khan", role: "Software Engineer", image: johnImage},
    {name: "Azhar Khan", role: "Software Engineer", image: viratImage}
  ]
  return (
    <div className='w-full my-8 flex flex-col'>
       <h1 className='text-3xl font-semibold text-center'>Team Members</h1>
        <div className='flex flex-wrap gap-8 py-12 px-12'>
            {/* team card */}
            {
              teamArray.map((item, idx) => (
                <div key={idx} className='w-[390px] mx-auto flex flex-col py-8 px-12 gap-2 bg-white border rounded-xl shadow-xl text-center justify-center items-center hover:scale-105 transition-all ease-in-out'>
                <div className='flex h-40 w-40 border rounded-full p-3  bg-slate-100'>
                <Image src={item.image} alt='afshan' className='border rounded-full object-contain'/>
                </div>
                <h1 className='text-xl font-semibold'>{item.name}</h1>
                <p className='text-gray-500'>{item.role}</p>
                <p className='text-gray-600 text-lg mt-4' >Eiusmod commodo aliquip laboris qui anim non voluptate consectetur.</p>
                <div className='flex gap-6 mt-4'>
                <p className='cursor-pointer p-2 bg-slate-200 border rounded-full hover:scale-110 transition-all ease-in-out'> <InstagramIcon style={{fontSize:"2rem"}}/></p>
            <p className='cursor-pointer p-2 bg-slate-200 border rounded-full hover:scale-110 transition-all ease-in-out'><LinkedInIcon style={{fontSize:"2rem"}}/></p>
            <p className='cursor-pointer p-2 bg-slate-200 border rounded-full hover:scale-110 transition-all ease-in-out'><WhatsAppIcon style={{fontSize:"2rem"}}/></p>
                </div>
            </div>
              ))
            }
        </div>
    </div>
  )
}

export default TeamComponent
