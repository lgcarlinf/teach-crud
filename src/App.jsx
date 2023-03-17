import { useEffect, useState } from 'react'
import axios from 'axios';
import Note from './components/Note'

function App() {
  const [inputText,setInputText] = useState('')
  const [editNote,setEditNote] = useState('')
/*   const [notes,setNotes] = useState([{
    id:1,
    description: 'primera nota'
  }]) */
  const [fetchNotes,setFetchNotes] = useState([])

  const handleSubmit = (e)=>{
    e.preventDefault()
    if(inputText.trim() === '') return

    if(editNote.name){
     /*  const newNotes = notes.map(note =>{
        if(note.id === editNote.id){
          return{
            ...note,
            description: inputText
          }
        }
        return note
      }) */
      putNote(editNote._id)
/*       setNotes(newNotes) */
      setEditNote('')
    }else{
      postNotes()
      /* setNotes([...notes,{
        id: notes.length+1,
        description: inputText
      }]) */
    }

    setInputText('')
  }

  const handleChange = (e)=>{
    setInputText(e.target.value)
  }

  const handleDelete = (id)=>{
   /*  const filteredNotes = notes.filter(note=> note.id !== id)
    setNotes(filteredNotes) */
    deleteNote(id)
  }

  const handleEdit = (id)=>{
    const findNote = fetchNotes.find(note=> note._id === id)
    setEditNote(findNote)
    setInputText(findNote.comment)
  }

  const getNotes = async ()=>{
    try {
      const response = await axios({
        url: import.meta.env.VITE_BACK_URL,
      })
      setFetchNotes(response.data.items)
    } catch (error) {
      console.log(error)
    }
  }

  const postNotes = async ()=>{
    const url = import.meta.env.VITE_BACK_URL
    try {
      await axios({
        url,
        method: 'POST',
        data: {
          name: inputText,
          comment: inputText
        }
      })
      getNotes()
    } catch (error) {
      console.log(error)
    }
  }

  const deleteNote = async (id)=>{
    const url = `${import.meta.env.VITE_BACK_URL}/${id}`
    try{
      await axios({
        url,
        method: 'DELETE'
      })
      getNotes()
    }catch(error){
      console.log(error)
    }
  }

  const putNote = async (id)=>{
    const url = `${import.meta.env.VITE_BACK_URL}/${id}`
    try {
      await axios.put(
        url,{
          name: inputText.substring(0,10),
          comment: inputText
        }
      )
      getNotes()
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getNotes()
  }, [])

  return (
    <div className="App">
       <h1>Crud</h1>
       <form onSubmit={handleSubmit}>
          <input type="text" value={inputText} onChange={handleChange}/>
          <input type="submit"  value='enviar'/>
       </form>
       <div className=''>
        {
          fetchNotes.map((note)=>(
           <Note key={note._id} note={note} handleEdit={handleEdit} handleDelete={handleDelete}/>
          ))
        }
       </div>
    </div>
  )
}

export default App
