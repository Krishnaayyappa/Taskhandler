import React, {useEffect, useState } from 'react';

import Tasks from './components/Tasks/Tasks';
import NewTask from './components/NewTask/NewTask';
import useHttp from './hooks/usehttp';

function App() {
  const [tasks, setTasks] = useState([]);
  const {isLoading, error, sendRequests:fetchTasks} = useHttp();
  useEffect(() => {
    const transformData = (taskObj) => {
      const loadedTasks = [];
      for (const taskKey in taskObj) {
        loadedTasks.push({ id: taskKey, text: taskObj[taskKey].text });
      }
      setTasks(loadedTasks);
    };

    fetchTasks({url:'https://http-react-33a71-default-rtdb.firebaseio.com/tasks.json'},transformData);
  }, [fetchTasks]);

  const taskAddHandler = (task) => {
    setTasks((prevTasks) => prevTasks.concat(task));
  };

  const taskDeleteHandler = (id) => {
    const updatedTasks = tasks.filter((task) => {
      return task.id !== id
    });
    setTasks(updatedTasks);
    console.log(updatedTasks);
  }

 

  return (
    <React.Fragment>
      <NewTask onAddTask={taskAddHandler} />
      <Tasks
        items={tasks}
        loading={isLoading}
        error={error}
        onFetch={fetchTasks}
        onDeleteTask = {taskDeleteHandler}
      />
    </React.Fragment>
  );
}

export default App;
