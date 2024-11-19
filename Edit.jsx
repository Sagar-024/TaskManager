import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Edit() {
  const { id } = useParams(); // Get ID from URL

  const [allInformation, setAllInformation] = useState({
    task: "",
    taskid: "",
    status: false,
  });

  const [loading, setLoading] = useState(false); // Loading state
  const [message, setMessage] = useState(""); // Success/Error message state

 const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setAllInformation((prevState) => ({
      ...prevState,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle form submission (Update Task)
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading true when submitting

    try {
      
      await axios.patch(`http://localhost:1000/tasks/${id}`, {
        name: allInformation.task,
        completed: allInformation.status,
      });
      setMessage("Task updated successfully!");
      setTimeout(() => setMessage(""), 3000); // Clear message after 3 seconds
    } catch (error) {
      console.error("Error updating task:", error);
      setMessage("Error updating task. Please try again.");
      setTimeout(() => setMessage(""), 3000); // Clear error message after 3 seconds
    } finally {
      setLoading(false); // Reset loading state after the request is complete
    }
  };

  // Fetch task data on component mount (or when `id` changes)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:1000/tasks/${id}`);
        const { name, _id, completed } = response.data.specifictask;

        setAllInformation({
          task: name,
          taskid: _id,
          status: completed,
        });
      } catch (error) {
        console.error("Error fetching task:", error);
      }
    };

    fetchData(); // Fetch task data when component mounts
  }, [id]);

  return (
    <div>
      <h1>Edit Task</h1>
      <form
        onSubmit={handleFormSubmit}
        className="bg-gray-800 flex items-center w-1/2 mx-auto my-10 rounded-md max-w-100 flex-col py-0"
      >
        <h1 className="text-5xl m-3 text-lime-400 font-bold italic mt-12">
          Edit the task
        </h1>

        {/* Input for Task Name */}
        <input
          className="w-3/4 text-xl py-5 px-3 border-none rounded-md outline-none my-auto"
          type="text"
          name="task"
          placeholder="Enter your task"
          value={allInformation.task}
          onChange={handleChange}
        />

        {/* Input for Task ID (Read-only) */}
        <input
          className="w-3/4 text-xl py-5 px-3 border-none rounded-md outline-none my-2"
          type="text"
          name="taskid"
          value={allInformation.taskid}
          readOnly // Task ID should not be editable
        />

        {/* Checkbox for Status */}
        <label  className="text-2xl italic text-lime-500">
          <input
            type="checkbox"
            name="status"
            checked={allInformation.status}
            onChange={handleChange}
            className="scale-150 mr-2"
          />
          Mark as Completed
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded mt-4 hover:bg-blue-700 transition duration-300"
        >
          {loading ? "Updating..." : "Update Task"} {/* Show 'Updating...' when loading */}
        </button>

        {/* Display success or error message */}
        {message && (
          <div className="mt-4 text-center text-xl text-green-500">
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

export default Edit;
