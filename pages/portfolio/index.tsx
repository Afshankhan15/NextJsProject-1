import React, { useEffect } from 'react'
import DefaultLayout from '@/layouts/default'
import hero1 from '@/public/hero1.png'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { RootState } from '@/store'

import HeroComponenent from '@/components/hero'
import CopyData from '@/components/copydata'
import FeatureComponenent from '@/components/features'
import Footer from '@/components/footer'
import TeamComponent from '@/components/teams'
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
        <HeroComponenent />
        {/* <CopyData /> */}
        <FeatureComponenent/>
        <TeamComponent />
        {/* <Footer /> */}
    </DefaultLayout>
  )
}

export default PortfolioPage