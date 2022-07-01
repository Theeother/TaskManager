import React, { useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { BsSortDownAlt } from 'react-icons/bs';
import NewTask from './components/NewTask';
import Task from './components/Task';
import taskService from './services/task.service';

function App() {
  const [ adding, setAdding ] = React.useState(false);
  const [ filter, setFilter ] = React.useState('');
  const [ tasks, setTasks ] = React.useState([]);

  const sortTasks = () => {
    setTasks([ ...tasks ].sort((a, b) => b.priority - a.priority));
  };
  const search = (e) => {
    setFilter(e.target.value);
  };
  function addTask(task) {
    taskService.createTask(task).then((response) => {
      console.log(response);
      task.id = response.id;
      setTasks(tasks.concat(task));
      setAdding(!adding);
    });
  }
  function toggleDone(id) {
    let done;
    setTasks(tasks.map((task) => {
      if (task.id === id) {
        task.done = !task.done;
        done = task.done;
      }
      return task;
    }, []));

    taskService.updateTask({ id, done });
  }
  function deleteTask(id) {
    setTasks(tasks.filter((task) => task.id !== id));
    taskService.deleteTask(id);
  }
  function editTask(newTask) {
    setTasks(tasks.map((task) => {
      if (task.id === newTask.id) {
        return newTask;
      }
      return task;
    }, []));
    console.log(newTask);
    taskService.updateTask(newTask);
  }

  const getTasks = () => {
    taskService.getAllTasks().then((newTasks) => {
      setTasks(newTasks.data);
    });
  };

  useEffect(() => {
    getTasks();
  }, []);

  const renderListOfTasks = (areDone) => (
    (tasks.filter((task) => task.done === areDone).length === 0) ? <div className="alert alert-danger" role="alert">No tasks found</div>
      : tasks.filter(
        (task) => task.done === areDone
          && ((task.title.toLowerCase().includes(filter.toLowerCase()
            || task.description.toLowerCase().includes(filter.toLowerCase()))) || filter === ''),
      )
        .map((task) => task.done === areDone
          && (
            <Task
              className="my-3"
              task={task}
              key={task.id}
              id={task.id}
              taskFunctions={{ toggle: toggleDone, delete: deleteTask, edit: editTask }}
            />
          ), [])
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>ToDo List</h1>
        <button
          className="btn btn-primary"
          type="button"
          onClick={() => setAdding(!adding)}
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
                onChange={(e) => search(e)}
              />
            </nav>
          )}
        {adding && <NewTask taskSetter={addTask} />}
        <br />
        <div className="d-flex flex-row justify-content-around flex-wrap col-sm-12">
          <div className="col-sm-4">
            <h2>To Do</h2>
            {renderListOfTasks(false)}
          </div>
          <div className="col-sm-4">
            <h2>Done</h2>
            {renderListOfTasks(true)}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
