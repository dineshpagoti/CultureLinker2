import React from 'react';

const TaskList = ({ tasks, deleteTask, toggleComplete, setIsEditing, setCurrentTask }) => {
  return (
    <div>
      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            <span 
              style={{ textDecoration: task.isComplete ? 'line-through' : 'none' }}
              onClick={() => toggleComplete(task)}
            >
              {task.name}
            </span>
            <button onClick={() => {
              setIsEditing(true);
              setCurrentTask(task);
            }}>
              Edit
            </button>
            <button onClick={() => deleteTask(task._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
