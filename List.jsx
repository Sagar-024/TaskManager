import React from 'react'
import DoneOutlineIcon from '@mui/icons-material/DoneOutline';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
function List({ name , onDelete  , id  , completed , onEdit }) {
    const helper= ()=>{
         onDelete(id)
    }
    const helper2 = ()=>{
      onEdit(id);
    }
  return (
    <div className="flex items-center justify-between bg-white p-4 rounded-lg shadow-lg border border-gray-300 w-full max-w-4xl mx-auto my-4">
    {/* Status Icon */}
    <div className="w-12 h-12 flex items-center justify-center bg-lime-300 rounded-full mr-4">
      {completed ? <DoneOutlineIcon className="text-green-500" /> : <CloseRoundedIcon className="text-red-500" />}
    </div>
  
    {/* Task Name */}
    <div className="flex-1">
      <h2 className="text-xl font-semibold text-gray-900 break-words">
        {name}
      </h2>
    </div>
  
    {/* Buttons */}
    <div className="flex items-center space-x-2">
      <button
        className="bg-red-500 text-white text-sm font-bold py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300"
        onClick={helper}
      >
        Delete
      </button>
      <button
        className="bg-blue-500 text-white text-sm font-bold py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
        onClick={helper2}
      >
        Edit
      </button>
    </div>
  </div>
  
  

  )
}

export default List