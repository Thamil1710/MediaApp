import React from 'react'
import { useParams } from 'react-router-dom'

const Paper = () => {
    const {id} = useParams()
  return (
    <div>Paper  {id} </div>
  )
}

export default Paper