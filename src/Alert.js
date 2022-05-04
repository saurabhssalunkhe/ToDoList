import React, { useEffect } from 'react'

const Alert = ({List, msg, type, removeAlert}) => {

  useEffect(()=> {
    setTimeout(()=>{
      removeAlert()
    },2000)
    console.log('remove alert called')
  },[List])

  return (
  <p className={`alert alert-${type}`}>
    {msg}
  </p>
  )
}

export default Alert
