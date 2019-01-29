import React from 'react'
import TodoListItem from '../todo-list-item/todo-list-item';


const TodoList = ({ 
    obj,
    onDeleted,
    onToggleImportant,
    onToggleDone
 }) => {
    
    const el = (obj.map((element)=>{

        const { id, ...elementItem } = element 

        return(
            <li key={id} className="list-group-item">
                 <TodoListItem 
                    {...elementItem}
                    onDeleted={()=>onDeleted(id)}
                    onToggleImportant={()=>onToggleImportant(id)}
                    onToggleDone={()=>onToggleDone(id)}
                 />
            </li>
        )
    }))

    return(
        <ul className="list-group todo-list" >
            { el }
        </ul>
    )
}
export default TodoList