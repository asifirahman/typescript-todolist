import React, { useState } from 'react'
import { IItem } from '../Interfaces'

interface Props {
    item: IItem,
    removeItem(itemIdToRemove: string): void,
    index: number,
    isDragging: boolean,
    onDragStart(): void,
    onDragEnd(): void,
    onDropItem(): void
}

const ToDoItem = ({item, removeItem, index, isDragging, onDragStart, onDragEnd, onDropItem}: Props) => {
  const [isRemoving, setIsRemoving] = useState<boolean>(false);

  const handleRemove = (): void => {
    if (isRemoving) {
      return;
    }

    setIsRemoving(true);
    setTimeout(() => removeItem(item.id), 280);
  };

  return (
    <div
      className={`task ${isRemoving ? 'taskRemoving' : ''} ${isDragging ? 'taskDragging' : ''}`}
      style={{animationDelay: `${index * 70}ms`}}
      draggable={!isRemoving}
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
      onDragOver={(event) => event.preventDefault()}
      onDrop={onDropItem}
    >
        <div className='content'>
            <span className='taskName'>{item?.taskName}</span>
            <span className='taskDeadline'>{item?.deadlineName} day(s)</span>
        </div>
        <div className='taskActions'>
          <button onClick={handleRemove} disabled={isRemoving}>Remove</button>
        </div>
    </div>
  )
}

export default ToDoItem