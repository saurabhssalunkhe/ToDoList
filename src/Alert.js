import React, { useEffect } from 'react'

const Alert = ({List, msg, type, removeAlert}) => {

  useEffect(()=> {
    const timeOut = setTimeout(()=>{
      removeAlert()
    },2000)
    return () => clearTimeout(timeOut)
    console.log('remove alert called')

  },[List])

  return (
  <p className={`alert alert-${type}`}>
    {msg}
  </p>
  )
}

export default Alert
