import React from 'react';

function NewTask({ taskSetter }) {
  const [ taskTitle, setTaskTitle ] = React.useState('');
  const [ taskDescription, setTaskDescription ] = React.useState('');
  const [ taskPriority, setTaskPriority ] = React.useState(0);
  const [ taskColor, setTaskColor ] = React.useState('primary');
  const saveNewTask = (e) => {
    e.preventDefault();
    taskSetter({
      title: taskTitle,
      description: taskDescription,
      priority: taskPriority,
      color: taskColor,
      done: false,
    });
  };

  return (
    <div>
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
          value={taskTitle}
          placeholder="New task title"
          onChange={(e) => setTaskTitle(e.target.value)}
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
          value={taskDescription}
          placeholder="New task description"
          onChange={(e) => setTaskDescription(e.target.value)}
          required
        />

        <label htmlFor="color" className="form-label">Color</label>
        <select
          id="dropdown"
          className="form-control"
          onChange={(e) => setTaskColor(e.target.value)}
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
          {taskPriority}
        </label>
        <input
          type="range"
          className="form-range"
          min="0"
          max="20"
          step="1"
          id="customRange3"
          value={taskPriority}
          onChange={(e) => setTaskPriority(parseInt(e.target.value, 10))}
        />

        <button className="btn btn-primary" type="submit">
          Add
        </button>
      </form>

    </div>
  );
}
export default NewTask;
