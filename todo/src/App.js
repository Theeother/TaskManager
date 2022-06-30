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
  const [ filtered, setFiltered ] = React.useState([]);
  const [ filter, setFilter ] = React.useState('');
  const [ tasks, setTasks ] = React.useState([]);
  const [ doneExist, setDone ] = React.useState(0);
  const [ undoneExist, setUndone ] = React.useState(0);

  const sortTasks = () => {
    setTasks([ ...filtered ].sort((a, b) => b.priority - a.priority));
  };
  const search = (e) => {
    setFilter(e.target.value);
    setFiltered(tasks.filter((task) => task.title.toLowerCase()
      .includes(e.target.value.toLowerCase())
      || task.description.toLowerCase().includes(e.target.value.toLowerCase())));
  };
  function addTask(task) {
    taskService.createTask(task).then((response) => {
      task.id = response.data.id;
      console.log(response);
    });
    setTasks(tasks.concat(task));
    setUndone(undoneExist + 1);
  }
  function toggleDone(id) {
    setTasks(tasks.map((task) => {
      if (task.id === id) {
        task.done = !task.done;
        if (task.done) {
          setDone(doneExist + 1);
          setUndone(undoneExist - 1);
        } else {
          setDone(doneExist - 1);
          setUndone(undoneExist + 1);
        }
      }
      return task;
    }, []));
    taskService.updateTask(id, { done: !tasks.find((task) => task.id === id).done });
  }
  function deleteTask(id) {
    tasks.forEach((task) => {
      if (task.id === id) {
        if (task.done) {
          setDone(doneExist - 1);
        } else {
          setUndone(undoneExist - 1);
        }
      }
    });
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
      setFiltered(newTasks.data);
      // count done and undone tasks
      let done = doneExist;
      let undone = undoneExist;
      newTasks.data.forEach((task) => {
        if (task.done) {
          done++;
        } else {
          undone++;
        }
      });
      setDone(done);
      setUndone(undone);
      console.log(newTasks);
    });
  };

  useEffect(() => {
    setAdding(false);
    setFiltered(tasks);
  }, [ tasks ]);
  useEffect(() => {
    console.log(filtered);
  }, [ filtered ]);

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
            {(!undoneExist) ? <div className="alert alert-danger" role="alert">No tasks to do</div>
              : filtered.map((task) => !task.done
                && (
                  <Task
                    className="my-3"
                    task={task}
                    key={task.id}
                    id={task.id}
                    taskFunctions={{ toggle: toggleDone, delete: deleteTask, edit: editTask }}
                  />
                ), [])}
          </div>
          <div className="col-sm-4">
            <h2>Done</h2>
            {(!doneExist) ? <div className="alert alert-danger" role="alert">No tasks done</div>
              : filtered.map((task) => task.done
                && (
                  <Task
                    className="my-3"
                    task={task}
                    key={task.id}
                    id={task.id}
                    taskFunctions={{ toggle: toggleDone, delete: deleteTask, edit: editTask }}
                  />
                ), [])}
          </div>
        </div>
      </header>
    </div>
  );
}

export default App;
