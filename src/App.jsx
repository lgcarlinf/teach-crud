import { useState } from 'react'
import reactLogo from './assets/react.svg'

function App() {
  const [inputText,setInputText] = useState('')
  const [editNote,setEditNote] = useState('')
  const [notes,setNotes] = useState([{
    id:1,
    description: 'primera nota'
  }])

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(inputText.trim() === '') return

    if(editNote.id){
      const newNotes = notes.map(note =>{
        if(note.id === editNote.id){
          return{
            ...note,
            description: inputText
          }
        }
        return note
      })

      setNotes(newNotes)
      setEditNote('')
    }else{
      setNotes([...notes,{
        id: notes.length+1,
        description: inputText
      }])
    }

    setInputText('')
  }

  const handleChange = (e)=>{
    setInputText(e.target.value)
  }

  const handleDelete = (id)=>{
    const filteredNotes = notes.filter(note=> note.id !== id)
    setNotes(filteredNotes)
  }

  const handleEdit = (id)=>{
    const findNote = notes.find(note=> note.id === id)
    setEditNote(findNote)
    setInputText(findNote.description)
  }

  return (
    <div className="App">
       <h1>Crud</h1>
       <form onSubmit={handleSubmit}>
          <input type="text" value={inputText} onChange={handleChange}/>
          <input type="submit"  value='enviar'/>
       </form>
       <div className=''>
        {
          notes.map((note)=>(
            <div key={note.id} className='flex'>
              <p>{note.description}</p>
              <button className='btn' onClick ={()=>handleEdit(note.id)}>Edit</button>
              <button className='btn' onClick={()=>handleDelete(note.id)}>Delete</button>
            </div>
          ))
        }
       </div>
    </div>
  )
}

export default App
