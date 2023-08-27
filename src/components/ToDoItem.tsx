import React from 'react'
import { IItem } from '../Interfaces'

interface Props {
    item: IItem,
    removeItem(taskNameToRemove: string): void
}

const ToDoItem = ({item, removeItem}: Props) => {
  return (
    <div className='task'>
        <div className='content'>
            <span>{item?.taskName}</span>
            <span>{item?.deadlineName}</span>
        </div>
        <button onClick={() => removeItem(item?.taskName)}>X</button>
    </div>
  )
}

export default ToDoItem