import React, { useState, useEffect } from 'react'
import List from './List'
import Alert from './Alert'


const getLocalStorage = () => {
  const list = localStorage.getItem('list')
  if(list){
    return JSON.parse(list)
  }
  else{
    return []
  }
}

function App() {

  const [name, setName] = useState('')
  const [list, setList] = useState(getLocalStorage)
  const [isEditing, setIsEditing] = useState(false)
  const [editId, setEditId] = useState(null)
  const [alert, setAlert] = useState({isVisible: false, msg:'hello list', type:'success'})

  const clearAllHandler = () => {
    showAlert(true, `ToDo's cleared`, 'danger')
    setList([])
  }

  const submitHandler= (e) => {
    e.preventDefault()
    if(!name){
      console.log('no input')
      showAlert(true, 'Please enter value', 'danger')
    }
    else if(name && isEditing){
      const newItem = {id: editId, name}
      const newList = list.filter((item)=>{
        return item.id != editId 
      })
      setList([...newList,newItem])
      setIsEditing(false)
      setEditId(null)
      setName('')
      showAlert(true, `${newItem.name} is updated`, 'success')
    }
    else{
      
      const newItem = {id: new Date().getTime().toString(), name}
      setList([...list].concat(newItem))
      showAlert(true, `${name} in added in ToDo's`, 'success')
      setName('')
    }
   // console.log('subithandler called')
  }

  const showAlert = (isVisible=false, msg='', type='') =>{
    setAlert({isVisible, msg, type})
  }

  const removeItem = (id) => {
  
    const newList = list.filter((item) => {
      return item.id !== id
    })
    setList(newList)
    showAlert(true,`Item removed from ToDo's`,'danger')
  }

  const editItem = (id) => {
    console.log(id)
    setIsEditing(true)
    setEditId(id)
    const specificItem = list.find((item) => {
      return item.id === id
    })
    setName(specificItem.name)
  }

  useEffect(()=>{
    localStorage.setItem('list', JSON.stringify(list))
  },[list])

  return (
    <section className='section-center'>
      <form className='grocery-form'>
        {alert.isVisible && <Alert List={list} {...alert} removeAlert={showAlert} />}
        <h3>My To-Do List</h3>
        <div className='form-control'>
          <input type='text' placeholder='eg. water plants' value={name} onChange={(e)=>setName(e.target.value)} className='grocery' />
          <button onClick={submitHandler} className='submit-btn'>{isEditing ? 'Update' : 'Submit'}</button>
        </div>
         
      </form>
      {list.length > 0 && (
        <div className='grocery-container'>
          <List items={list} setList={setList} setIsEditing={setIsEditing} removeItem={removeItem} editItem={editItem}/>
          <button onClick={clearAllHandler} className='clear-btn'>Clear All</button>
        </div>
      ) }
    </section>
  )
}

export default App
