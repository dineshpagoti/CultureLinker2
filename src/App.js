import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import axios from 'axios';
import './App.css'

const App = () => {
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);

  // Fetch tasks from the backend
  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(response => setTasks(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  const addTask = (task) => {
    axios.post('http://localhost:5000/tasks', task)
      .then(response => setTasks([...tasks, response.data]))
      .catch(error => console.error('Error adding task:', error));
  };

  const editTask = (updatedTask) => {
    axios.put(`http://localhost:5000/tasks/${updatedTask._id}`, updatedTask)
      .then(response => {
        setTasks(tasks.map(task => task._id === updatedTask._id ? response.data : task));
        setIsEditing(false);
        setCurrentTask(null);
      })
      .catch(error => console.error('Error editing task:', error));
  };

  const deleteTask = (id) => {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => setTasks(tasks.filter(task => task._id !== id)))
      .catch(error => console.error('Error deleting task:', error));
  };

  const toggleComplete = (task) => {
    const updatedTask = { ...task, isComplete: !task.isComplete };
    editTask(updatedTask);
  };

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <TaskForm 
        addTask={addTask} 
        isEditing={isEditing} 
        currentTask={currentTask} 
        editTask={editTask} 
      />
      <TaskList 
        tasks={tasks} 
        deleteTask={deleteTask} 
        toggleComplete={toggleComplete} 
        setIsEditing={setIsEditing} 
        setCurrentTask={setCurrentTask} 
      />
    </div>
  );
};

export default App;
