import React from 'react'
import { FaEdit, FaTrash } from 'react-icons/fa'

const List = ({items, setList, setIsEditing, removeItem, editItem}) => {
  
 

  
  return (
    <div className='grocery-list'>
      {
        items.map((item)=> {
          return(
            <article key={item.id} className='grocery-item'>
              <p className='title'>{item.name}</p>
              <div className='btn-container'>
                <button onClick={() => editItem(item.id)} className='edit-btn'>
                  <FaEdit/>
                </button>
                <button onClick={() => removeItem(item.id)} className='delete-btn'>
                  <FaTrash/>
                </button>
              </div>
            </article>
        )
        })
      }
    </div>
  
  )
  
}

export default List
