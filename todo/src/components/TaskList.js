import React, { useState } from 'react';
import Task from './Task';
import TaskForm from './TaskForm';

export default function TaskList({ tasks, filter, editingFunctions }) {
  const [ editing, setEditing ] = useState([]);
  const addEditing = (id) => {
    setEditing([ ...editing, id ]);
  };

  const deleteEditing = (id) => {
    setEditing(editing.filter((taskId) => taskId !== id));
  };

  return (
    (tasks.length === 0) ? <div className="alert alert-danger" role="alert">No tasks found</div>
      : tasks.filter(
        (task) => ((task.title.toLowerCase().includes(filter.toLowerCase()
          || task.description.toLowerCase().includes(filter.toLowerCase()))) || filter === ''),
      )
        .map((task) => (
          <div key={task.id}>
            {!editing.includes(task.id)
              ? (
                <Task
                  className="my-3"
                  task={task}
                  key={task.id}
                  taskFunctions={{
                    getTasks: editingFunctions.getTasks,
                    addEditing,
                  }}
                />
              ) : (
                <TaskForm className="my-3" editing task={task} formFunctions={{ getTasks: editingFunctions.getTasks, deleteEditing }} />
              )}
          </div>
        ))
  );
}
