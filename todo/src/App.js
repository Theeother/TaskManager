import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { BsSortDownAlt } from 'react-icons/bs';
import taskService from './services/task.service';
import TaskForm from './components/TaskForm';
import useBoolean from './customHooks/useBoolean';
import TaskList from './components/TaskList';

function App() {
  const [ adding, toggleAdding ] = useBoolean(false);
  const [ filter, setFilter ] = useState('');
  const [ tasks, setTasks ] = useState([]);

  const getTasks = () => {
    taskService.getAllTasks().then((newTasks) => {
      setTasks(newTasks.data);
    });
  };

  const sortTasks = () => {
    setTasks([ ...tasks ].sort((a, b) => b.priority - a.priority));
  };

  function addTask(task) {
    taskService.createTask(task).then((response) => {
      getTasks();
      toggleAdding();
    });
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>ToDo List</h1>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => toggleAdding()}
        >
          <AiOutlineAppstoreAdd />
          Add Task
        </button>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => sortTasks()}
        >
          <BsSortDownAlt />
          Sort By priority
        </button>
        {!adding && tasks.length > 0
          && (
            <nav className="navbar navbar-light bg-light">
              <input
                className="form-control mr-sm-2"
                value={filter}
                placeholder="Search"
                aria-label="Search"
                onChange={(e) => setFilter(e.target.value)}
              />
            </nav>
          )}
        {adding && <TaskForm addTask={addTask} />}
        <br />
        <div className="d-flex flex-row justify-content-around flex-wrap col-sm-12">
          <div className="col-sm-4">
            <h2>To Do</h2>
            <TaskList
              tasks={tasks.filter((task) => task.done === false)}
              filter={filter}
              editingFunctions={{ getTasks }}
            />
          </div>
          <div className="col-sm-4">
            <h2>Done</h2>
            <TaskList
              tasks={tasks.filter((task) => task.done === true)}
              filter={filter}
              editingFunctions={{ getTasks }}
            />
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
