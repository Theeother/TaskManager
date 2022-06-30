import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

function Task({ task, id, taskFunctions }) {
  const [ editing, setEditing ] = React.useState(false);
  const [ title, setTitle ] = React.useState(task.title);
  const [ description, setDescription ] = React.useState(task.description);
  const [ priority, setPriority ] = React.useState(task.priority);
  const [ color, setColor ] = React.useState(task.color);

  const ToggleDone = () => {
    taskFunctions.toggle(id);
  };
  const DeleteTask = () => {
    taskFunctions.delete(id);
  };
  const EditTask = () => {
    console.log(id);
    const newTask = {
      id,
      title,
      description,
      priority,
      color,
      done: task.done,
    };
    console.log(newTask);
    taskFunctions.edit(newTask);
    setEditing(false);
  };
  const CancelEdit = () => {
    setTitle(task.title);
    setDescription(task.description);
    setPriority(task.priority);
    setColor(task.color);
    setEditing(false);
  };

  return (
    <div>
      <div className={`mx-5 card text-center ${task.done ? 'border-' : 'text-bg-'}${task.color}`}>
        <div className="card-header px-5">
          {!editing
            && (
              <input
                className="form-check-input"
                onChange={ToggleDone}
                type="checkbox"
                checked={task.done}
                value="Done"
                id="flexCheckDefault"
              />
            )}

          {editing ? (
            <input
              type="text"
              id="title"
              className="form-control"
              value={title}
              placeholder="New task title"
              onChange={(e) => setTitle(e.target.value)}
            />
          )
            : `  ${task.title}  `}

          {!editing
            && (
              <button
                type="button"
                className="btn btn-danger"
                onClick={DeleteTask}
              >
                <AiOutlineDelete />
              </button>
            )}
        </div>
        <div className="card-body">
          {editing ? (
            <input
              type="text"
              id="desc"
              className="form-control"
              value={description}
              placeholder="New task description"
              onChange={(e) => setDescription(e.target.value)}
            />
          ) : <p className="card-text">{task.description}</p>}

          {editing ? (
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
          ) : (
            <h6 className="card-title">
              {`Priority : ${task.priority}`}
            </h6>
          )}
        </div>

        {editing
          && (
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
          )}

        <div className="card-footer text-muted">
          {editing ? (
            <span>
              <button type="button" className="btn btn-primary" onClick={() => EditTask()}>Save</button>
              <button type="button" className="btn btn-danger" onClick={() => CancelEdit()}>Cancel</button>
            </span>
          )
            : (
              <button
                type="button"
                className="btn"
                onClick={(e) => setEditing(true)}
              >
                Edit
                <AiOutlineEdit />
              </button>
            )}
        </div>
      </div>
    </div>
  );
}

export default Task;
