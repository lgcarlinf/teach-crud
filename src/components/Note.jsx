import React from 'react'

const Note = ({note,handleEdit,handleDelete}) => {
  return (
    <div  className='flex'>
    <p>{note.comment}</p>
    <button className='btn' onClick ={()=>handleEdit(note._id)}>Edit</button>
    <button className='btn' onClick={()=>handleDelete(note._id)}>Delete</button>
  </div>
  )
}
export default Note