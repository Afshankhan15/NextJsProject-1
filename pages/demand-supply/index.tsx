import React, { useState } from 'react'
import DefaultLayout from '@/layouts/default'
import { useSelector, useDispatch } from 'react-redux'
// import { setMessage, clearMessage } from '@/features/chatSlice'
import { setMessage, printMessage } from '@/features/chatSlice'
import type { RootState } from '@/store'
const DemandSupplyPage = () => {

    // const message = useSelector((state: RootState) => state.chat.message);
    const dispatch = useDispatch();
    const msg = useSelector((state: RootState) => state.chat.message) // reducer
    
    console.log("redux 2 msg", msg)
  
    // const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    //   dispatch(setMessage(e.target.value));
    // };
  
    // const handleClear = () => {
    //   dispatch(clearMessage());
    // };

    // console.log("redux message", message)

    const [plant, setPlant] = useState<string>('')
    const [date, setDate] = useState<string>()
    const [chat, setChat] = useState<string>()

    const PlantList = [
        {
            "plant_id": 6011,
            "plant_name": "AS_HUL_Doomdooma 1+2"
        },
        {
            "plant_id": 6012,
            "plant_name": "DNH_HUL_Amli"
        },
        {
            "plant_id": 6013,
            "plant_name": "UK_HUL_Haridwar"
        },
        {
            "plant_id": 6014,
            "plant_name": "GJ_UIEL_Kandla"
        },
        {
            "plant_id": 6015,
            "plant_name": "DNH_HUL_Dapada"
        },
        {
            "plant_id": 6016,
            "plant_name": "MP_HUL_Chhindwara"
        },
        {
            "plant_id": 6017,
            "plant_name": "MH_HUL_Chiplun"
        },
        {
            "plant_id": 6018,
            "plant_name": "PED_HUL_Pondicherry 2"
        },
        {
            "plant_id": 6019,
            "plant_name": "UP_HUL_SumerpurHUL"
        },
        {
            "plant_id": 6020,
            "plant_name": "UP_UIL_SumerpurUIL"
        },
    ]

    const handlefetch = () => {
        console.log("fetch res", plant, date)
    }
  return (
   <DefaultLayout>
        <div className='flex flex-col gap-8 p-4'>
        {/* 1st div */}
        <div className='flex flex-col sm:flex-row bg-purple-300 p-2 gap-4'>
            {/* card 1 */}
            <div className='w-full sm:w-1/2 flex flex-col gap-4 p-3 bg-white border rounded-md shadow-md'>
                <select
                className='px-3 py-3 border rounded-small cursor-pointer outline-none bg-indigo-50 text-gray-700'
                onChange={(e) => setPlant(e.target.value)}
                >
                    {
                        PlantList.map((plant) => (
                            <option key={plant.plant_id} className='bg-white cursor-pointer'>{plant.plant_name}</option>
                        ))
                    }
                    
                </select>
                <input
                className='px-3 py-3 border rounded-small outline-none bg-indigo-50'
                type="date" 
                onChange={(e) => setDate(e.target.value)}
                />
                <button onClick={handlefetch} className='bg-blue-600 py-2 border rounded-lg text-white font-medium text-xs'>Fetch Demands</button>
                
            </div>
            {/* card 2 */}
            <div className='w-full sm:w-1/2 flex flex-col gap-4 p-3 bg-white border rounded-md shadow-md'>
            <h1 className='font-semibold text-xl'>{plant}</h1>
            <p className='font-semibold'>Date: <span className='font-normal'>{date}</span></p>
            <p className='font-semibold'>Status: <span className='font-normal'>Error</span></p>
            <button className='bg-purple-600 py-2 border rounded-lg text-white font-medium text-xs'>Download Excel</button>
            </div>
        </div>
        {/* 2nd div ---> chat div */}
        <div className='w-full sm:max-w-[700px] mx-auto flex flex-col gap-4 p-4 bg-white border rounded-md shadow-md'>
            <p className='bg-black text-center font-semibold px-3 py-2 border rounded-md text-green-400'>WhatsApp</p>
            <div className='p-3 bg-blue-200 border rounded'>
            <textarea 
            className='max-h-64 min-h-64 w-full outline-none p-3 overflow-auto bg-blue-200'
            // onChange={(e) => setChat(e.target.value)}
            // value={message}
            // onChange={handleChange}
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => dispatch(setMessage(e.target.value))}
            value={msg}
            placeholder="Type your message here..."
            />
            </div>
            <button
             onClick={() => dispatch(printMessage())}
             className='bg-blue-600 py-2 border rounded-lg text-white font-medium text-xs'>Send</button>
        </div>
        </div>
   </DefaultLayout>
  )
}

export default DemandSupplyPage
