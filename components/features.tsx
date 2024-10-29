import React from 'react'
import SettingsSuggestIcon from '@mui/icons-material/SettingsSuggest';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import SensorOccupiedIcon from '@mui/icons-material/SensorOccupied';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import EuroIcon from '@mui/icons-material/Euro';
const FeatureComponenent = () => {
  const featureList = [
    {title: "Customizable", text:"You don't need to be an expert to customize this plugin. Our code is very readable and well documented.", icon: <SettingsSuggestIcon />},
    {title: "Fully Responsive", text:"With mobile, tablet & desktop support it doesn't matter what device you're using. This plugin is responsive in all browsers.", icon: <TipsAndUpdatesIcon />},
    {title: "Fully Responsive", text:"With mobile, tablet & desktop support it doesn't matter what device you're using. This plugin is responsive in all browsers.", icon: <SensorOccupiedIcon />},
    {title: "Fully Responsive", text:"With mobile, tablet & desktop support it doesn't matter what device you're using. This plugin is responsive in all browsers.", icon: <AcUnitIcon />},
    {title: "Fully Responsive", text:"With mobile, tablet & desktop support it doesn't matter what device you're using. This plugin is responsive in all browsers.", icon: <LocalDiningIcon />},
    {title: "Fully Responsive", text:"With mobile, tablet & desktop support it doesn't matter what device you're using. This plugin is responsive in all browsers.", icon: <EuroIcon />},
  ]
  return (
    <div className='w-full my-16'>
      <div className='max-w-7xl mx-auto flex flex-col gap-4'>
        <h1 className='text-2xl font-semibold text-center'>Features you'll love</h1>
        <p className='text-gray-500 text-center text-lg px-8'>A responsive documentation template built for everyone who wants to create a plugin</p>
        <div className='grid grid-cols-1 lg:grid-cols-2 p-8'>
          {/* list */}
         {
          featureList.map((item, idx) => (
            <div key={idx} className='flex gap-4 py-6 px-2 lg:px-6 cursor-pointer'>
            <p className='text-purple-600 flex'><span className='bg-slate-100 border rounded-full p-2 h-10 justify-center items-center'>{item.icon}</span></p>
              
              <div className='flex flex-col gap-4'>
                <h1 className='text-2xl font-semibold'>{item.title}</h1>
                <p className='text-gray-600 text-xl'>{item.text}</p>
              </div>
             
            </div>
          ))
         }
        </div>
      </div>
    </div>
  )
}

export default FeatureComponenent
