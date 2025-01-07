import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ring from './Ring (2).png';
import bg from './bg.png';
import { ref, set } from 'firebase/database';
import { database } from './Firebase';

const AddTask = ({ addTask }) => {
    const [task, setTask] = useState('');
    const [category, setCategory] = useState('');
    const [createdAt, setCreatedAt] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (task.trim() && category.trim() && createdAt.trim() && deadline.trim()) {
            const newTask = {
                id: Date.now(),
                task,
                category,
                createdAt,
                deadline,
                completed: false
            };

            const newTaskRef = ref(database, 'tasks/' + newTask.id);
            set(newTaskRef, newTask)
                .then(() => {
                    setTask('');
                    setCategory('');
                    setCreatedAt('');
                    setDeadline('');
                    alert("Task added successfully!");
                })
                .catch((error) => {
                    alert("Failed to add task: " + error.message);
                });
        } else {
            alert("Please fill out all fields!");
        }
    };

    return (
        <form onSubmit={handleSubmit} className="relative flex flex-col items-center justify-start mb-4 text-yellow-900 bg-yellow-200 w-screen h-screen">
            <img src={bg} alt="bg" className="absolute z-0 w-full h-full"></img>
            <img src={ring} alt='ring' className='absolute z-20 w-28 mr-96 mt-14'></img>
            <img src={ring} alt='ring' className='absolute z-20 w-28 mr-96 mt-52'></img>
            <div className='bg-yellow-400 z-10 flex flex-col items-center justify-center mt-10 w-96 rounded-tl-2xl rounded-br-2xl'>
                <div className="mb-2 w-72 ml-3 mt-10 font-poppins">
                    <label className="block text-sm font-medium mb-1">Task Name</label>
                    <input
                        type="text"
                        placeholder="Enter task name"
                        value={task}
                        onChange={(e) => setTask(e.target.value)}
                        className="border border-yellow-800 rounded p-2 w-full"
                    />
                </div>

                <div className="mb-2 w-72 ml-3 mt-5 font-poppins">
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <input
                        type="text"
                        placeholder="Enter category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="border border-yellow-800 rounded p-2 w-full"
                    />
                </div>

                <div className="mb-2 w-72 ml-3 mt-5 font-poppins">
                    <label className="block text-sm font-medium mb-1">Created at</label>
                    <input
                        type="date"
                        value={createdAt}
                        onChange={(e) => setCreatedAt(e.target.value)}
                        className="border border-yellow-800 rounded p-2 w-full"
                    />
                </div>

                <div className="mb-2 w-72 ml-3 mt-5 font-poppins">
                    <label className="block text-sm font-medium mb-1">Deadline</label>
                    <input
                        type="date"
                        value={deadline}
                        onChange={(e) => setDeadline(e.target.value)}
                        className="border border-yellow-800 rounded p-2 w-full"
                    />
                </div>

                <button 
                    type="submit" 
                    disabled={!task.trim() || !category.trim() || !createdAt.trim() || !deadline.trim()}
                    className={`px-4 py-2 rounded-2xl w-40 mt-5 text-white ${
                        task.trim() && category.trim() && createdAt.trim() && deadline.trim()
                            ? "bg-yellow-800 hover:bg-yellow-600"
                            : "bg-gray-400 cursor-not-allowed"
                    }`}>
                    Submit
                </button>

                <Link to='/TaskList'>
                    <button className="bg-yellow-800 hover:bg-yellow-600 font-poppins text-white px-4 py-2 rounded-2xl w-40 mt-5 mb-10">
                        Cancel
                    </button>
                </Link>
            </div>
        </form>
    );
};

export default AddTask;
