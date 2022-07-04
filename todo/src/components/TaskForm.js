import React, { useState } from 'react';

function TaskForm({
  editing, addTask, task, formFunctions,
}) {
  const [ title, setTitle ] = useState(editing ? task.title : '');
  const [ description, setDescription ] = useState(editing ? task.description : '');
  const [ priority, setPriority ] = useState(editing ? task.priority : 0);
  const [ color, setColor ] = useState(editing ? task.color : 'primary');

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

  const EditTask = () => {
    console.log(task.id);
    const newTask = {
      id: task.id,
      title,
      description,
      priority,
      color,
      done: task.done,
    };
    console.log(newTask);
    formFunctions.editTask(newTask);
    formFunctions.deleteEditing(task.id);
  };

  const CancelEdit = () => {
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setColor(task.color);
    formFunctions.deleteEditing(task.id);
  };

  return (
    <div>
      {!editing ? (
        <form onSubmit={(e) => saveNewTask(e)}>
          <label
            htmlFor="title"
            className="form-label"
          >
            Title
          </label>
          <input
            type="text"
            id="title"
            className="form-control"
            value={title}
            placeholder="New task title"
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <label
            htmlFor="desc"
            className="form-label"
          >
            Description
          </label>
          <input
            type="text"
            id="desc"
            className="form-control"
            value={description}
            placeholder="New task description"
            onChange={(e) => setDescription(e.target.value)}
            required
          />

          <label htmlFor="color" className="form-label">Color</label>
          <select
            id="dropdown"
            className="form-control"
            onChange={(e) => setColor(e.target.value)}
          >
            <option value="primary">Blue</option>
            <option value="secondary">Grey</option>
            <option value="success">Green</option>
            <option value="danger">Red</option>
            <option value="warning">Yellow</option>
          </select>

          <label htmlFor="prt" className="form-label">
            Priority:
            {' '}
            {priority}
          </label>
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

          <button className="btn btn-primary" type="submit">
            Add
          </button>
        </form>
      ) : (

        <div className={`mx-5 card text-center ${task.done ? 'border-' : 'text-bg-'}${task.color}`}>
          <div className="card-header px-5">
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              placeholder="New task title"
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="card-body">
            <input
              type="text"
              id="desc"
              className="form-control"
              value={description}
              placeholder="New task description"
              onChange={(e) => setDescription(e.target.value)}
            />
            <div>
              {`priority: ${priority}`}
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
          <select
            id="dropdown"
            className="form-control"
            defaultValue={task.color}
            onChange={(e) => setColor(e.target.value)}
          >
            <option value="primary">Blue</option>
            <option value="secondary">Grey</option>
            <option value="success">Green</option>
            <option value="danger">Red</option>
            <option value="warning">Yellow</option>
          </select>
          <div className="card-footer text-muted">
            <span>
              <button type="button" className="btn btn-primary" onClick={() => EditTask()}>Save</button>
              <button type="button" className="btn btn-danger" onClick={() => CancelEdit()}>Cancel</button>
            </span>
          </div>
        </div>
      )}

    </div>
  );
}
export default TaskForm;
