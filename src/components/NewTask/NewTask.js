

import Section from '../UI/Section';
import TaskForm from './TaskForm';
import useHttp from '../../hooks/usehttp';

const NewTask = (props) => {
  const {isLoading,error,sendRequests:sendTaskRequest} = useHttp();

  const createTask = (taskText, taskData) => {
    const generatedId = taskData.name; // firebase-specific => "name" contains generated id
    const createdTask = { id: generatedId, text: taskText };
    props.onAddTask(createdTask);
  }

  const enterTaskHandler = (taskText) => {
    sendTaskRequest({url:'https://http-react-33a71-default-rtdb.firebaseio.com/tasks.json',
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
      },
      body:{text:taskText}}, createTask.bind(null, taskText)
  )
}
  
  
    

  return (
    <Section>
      <TaskForm onEnterTask={enterTaskHandler} loading={isLoading} />
      {error && <p>{error}</p>}
    </Section>
  );
};

export default NewTask;
