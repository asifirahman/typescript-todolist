import React,{FC, useState, ChangeEvent} from 'react';
import { IItem } from './Interfaces';
import ToDoItem from './components/ToDoItem'
import "./App.css"

const App: FC = () => {

  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [list, setList] = useState<IItem[]>([]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if(event.target.name === 'task')
      setTask(event.target.value)
    else
      setDeadline(Number(event.target.value))
  }

  const addItem = () :void  => {
    const newItem = {taskName: task, deadlineName: deadline}
    setTask("")
    setDeadline(0)
    setList([...list, newItem])
  }

  const removeItem = (taskNameToRemove: string) :void  => {
    setList(list.filter(item =>
      item.taskName != taskNameToRemove
    ))
  }

  return (
    <div className="App">
      <div className='header'>
        <div className='inputContainer'>
          <input type='text' placeholder='Add task' name='task' value={task} onChange={handleChange}/>
          <input type='number' placeholder='Add deadline' name='deadline' value={deadline} onChange={handleChange}/>
        </div>
        <button onClick={addItem}>Add task</button>
      </div>
      <div className='todolist'>
        {list.map((item: IItem, key: number)=> {
          return <ToDoItem item={item} key={key} removeItem={removeItem}/>
        })}
      </div>

    </div>
  );
}

export default App;
