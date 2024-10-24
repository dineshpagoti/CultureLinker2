import React, { useState, useEffect } from 'react';

const TaskForm = ({ addTask, isEditing, currentTask, editTask }) => {
  const [task, setTask] = useState({ name: '', isComplete: false });

  useEffect(() => {
    if (isEditing && currentTask) {
      setTask(currentTask);
    } else {
      setTask({ name: '', isComplete: false });
    }
  }, [isEditing, currentTask]);

  const handleChange = (e) => {
    setTask({ ...task, name: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!task.name.trim()) return;
    if (isEditing) {
      editTask(task);
    } else {
      addTask(task);
    }
    setTask({ name: '', isComplete: false });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task"
        value={task.name}
        onChange={handleChange}
      />
      <button type="submit">{isEditing ? 'Update Task' : 'Add Task'}</button>
    </form>
  );
};

export default TaskForm;
