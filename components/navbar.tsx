import React, { useState } from 'react'
import Image from 'next/image'
import evren from '@/public/evren.png'
import NextLink from 'next/link'
import { usePathname } from 'next/navigation'
import clsx from 'clsx'
import { Button } from '@nextui-org/react'
import { NavbarLogo } from './icons/icons'
import {
    Navbar as NextUINavbar, 
    NavbarBrand, 
    NavbarContent, 
    NavbarItem, 
    NavbarMenuToggle,
    NavbarMenu,
    NavbarMenuItem
  } from "@nextui-org/navbar";

  import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faList,faBars,faX,faXmark} from '@fortawesome/free-solid-svg-icons'
const Navbar = () => {


    const pathname = usePathname()
    let [open, setOpen] =useState(false);

    const navItems = [
        {label: "Dasboard", href: "/"},
        {label: "Today's Demand", href: "/todays-demand"},
        {label: "Demand Uploader", href: "/dashboard"},
        {label: "Demand vs Supply", href: "/demand-supply"},
        {label: "Admin", href: "/portfolio"},
        {label: "Loss Config", href: "/loss-config"},
        {label: "Contact Us", href: "/contact"},
    ]
  return (
    <>
   <div className='w-full flex justify-center items-center shadow-md py-2 sticky top-0  backdrop-blur-3xl backdrop-saturate-150 bg-background/60 h-[4rem]'>
    <div className='flex flex-row gap-4 justify-between lg:justify-around items-center w-[97%]'>
   {/* <div className='w-full flex flex-row justify-between lg:justify-around items-center shadow-md pr-2 lg:pr-0'> */}
        {/* <div className='max-w-[120px] max-h-[5rem]'> */}
        {/* <div className='flex basis-[5rem]'>
            <Image src={evren} alt='logo' style={{maxWidth:"100%", maxHeight:"100%",objectFit:"cover"}} />
            
        </div> */}
        <Image className='object-cover w-28' src={evren} alt="logo" />
        
        {/*flex-grow --> it takes all space to the left of selected elemnt */}
        <ul className='hidden lg:flex flex-row xl:flex-grow-0 flex-grow gap-4 xl:gap-6 transition-all duration-500 ease-in-out'>
        {/* <ul className='hidden lg:flex flex-row flex-grow gap-4 xl:gap-6 transition-all duration-500 ease-in-out'> */}
            {navItems.map((item, idx) => (
                <NextLink
                className={clsx(
                    (pathname === item.href) ? 'text-blue-600' : 'text-gray-700' 
                )}
                href={item.href}>
                    <li className='xl:text-lg font-serif font-medium'>{item.label}</li>
                </NextLink>
            ))}
        </ul>

       
            {/* <button className='py-1 px-2 border rounded-md bg-blue-300 text-md text-gray-600'>Sign Up</button>  */}
            <Button className='hidden lg:flex' color='primary' variant='flat'  onClick={()=>setOpen(!open)} >Sign In</Button>
            <p className='flex lg:hidden text-xl' onClick={() => setOpen(!open)}>
              {open ? <FontAwesomeIcon icon={faX} /> : <FontAwesomeIcon icon={faBars} />}
            </p>
            
            
    </div>
   </div>
    {open && (
      <ul className='flex flex-col lg:hidden w-full bg-slate-100 top-[4rem] transition-all duration-400 ease-in-out'>
      {navItems.map((item, idx) => (
          <NextLink
          className={clsx(
              (pathname === item.href) ? 'text-blue-600' : 'text-gray-900' 
          )}
          href={item.href}>
              <li className='text-md font-serif font-medium border border-b-gray-300 py-3 px-4 hover:bg-slate-200 transition-all duration-100 ease-in'>{item.label}</li>
          </NextLink>
      ))}
      </ul>
    )}
    </>
  )
}

export default Navbar




