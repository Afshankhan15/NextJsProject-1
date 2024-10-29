import React from 'react'
import DefaultLayout from '@/layouts/default'
import LeaderboardIcon from '@mui/icons-material/Leaderboard';
import AddIcCallIcon from '@mui/icons-material/AddIcCall';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts';
import { PieChart } from '@mui/x-charts';
const ContactPage = () => {
  const cardsArray = [
    {profit: 30, price: 4.510, tag: "Item Sales", icon: <LeaderboardIcon />, color: 'text-blue-500',bg:'bg-red-500'},
    {profit: 30, price: 4.510, tag: "Item Sales", icon: <AddIcCallIcon />, color: 'text-green-500',bg:'bg-pink-500'},
    {profit: 30, price: 4.510, tag: "Item Sales", icon: <AddShoppingCartIcon/>, color: 'text-red-500',bg:'bg-blue-500'},
    {profit: 30, price: 4.510, tag: "Item Sales", icon: <AccountBalanceIcon/>, color:'text-pink-500',bg:'bg-purple-500'},
  ]
  return (
    <DefaultLayout>
       <div className='w-full flex flex-col'>
          {/* 1st component */}
          <div className='max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 my-6 gap-10'>
            {/* card1 */}
           {cardsArray.map((item, idx) => (
             <div key={idx} 
             className='flex flex-col gap-2 border rounded-2xl shadow-xl p-4 w-[12rem]'>
             <div className='flex justify-between items-center'>
              <p className={`${item.color}`}>
               {item.icon}
              </p>
              <p className={`py-1 px-2 border rounded-2xl ${item.bg} text-white font-semibold`}>{item.profit}%</p>
             </div>
             <h1 className='font-semibold text-2xl'>{item.price}</h1>
             <p className='text-gray-600'>{item.tag}</p>
          </div>
           ))}
          </div>
          {/* 2nd component */}
          <div className='w-full bg-green max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 p-8'>
            <div className='border rounded-md shadow-md p-3 w-full bg-slate-100'>
            {/* <LineChart
  xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
  series={[
    {
      data: [2, 5.5, 2, 8.5, 1.5, 5],
    },
  ]}
  // width={500}
  height={300}
/> */}
<PieChart
  colors={['red', 'blue', 'green','pink','purple','orange']} // Use palette
  series={[
    {
      data: [
        { value: 10, color: 'red' }, // Use color property
        { value: 145, color: 'blue' }, // Use color property
        { value: 7, color: 'green' }, // Use color property
        { value: 5, color: 'pink' }, // Use color property
        { value: 77, color: 'purple' }, // Use color property
        { value: 47, color: 'orange' }, // Use color property
        
        // ...
      ],
    },
  ]}
/>
            </div>
            <div className='border rounded-md shadow-md p-3 w-full bg-yellow-300'>
            <BarChart
      series={[
        { data: [35, 44, 24, 34] },
        { data: [51, 6, 49, 30] },
        { data: [15, 25, 30, 50] },
        { data: [60, 50, 15, 25] },
      ]}
      height={300}
      xAxis={[{ data: ['Q1', 'Q2', 'Q3', 'Q4'], scaleType: 'band' }]}
      margin={{ top: 10, bottom: 30, left: 40, right: 10 }}
    />
            </div>
          </div>
       </div>
    </DefaultLayout>
  )
}

export default ContactPage