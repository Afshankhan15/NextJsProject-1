import { th, tr } from 'framer-motion/client'
import React, { useState } from 'react'
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Tooltip from '@mui/material/Tooltip';
import clsx from 'clsx'

import SearchIcon from '@mui/icons-material/Search';
import { table } from 'console';

// Define the data type
interface ReadingData {
    username: string;
    email: string;
    company: string;
    role: string;
    address: string;
    percentage: number;
}

const ReadingTable = () => {
    
    const readingData:ReadingData[] = [
        {username: "Afshan", email: "afshan@quadrical.ai", company: "Microsoft", role: "Software Developer", address: "Gurugram", percentage: 88},
        {username: "Vishal Arya", email: "vihal@quadrical.ai", company: "Quadrical AI", role: "Software Developer", address: "Gurugram", percentage: 98},
        {username: "Mahendra Singh Chauhan", email: "mahendra@quadrical.ai", company: "Quadrical AI", role: "Software Developer", address: "Gurugram", percentage: 78},
        {username: "Pulkit", email: "pulkit@quadrical.ai", company: "Quadrical AI", role: "Software Developer", address: "Gurugram", percentage: 56},
        {username: "Siddhant Tyagi", email: "siddhant@quadrical.ai", company: "Quadrical AI", role: "Software Developer", address: "Gurugram", percentage: 82},
    ]
    const tableHeader: string[] = ["UserName", "Email", "Company", "Role", "Address", "Percentage"]

    const [isSort, setSort] = useState<boolean>(false)

    // let sortpercentageArray: number[]
    const [percentageArray, setSortPercentageArray] = useState<number[]>([]);
    // const handlePercentage = () => {
    //     setSort(!isSort)
    //     const percentageArray = Array.from(readingData, ({percentage}) => percentage) // [ 88, 98, 78, 56, 82 ]
    //     const sortpercentageArray = percentageArray.sort((a,b) => a-b) // [ 56, 78, 82, 88, 98 ]
    //     // return sortpercentageArray
    //     setSortPercentageArray(sortpercentageArray)
    // }
    const [tableData, setTableData] = useState<ReadingData[]>(readingData)
    const handlePercentage = () => {
        setSort(!isSort)
        if(isSort) {
            const res = [...tableData]
            // sort array accn to percentage of users
            const sortUser = res.sort((a,b) => a.percentage - b.percentage)
            setTableData(sortUser)
        } else {
            setTableData(readingData)
        }
    }
    console.log("sorted array", percentageArray)

    // search function
    // let filterTable;
    // const handleSearch = (e:any) => {
    //     console.log("search",e.target.value)
    //     setTimeout(() => {
    //         // search table
    //         const search = e.target.value;
    //         const copyTable = [...tableData]
    //         console.log("copyTable",copyTable)
    //         // const filterTable = copyTable.filter((item) => {
    //         //     return Object.values(item).some((data) => data === search)
    //         // })
    //          // Filter the table data
    //     filterTable = copyTable.filter((item) => {
    //         return Object.values(item).some((data) => {
    //             // Check for matching strings (case insensitive)
    //             return typeof data === 'string' && data.toLowerCase() === search.toLowerCase();
    //         });
    //     });
    //         // setTableData(filterTable)
    //         console.log("filterTable",filterTable)
    //     },2000)
    // }
     // Search function
     const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const search = e.target.value.trim().toLowerCase();
       
    //    if search = '' --> empty string then it still give entire readingData array because empty string is [[[included]]] in all the string

        // readingData not tableData because tableData update when we pass filterData and readingData didn't chnage
        const filteredData = readingData.filter(item => 
            // search string only
            // Object.values(item).some(value => 
            //     typeof value === 'string' && value.toLowerCase().includes(search)
            // )

            // search string and number both
            Object.values(item).some(value => {
                if (typeof value === 'string') {
                    return value.toLowerCase().includes(search);
                } else if (typeof value === 'number') {
                    return value.toString().includes(search);
                }
                return false;
            })
        );
        console.log("filteredData",filteredData)
        setTableData(filteredData); // update tableData state 
    };

  return (
    <div className='w-full p-8 overflow-auto'>
        {/* search */}
        <div className='w-full flex justify-center py-4 my-8'>
            
            <p className='flex items-center relative left-10 text-gray-500'><SearchIcon style={{fontSize:"1.7rem"}}/></p>
            <input
             type="text" 
             placeholder='Search....'
             onChange={handleSearch}
             className='w-3/4 px-12 py-3 border rounded-lg outline-none text-gray-800 shadow'
             />
           
        </div>
        {/* table */}
        <table className='table-auto w-full'>
            {/* header */}
            <tr className='bg-slate-200'>
                {tableHeader.map((header, idx) => (
                    <th className='text-start px-3 py-3 '>
                        {header} 
                        {" "}
                        {header === 'Percentage' ? <span className='cursor-pointer text-blue-800' onClick={handlePercentage}><Tooltip placement='top' title="Sort Data">
                            {/* <ArrowUpwardIcon /> */}
                            {isSort ? <ArrowDownwardIcon /> : < ArrowUpwardIcon/>}
                            </Tooltip></span> : ''}
                        </th>
                ))}
            </tr>
            {/* body */}
            {
                // readingData.map((data, idx) => (
                tableData.map((data, idx) => (
                    <tr key={idx}
                    className={clsx(
                        // 'hover:bg-slate-200',
                        idx%2 ? 'bg-indigo-100' : 'bg-white'
                    )}
                    //  className='hover:bg-slate-100 transition-all ease-in-out'
                     >
                        <td className='px-3 py-3'>{data.username}</td>
                        <td className='px-3 py-3'>{data.email}</td>
                        <td className='px-3 py-3'>{data.company}</td>
                        <td className='px-3 py-3'>{data.role}</td>
                        <td className='px-3 py-3'>{data.address}</td>
                        <td className='px-3 py-3'>{data.percentage}</td>
                        {/* {
                        isSort
                        ? 
                        // percentageArray.map((element, i) => (
                        //     <td key={i} className='px-3 py-3'>{element}</td> 
                        // )) 
                        <td className='px-3 py-3'>{percentageArray[idx]}</td>
                        : 
                        <td className='px-3 py-3'>{data.percentage}</td>
                        } */}
                    </tr>
                ))
            }
        </table>
    </div>
  )
}

export default ReadingTable
