import React, { useState } from 'react';
import taskService from '../services/task.service';

function TaskForm({
  editing, addTask, task, formFunctions,
}) {
  const [ title, setTitle ] = useState(editing ? task.title : '');
  const [ description, setDescription ] = useState(editing ? task.description : '');
  const [ priority, setPriority ] = useState(editing ? task.priority : 0);
  const [ color, setColor ] = useState(editing ? task.color : 'primary');
  const [ done ] = useState(editing ? task.done : false);

  const saveNewTask = (e) => {
    e.preventDefault();
    addTask({
      title,
      description,
      priority,
      color,
      done: false,
    });
  };

  const editTask = (e) => {
    e.preventDefault();
    const newTask = {
      id: task.id,
      title,
      description,
      priority,
      color,
      done: task.done,
    };
    taskService.updateTask(newTask).then((response) => {
      formFunctions.deleteEditing(task.id);
      formFunctions.getTasks();
    });
  };

  return (
    <div>
      <div className={`mx-5 card text-center ${done ? 'border-' : 'text-bg-'}${editing ? color : 'light'}`}>
        <form onSubmit={(e) => {
          if (editing) editTask(e);
          else {
            saveNewTask(e);
          }
        }}
        >
          <div className="card-header px-5">
            {!editing && (
              <label
                htmlFor="title"
                className="form-label"
              >
                Title
              </label>
            )}
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              placeholder="New task title"
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="card-body">
            {!editing && (
              <label
                htmlFor="desc"
                className="form-label"
              >
                Description
              </label>
            )}
            <input
              type="text"
              id="desc"
              className="form-control"
              value={description}
              placeholder="New task description"
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <div>
              {!editing ? (
                <label htmlFor="prt" className="form-label">
                  Priority:
                  {' '}
                  {priority}
                </label>
              ) : `priority: ${priority}`}
              <input
                type="range"
                className="form-range"
                min="0"
                max="20"
                step="1"
                id="customRange3"
                value={priority}
                onChange={(e) => setPriority(parseInt(e.target.value, 10))}
              />
            </div>
          </div>
          {!editing && (
            <label htmlFor="color" className="form-label">Color</label>
          )}
          <select
            id="dropdown"
            className="form-control"
            defaultValue={color}
            onChange={(e) => setColor(e.target.value)}
          >
            <option value="primary">Blue</option>
            <option value="secondary">Grey</option>
            <option value="success">Green</option>
            <option value="danger">Red</option>
            <option value="warning">Yellow</option>
          </select>
          <div className="card-footer text-muted">
            {editing ? (
              <span>
                <button type="submit" className="btn btn-primary">Save</button>
                <button type="button" className="btn btn-danger" onClick={() => formFunctions.deleteEditing(task.id)}>Cancel</button>
              </span>
            ) : (
              <button className="btn btn-success" type="submit">
                Add
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
export default TaskForm;
