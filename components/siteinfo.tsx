import React, { useEffect, useState } from 'react'

// redux
import { useSelector, useDispatch } from 'react-redux'
import { afshanEnergy,PowerReducer,oilReducer,woodReducer,waterReducer, setInitialValues } from '@/features/siteInfoSlice'
import { RootState } from '@/store'
import { current } from '@reduxjs/toolkit'


interface siteInfoProps {
    energy: number | null,
    power: number | null,
    oil: number | null,
    wood: number | null,
    water: number | null,
}

const SiteInfoTable:React.FC<siteInfoProps> = ({energy,power,oil,wood,water}) => {


    const dispatch = useDispatch()


    const energyReduxValue = useSelector((state: RootState) => state.siteInfoSlice.energy)
    const powerReduxValue = useSelector((state: RootState) => state.siteInfoSlice.power)
    const oilReduxValue = useSelector((state: RootState) => state.siteInfoSlice.oil)
    const woodReduxValue = useSelector((state: RootState) => state.siteInfoSlice.wood)
    const waterReduxValue = useSelector((state: RootState) => state.siteInfoSlice.water)

    console.log("energyReduxValue", energyReduxValue)
    console.log("powerReduxValue", powerReduxValue)

    useEffect(() => {
        const fetchDataFromBackend = async () => {
            // Simulating fetching data from a backend
            const backendValues = await new Promise<siteInfoProps>((resolve) => {
                setTimeout(() => {
                    resolve({
                        energy: energy,
                        power: power,
                        oil: oil,
                        wood: wood,
                        water: water,
                    });
                }, 1000);
            });

            console.log("backend values", backendValues)
            // backend values ---> // {         object
            //     "energy": 56,
            //     "power": 78,
            //     "oil": 43,
            //     "wood": 14,
            //     "water": 96
            // }
    
            // Dispatch the action to set initial values only if they are null
            if (energyReduxValue === null && powerReduxValue === null && oilReduxValue === null && woodReduxValue === null && waterReduxValue === null) {
                dispatch(setInitialValues(backendValues));
            }
        };
    
        fetchDataFromBackend();
    }, [dispatch, energyReduxValue, powerReduxValue, oilReduxValue, woodReduxValue, waterReduxValue]);
    

    // const handleInputChange = (e: React.FocusEvent<HTMLTableCellElement>) => {
    //     const target = e.target as HTMLTableCellElement; // Type assertion
    //     dispatch(setUserTableName(target.innerText)); // Use innerText for contentEditable
    // };

    const handleEnergyChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
      
        dispatch(afshanEnergy(value))
    }
    const handlePowerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
       
        dispatch(PowerReducer(value))
    }
    const handleOilChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
        
        dispatch(oilReducer(value))
    }
    const handleWoodChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
       
        dispatch(woodReducer(value))
    }
    const handleWaterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(e.target.value);
       
        dispatch(waterReducer(value))
    }

    // btn function
    const handleSiteBtn = () => {
        console.log("API VALUES: ", energyReduxValue,powerReduxValue,oilReduxValue,woodReduxValue,waterReduxValue)
    }

   

  return (
    <div className='w-full flex flex-col gap-4 bg-slate-200 p-8'>
      <table className='border border-gray-400 w-[400px] bg-slate-100'>
        {/* table header */}
        <tr className='border border-gray-400'>
            <th className='px-5  py-3 text-start border border-gray-400'>Paramters</th>
            <th className='px-5  py-3 text-start'>Values</th>
        </tr>
        {/* table body */}
        <tr className='border border-gray-400'>
            <td className='px-5  py-3 w-1/2 border border-gray-400' >Energy</td>
            {/* <td contentEditable onBlur={handleEnergyChange} className='px-3  py-3' >{energyReduxValue}</td> */}
            <td className='px-5 py-3 border-gray-400'>
                <input
                    type="number"
                    value={energyReduxValue || ''}
                    // value={energyValue || ''}
                    onChange={handleEnergyChange}
                    className='w-full px-3 py-2 border rounded-xl bg-white outline-none'
                />
            </td>
        </tr>
        <tr className='border border-gray-400'>
            <td className='px-5  py-3 w-1/2 border border-gray-400'>Power</td>
            <td className='px-5 py-3'>
                <input
                    type="number"
                    value={powerReduxValue|| ''}
                    // value={powerValue|| ''}
                    onChange={handlePowerChange}
                    className='w-full  px-3 py-2 border rounded-xl bg-white outline-none'
                />
            </td>
        </tr>
        <tr className='border border-gray-400'>
            <td className='px-5  py-3 w-1/2 border border-gray-400'>Oil</td>
            <td className='px-5 py-3'>
                <input
                    type="number"
                    value={oilReduxValue || ''}
                    onChange={handleOilChange}
                    className='w-full px-3 py-2 border rounded-xl bg-white outline-none'
                />
            </td>
        </tr>
        <tr className='border border-gray-400'>
            <td className='px-5  py-3 w-1/2 border border-gray-400'>Wood</td>
            <td className='px-5 py-3'>
                <input
                    type="number"
                    value={woodReduxValue || ''}
                    onChange={handleWoodChange}
                    className='w-full px-3 py-2 border rounded-xl bg-white outline-none'
                />
            </td>
        </tr>
        <tr className='border border-gray-400'>
            <td className='px-5  py-3 w-1/2 border border-gray-400'>Water</td>
            <td className='px-5 py-3'>
                <input
                    type="number"
                    value={waterReduxValue || ''}
                    // value={waterReduxValue ? waterReduxValue :  water || ''}
                    onChange={handleWaterChange}
                    className='w-full px-3 py-2 border rounded-xl bg-white outline-none'
                />
            </td>
        </tr>
      </table>
      <button onClick={handleSiteBtn} className='p-2 w-[200px] bg-blue-600 hover:bg-blue-500 border rounded-xl text-white font-semibold mt-4'>Submit Data</button>
    </div>
  )
}

export default SiteInfoTable
