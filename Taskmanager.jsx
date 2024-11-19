import React, { useState, useEffect } from 'react'
import axios from 'axios';
import List from './List';
import { NavLink, useNavigate } from 'react-router-dom'; 
function Taskmanager() {
    const navigate = useNavigate(); 
    
    const [task, setTask] = useState(''); // State for the input field
    const [taskList, setTaskList] = useState([]); // State for the list of tasks
  
   
  
      const handleFormSubmit = async (e) => {
      e.preventDefault(); // Prevent the default form submission behavior
  
     
      
        const newtask = await axios.post('http://localhost:1000/tasks' , { name: task, completed : false})
        setTask(''); // Clear the input field
        fetchData();
  
      // If needed, uncomment the block below to send the task to the backend
      /*
      try {
        await axios.post('http://localhost:1000/tasks', { name: task, completed: false });
      } catch (error) {
        console.error('Error sending task:', error);
      }
      */
    };
    const handleDelete = (id) => {
      const task =  axios.delete( `http://localhost:1000/tasks/${id}` )
   
    };
    const onEdit = (id)=>{
        navigate(`/Edit/${id}`);
    }
    
  
  
     
    useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('http://localhost:1000/tasks');
          // Access the 'alltask' array from the response data
          setTaskList(response.data.alltask); // Set task list from the API response
          console.log(response.data.alltask); // Log the task list
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };
  
      fetchData(); // Fetch data when the component mounts
    }, [handleFormSubmit , handleDelete]); 
    const handleInputChange = (e) => {
      setTask(e.target.value); // Update task state with input value
    };
  
    return (
      <div>
        <form
          onSubmit={handleFormSubmit}
          className="bg-gray-800 flex items-center w-1/2 h-64 mx-auto my-10 rounded-md max-w-100 flex-col py-0"
        >
          <h1 className="text-5xl m-3 text-lime-400 font-bold italic mt-12 font-serif">Task Manager</h1>
  
          <input
            className="w-3/4 text-xl py-5 px-3 border-none rounded-md outline-none my-auto"
            type="text"
            placeholder="Enter your task"
            value={task}
            onChange={handleInputChange} // Update state when user types
          />
  
          <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hidden">
            Add Task
          </button>
        </form>
  
        <div className="flex flex-col items-center w-1/2 border-s-black mx-auto">
          {/* Directly rendering the task list here */}
          {taskList.map((obj) => (
            <List
              key={obj._id} // Use the unique _id as the key
              id={obj._id}
              completed={obj.completed}
              name={obj.name}
              onDelete={handleDelete}
              onEdit={onEdit}
            />
          ))}
        </div>
      </div>
    );
}

export default Taskmanager