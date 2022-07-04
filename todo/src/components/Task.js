import React from 'react';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import taskService from '../services/task.service';

function Task({
  task, taskFunctions,
}) {
  function deleteTask() {
    taskService.deleteTask(task.id).then((response) => {
      taskFunctions.getTasks();
    });
  }

  function toggleDone() {
    taskService.updateTask({ id: task.id, done: !task.done }).then((response) => {
      taskFunctions.getTasks();
    });
  }
  return (
    <div>
      <div className={`mx-5 card text-center ${task.done ? 'border-' : 'text-bg-'}${task.color}`}>
        <div className="card-header px-5">
          <input
            className="form-check-input"
            onChange={(e) => toggleDone()}
            type="checkbox"
            checked={task.done}
            value="Done"
            id="flexCheckDefault"
          />
          {`  ${task.title}  `}
          <button
            type="button"
            className="btn btn-danger"
            onClick={(e) => deleteTask()}
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
