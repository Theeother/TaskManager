import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { AiOutlineAppstoreAdd } from 'react-icons/ai';
import { BsSortDownAlt } from 'react-icons/bs';
import Task from './components/Task';
import taskService from './services/task.service';
import TaskForm from './components/TaskForm';
import useBoolean from './costumHooks/useBoolean';

function App() {
  const [ adding, toggleAdding ] = useBoolean(false);
  const [ editing, setEditing ] = useState([]);
  const [ filter, setFilter ] = useState('');
  const [ tasks, setTasks ] = useState([]);

  const addEditing = (id) => {
    setEditing([ ...editing, id ]);
  };

  const deleteEditing = (id) => {
    setEditing(editing.filter((taskId) => taskId !== id));
  };

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
      toggleAdding();
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
            <div key={task.id}>
              {!editing.includes(task.id)
                ? (
                  <Task
                    className="my-3"
                    task={task}
                    key={task.id}
                    taskFunctions={{
                      toggleDone,
                      deleteTask,
                      addEditing,
                    }}
                  />
                ) : (
                  <TaskForm className="my-3" editing task={task} formFunctions={{ addEditing, editTask, deleteEditing }} />
                )}
            </div>
          )));

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
                onChange={(e) => search(e)}
              />
            </nav>
          )}
        {adding && <TaskForm addTask={addTask} />}
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
