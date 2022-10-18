import classes from './TaskItem.module.css';
import { useState } from 'react';

const TaskItem = (props) => {
  const [mouse, setMouse] = useState(false);
  return (
    <div onMouseEnter={() => setMouse(true)} 
        onMouseLeave = {()=>setMouse(false)} 
        className={classes.task}>
      <li>{props.children}</li>
      {mouse && <button onClick = {props.remove} className={classes.clear}>clear</button>}
    </div>)
};

export default TaskItem;