import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

function Task({
  task, taskFunctions,
}) {
  const ToggleDone = () => {
    taskFunctions.toggle(task.id);
  };
  const DeleteTask = () => {
    taskFunctions.delete(task.id);
  };

  return (
    <div>
      <div className={`mx-5 card text-center ${task.done ? 'border-' : 'text-bg-'}${task.color}`}>
        <div className="card-header px-5">
          <input
            className="form-check-input"
            onChange={ToggleDone}
            type="checkbox"
            checked={task.done}
            value="Done"
            id="flexCheckDefault"
          />
          {`  ${task.title}  `}
          <button
            type="button"
            className="btn btn-danger"
            onClick={DeleteTask}
          >
            <AiOutlineDelete />
          </button>
        </div>
        <div className="card-body">
          <p className="card-text">{task.description}</p>
          <h6 className="card-title">
            {`Priority : ${task.priority}`}
          </h6>
        </div>
        <div className="card-footer text-muted">
          <button
            type="button"
            className="btn"
            onClick={(e) => taskFunctions.addEditing(task.id)}
          >
            Edit
            <AiOutlineEdit />
          </button>
        </div>
      </div>

    </div>
  );
}

export default Task;
