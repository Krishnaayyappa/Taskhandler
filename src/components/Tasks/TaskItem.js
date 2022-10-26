import classes from './TaskItem.module.css';
import { useState } from 'react';

const TaskItem = (props) => {
  const [mouse, setMouse] = useState(false);
  const deleteHandler = () => {
    props.remove();
  }

  return (
    <div onMouseEnter={() => setMouse(true)} 
        onMouseLeave = {()=>setMouse(false)} 
        className={classes.task}>
      <li>{props.children}</li>
      {mouse && <button onClick = {deleteHandler} className={classes.clear}>{props.isloading ? "Deleting...":"clear"}</button>}
    </div>)
};

export default TaskItem;