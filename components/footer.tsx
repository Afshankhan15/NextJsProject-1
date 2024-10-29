import { ul } from 'framer-motion/client'
import React from 'react'
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import TwitterIcon from '@mui/icons-material/Twitter';
const Footer = () => {
    const footerList = [
        {title: 'Services', tags: ['Web Development','Pricing','Support','Client Port']},
        {title: 'Platforms', tags: ['Web Development','Pricing','Support','Client Port']},
        {title: 'Company', tags: ['Web Development','Pricing','Support','Client Port']},
        {title: 'Additional', tags: ['Web Development','Pricing','Support','Client Port']},
    ]
  return (
    <div className='w-full bg-black text-white mt-8'>
        <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-8'>
            {
                footerList.map((item, idx) => (
                    <ul key={idx}>
                        <h1 className='text-xl font-semibold mb-4 mt-6 '>{item.title}</h1>
                        {item.tags.map((tag, i) => (
                            <li className='text-slate-300 cursor-pointer mt-4 text-lg hover:text-slate-100' key={i}>{tag}</li>
                        ))}
                    </ul>
                ))
            }
        </div>
        
        <hr />
        
        <div className='flex gap-8 py-6 justify-center items-center'>
            <p className='cursor-pointer text-pink-400'> <InstagramIcon style={{fontSize:"2rem"}}/></p>
            <p className='cursor-pointer text-blue-300'><LinkedInIcon style={{fontSize:"2rem"}}/></p>
            <p className='cursor-pointer text-green-400'><WhatsAppIcon style={{fontSize:"2rem"}}/></p>
            <p className='cursor-pointer text-blue-400'><TwitterIcon style={{fontSize:"2rem"}}/></p>
        </div>

        <p className='text-center pb-4 text-lg'>© AfshanKhan 2024. All rights reserved.</p>
      
    </div>
  )
}

export default Footer
