import React,{FC, useState, ChangeEvent, useEffect} from 'react';
import { IItem } from './Interfaces';
import ToDoItem from './components/ToDoItem'
import "./App.css"

const STORAGE_KEY = "todo-list-items";
type SortOrder = "asc" | "desc";

const createItemId = (): string => `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;

const sortByDeadline = (items: IItem[], order: SortOrder): IItem[] => {
  const sorted = [...items].sort((a, b) => a.deadlineName - b.deadlineName);
  return order === "asc" ? sorted : sorted.reverse();
};

const App: FC = () => {

  const [task, setTask] = useState<string>("");
  const [deadline, setDeadline] = useState<number>(0);
  const [list, setList] = useState<IItem[]>(() => {
    try {
      const storedList = localStorage.getItem(STORAGE_KEY);
      if (!storedList) {
        return [];
      }
      const parsedList = JSON.parse(storedList) as Array<Partial<IItem>>;
      const sanitizedList: IItem[] = parsedList
        .filter((item) => typeof item.taskName === "string" && typeof item.deadlineName === "number")
        .map((item) => ({
          id: item.id ?? createItemId(),
          taskName: item.taskName as string,
          deadlineName: item.deadlineName as number
        }));

      return sortByDeadline(sanitizedList, "asc");
    } catch {
      return [];
    }
  });
  const [sortOrder, setSortOrder] = useState<SortOrder>("asc");
  const [draggedItemId, setDraggedItemId] = useState<string | null>(null);
  const isFormValid = task.trim().length > 0 && deadline > 0;

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  }, [list]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if(event.target.name === 'task')
      setTask(event.target.value)
    else
      setDeadline(Number(event.target.value))
  }

  const addItem = () :void  => {
    if (!isFormValid) {
      return;
    }

    const newItem: IItem = {id: createItemId(), taskName: task.trim(), deadlineName: deadline}
    setTask("")
    setDeadline(0)
    setList((prevList) => sortByDeadline([...prevList, newItem], sortOrder))
  }

  const removeItem = (itemIdToRemove: string) :void  => {
    setList((prevList) => prevList.filter((item) => item.id !== itemIdToRemove))
  }

  const toggleSortOrder = (): void => {
    setSortOrder((prevOrder) => {
      const nextOrder: SortOrder = prevOrder === "asc" ? "desc" : "asc";
      setList((prevList) => sortByDeadline(prevList, nextOrder));
      return nextOrder;
    });
  };

  const handleDragStart = (itemId: string): void => {
    setDraggedItemId(itemId);
  };

  const handleDragEnd = (): void => {
    setDraggedItemId(null);
  };

  const handleDrop = (targetId: string): void => {
    if (!draggedItemId || draggedItemId === targetId) {
      return;
    }

    setList((prevList) => {
      const updatedList = [...prevList];
      const draggedIndex = updatedList.findIndex((item) => item.id === draggedItemId);
      const targetIndex = updatedList.findIndex((item) => item.id === targetId);
      if (draggedIndex < 0 || targetIndex < 0) {
        return prevList;
      }

      const [draggedItem] = updatedList.splice(draggedIndex, 1);
      updatedList.splice(targetIndex, 0, draggedItem);
      return updatedList;
    });
    setDraggedItemId(null);
  };

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <p className='subtitle'>Plan your day and stay focused.</p>
      <div className='header'>
        <div className='inputContainer'>
          <input type='text' placeholder='Add task' name='task' value={task} onChange={handleChange}/>
          <input type='number' placeholder='Add deadline' name='deadline' value={deadline} onChange={handleChange}/>
        </div>
        <div className='actionButtons'>
          <button className='sortButton' onClick={toggleSortOrder}>
            Sort: {sortOrder === "asc" ? "Low to High" : "High to Low"}
          </button>
          <button onClick={addItem} disabled={!isFormValid}>Add Task</button>
        </div>
      </div>
      <div className='todolist'>
        {list.map((item: IItem, index: number) => {
          return (
            <ToDoItem
              item={item}
              key={item.id}
              removeItem={removeItem}
              index={index}
              isDragging={draggedItemId === item.id}
              onDragStart={() => handleDragStart(item.id)}
              onDragEnd={handleDragEnd}
              onDropItem={() => handleDrop(item.id)}
            />
          );
        })}
        {list.length === 0 && <p className='emptyState'>No tasks yet. Add your first one above.</p>}
      </div>

    </div>
  );
}

export default App;
