import React, { useState } from 'react'
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DoneIcon from '@mui/icons-material/Done';
import Tooltip from '@mui/material/Tooltip';

const CopyData = () => {
    const [isCopy, setIsCopy] = useState<boolean>(false)
    const [storeText, setStoreText] = useState<string>('')
    // const handleCopy = () => {
    //     setIsCopy(!isCopy)
    // }
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(storeText);
            setIsCopy(true);
            setTimeout(() => setIsCopy(false), 2000); // Reset after 2 seconds
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };
  return (
    <div className='w-full bg-yellow-50 py-16 px-16'>
        <div className='max-w-3xl mx-auto flex bg-white p-1 gap-8'>
         <input
         value={storeText}
         onChange={(e) => setStoreText(e.target.value)}
        //  onCopy={(e) => setStoreText(e.target.value)}
         className='py-1 px-3 border-black border rounded-md text-xl text-gray-800 font-medium'
        type="text" />
       <Tooltip title="Copy Content" arrow placement="top">
       <button
        onClick={handleCopy}
        className='bg-slate-300 hover:bg-slate-200 font-semibold py-1 px-3 border rounded-md'>
            {!isCopy ? <ContentCopyIcon /> : <DoneIcon />}
        </button>
       </Tooltip>
        </div>
      
    </div>
  )
}

export default CopyData
