import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NeatEase from "./components/NeatEase";
import Navibar from "./components/Navibar";
import TaskList from "./components/TaskList";
import AddTask from "./components/AddTask";
import { ref, push, onValue, update, remove, set } from "firebase/database"; // Tambahkan 'set'
import { database } from "./components/Firebase";

const App = () => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
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
        } else {
          setTasks([]); // Jika tidak ada data
        }
      });
    };

    fetchTasks();
  }, []);

  const addTask = async (task) => {
    try {
      const tasksRef = ref(database, "tasks");
      const newTaskRef = push(tasksRef);
      await set(newTaskRef, task);
      console.log("Task added successfully!");
    } catch (error) {
      console.error("Failed to add task", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const taskRef = ref(database, `tasks/${id}`);
      await remove(taskRef);
      console.log("Task deleted successfully!");
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };

  const updateTask = async (updatedTask) => {
    try {
      const taskRef = ref(database, `tasks/${updatedTask.id}`);
      await update(taskRef, updatedTask);
      console.log("Task updated successfully!");
    } catch (error) {
      console.error("Failed to update task", error);
    }
  };

  const toggleTaskCompletion = async (id) => {
    const taskToToggle = tasks.find((task) => task.id === id);
    if (!taskToToggle) return;

    const updatedTask = { ...taskToToggle, completed: !taskToToggle.completed };

    try {
      const taskRef = ref(database, `tasks/${id}`);
      await update(taskRef, updatedTask);
      console.log("Task completion toggled successfully!");
    } catch (error) {
      console.error("Failed to toggle task completion", error);
    }
  };

  return (
    <Router>
      <Navibar />
      <Routes>
        <Route path="/ProjekAkhir_NeatEase" element={<NeatEase />} />
        <Route
          path="/TaskList"
          element={
            <TaskList
              tasks={tasks}
              deleteTask={deleteTask}
              toggleTaskCompletion={toggleTaskCompletion}
              updateTask={updateTask}
            />
          }
        />
        <Route path="/AddTask" element={<AddTask addTask={addTask} />} />
      </Routes>
    </Router>
  );
};

export default App;
