import Section from '../UI/Section';
import TaskItem from './TaskItem';
import classes from './Tasks.module.css';
import useHttp from '../../hooks/usehttp';

const Tasks = (props) => {

  const {isLoading,error,sendRequests:deleteTask} = useHttp(); 

  let taskList = <h2>No tasks found. Start adding some!</h2>;

  const deleteHandler = (id) => {
    console.log(id);
    props.onDeleteTask(id);
  }
  const clearTasks = (id) => {
    deleteTask({url:`https://http-react-33a71-default-rtdb.firebaseio.com/tasks/${id}.json`,
    method:"delete"}, deleteHandler.bind(null,id))
  }

  if (props.items.length > 0) {
    taskList = (
      <ul>
        {props.items.map((task) => (
          <TaskItem remove = {() => clearTasks(task.id)} key={task.id} isloading = {isLoading} error = {error}>{task.text}</TaskItem>
        ))}
      </ul>
    );
  }

  let content = taskList;

  if (props.error) {
    content = <button onClick={props.onFetch}>Try again</button>;
  }

  if (props.loading) {
    content = 'Loading tasks...';
  }

  return (
    <Section>
      <div className={classes.container}>{content}</div>
    </Section>
  );
};

export default Tasks;
