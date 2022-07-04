import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';

function Task({
  task, taskFunctions,
}) {
  return (
    <div>
      <div className={`mx-5 card text-center ${task.done ? 'border-' : 'text-bg-'}${task.color}`}>
        <div className="card-header px-5">
          <input
            className="form-check-input"
            onChange={(e) => taskFunctions.toggleDone(task.id)}
            type="checkbox"
            checked={task.done}
            value="Done"
            id="flexCheckDefault"
          />
          {`  ${task.title}  `}
          <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => taskFunctions.deleteTask(task.id)}
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
