import React, { useEffect } from 'react'
import DefaultLayout from '@/layouts/default'
import hero1 from '@/public/hero1.png'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'
const PortfolioPage = () => {

    // extract chat messsage
    const msg = useSelector((state : RootState) => state.chat.message)
    // const msg = useSelector((state: RootState) => state.chat.message) // reducer

    const router = useRouter()
   
    // to extract data from previous page while navigatiting to same page (URL shows all query parameters)
    useEffect(() => {
        console.log("routing data", router.query, router.pathname)
    }, [router.query])
  return (
    <DefaultLayout>
        <div className='w-full flex flex-col'>
            {/*hero section  */}
            <div className='max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 p-12 bg-slate-300'>
                <div className='flex flex-col bg-green-300 p-6 gap-6'>
                    <h1>{msg}</h1>
                    <h1 className='text-5xl font-semibold'>Data Analytics<br /> <span className='text-blue-600'>And Science tech</span></h1>
                    <p className='text-gray-700 text-xl pr-12 bg-red-300'>Our team of experts in data analytics and science tech will help you make informed decisions </p>
                    <div className='flex gap-6'>
                    <button className='w-[120px] border rounded py-2 px-2 bg-blue-500'>Expolre</button>
                    <button className='w-[120px] border rounded py-2 px-2 bg-green-500'>Check Out</button>
                    </div>
                </div>
                <div className=' bg-yellow-200 flex p-6 md:p-12'>
                    <Image src={hero1} alt="hero1"/>
                </div>
            </div>
        </div>
    </DefaultLayout>
  )
}

export default PortfolioPage