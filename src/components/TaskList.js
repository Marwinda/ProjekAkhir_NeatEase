import React, { useEffect, useState } from "react";
import del from "./Del.png";
import edit from "./Editicon.webp";
import { Link } from "react-router-dom";
import EditTask from "./EditTask";
import bg from './bg.png';
import { ref, onValue, remove, update } from "firebase/database";
import { database } from "./Firebase";

const TaskList = ({ deleteTask, toggleTaskCompletion, updateTask }) => {
  const [tasks, setTasks] = useState([]);
  const [selectedTask, setSelectedTask] = useState(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const openEdit = (task) => {
    setSelectedTask(task);
    setIsEditOpen(true);
  };

  const fetchTasks = async () => {
    const tasksRef = ref(database, "tasks");
    onValue(tasksRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const tasksArray = Object.keys(data).map((key) => ({
          id: key,
          ...data[key],
        }));
        setTasks(tasksArray);
      }
    });
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const handleDelete = (id) => {
    const taskRef = ref(database, `tasks/${id}`);
    remove(taskRef)
      .then(() => {
        alert("Task deleted successfully!");
      })
      .catch((error) => {
        alert("Failed to delete task: " + error.message);
      });
  };

  const handleToggleCompletion = (id, completed) => {
    const taskRef = ref(database, `tasks/${id}`);
    update(taskRef, { completed: !completed })
      .then(() => {
        alert("Task status updated successfully!");
      })
      .catch((error) => {
        alert("Failed to update task status: " + error.message);
      });
  };

  return (
    <div className="relative font-poppins container flex flex-col h-screen max-w-screen-2xl bg-yellow-200 ">
      <img src={bg} alt="bg" className="absolute z-0 w-full h-full"></img>
      <div className="z-10 tabletask flex items-center justify-center mt-10">
        <table className="max-w-screen-md bg-yellow-400 text-yellow-950 text-center shadow-lg shadow-yellow-800 rounded-tl-2xl rounded-br-2xl">
          <thead className="border-b-2 border-yellow-600">
            <tr>
              <th className="py-2 px-4 border-r-2 border-yellow-600">No.</th>
              <th className="py-2 px-4 border-r-2 border-yellow-600">Task</th>
              <th className="py-2 px-4 border-r-2 border-yellow-600">Category</th>
              <th className="py-2 px-4 border-r-2 border-yellow-600">Created at</th>
              <th className="py-2 px-4 border-r-2 border-yellow-600">Deadline</th>
              <th className="py-2 px-4 border-r-2 border-yellow-600">Completed</th>
              <th className="py-2 px-4">Action</th>
            </tr>
          </thead>

          <tbody className="text-yellow-950">
               {tasks.map((task, index) => (
                 <tr key={index}>
                   <td className="py-2 px-4 border-r-2 border-yellow-600">{index + 1}</td>
                   <td className="py-2 px-4 border-r-2 border-yellow-600">{task.task}</td>
                   <td className="py-2 px-4 border-r-2 border-yellow-600">{task.category}</td>
                   <td className="py-2 px-4 border-r-2 border-yellow-600">{task.createdAt}</td>
                   <td className="py-2 px-4 border-r-2 border-yellow-600">{task.deadline}</td>
                   <td className="py-2 px-4 border-r-2 border-yellow-600">
                     <input 
                       type="checkbox"
                       checked={task.completed}
                       onChange={() => handleToggleCompletion(task.id, task.completed)}
                     />
                   </td>
                   <td className="py-2 px-4">
                     <button
                       onClick={() => openEdit(task)} className="mr-2 w-4">
                         <img src={edit} alt="Edit" className="w-4"/>
                     </button>
                     <button
                       onClick={() => handleDelete(task.id)} className="ml-2 w-4">
                         <img src={del} alt="Delete" className="w-4"/>
                     </button>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
         
         <div className="z-10 flex items-center justify-center">
           <Link to="/AddTask">
             <button className="bg-yellow-800 shadow-lg text-white p-2 rounded-2xl mt-16 hover:bg-yellow-600">Add Task</button>
           </Link>
         </div>

         <EditTask
           isOpen={isEditOpen}
           onClose={() => setIsEditOpen(false)}
           task={selectedTask || {}}
           onSave={updateTask}
         />
       </div>
     );
   };

   export default TaskList;
