import { useEffect, useState } from 'react'
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { v4 as uuidv4 } from 'uuid';

function App() {

// State to manage the current todo input
  const[todo, setTodo] = useState("")

// State to store all the todos
  const[todos, setTodos] = useState([])

// State to toggle the visibility of completed todos
  const [showFinished, setShowFinished] = useState(true);

// Function to toggle the visibility of completed todos
  const toggleFinished = (e) => {
    setShowFinished(!showFinished)
  }
  
// Load todos from localStorage during rendering
  useEffect(() => {
    let todosString = localStorage.getItem("todos")
    if (todosString) {
      let todos = JSON.parse(localStorage.getItem("todos"))
      setTodos(todos)
    }
  },[])

// Function to save the current todos array to localStorage
  const saveToLocalStorage = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }
  
// Edit a todo by filtering and setting its new input value
  const handleEdit = (e, id) => {
    let t = todos.filter(i => i.id === id)
    setTodo(t[0].todo)
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    })
    setTodos(newTodos)
    saveToLocalStorage();
  }

// Delete a todo from the lislt
  const handleDelete = (e, id) => {
    let newTodos = todos.filter(item=>{
      return item.id !== id;
    })
    setTodos(newTodos)
    saveToLocalStorage();
  }

// Handle changes in the input field
  const handleChange = (e) => {
    setTodo(e.target.value)
  }

// Add a new todo to the list 
  const handleAdd = () => {
    setTodos([...todos, {id: uuidv4(), todo, isCompleted: false}])
    setTodo("")
    console.log(todos)
    saveToLocalStorage();
  }

// Toggle the completion status of a todo
  const handleCheckbox = (e) => {
    let id = e.target.name;
    let index = todos.findIndex(item=>{
      return item.id === id;
    })
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted
    setTodos(newTodos)
    saveToLocalStorage();
  }
  
  return (
    <>
      {/* Heading stuff for todo */}
      <div className="app min-h-[70vh] md:container my-10 mx-auto rounded-xl p-5 md:w-150 transition delay-150 duration-400 ease-in-out hover:-translate-y-1 hover:scale-105 md:transition-all ">
        <h1 className='font-bold text-center text-xl'>Taskify - Manages your todos..</h1>
        
        {/* Adding and saving the todo */}
        <div className="addTodo my-4 flex flex-col gap-4">
          <h2 className="text-lg font-bold">Add a Todo</h2>
          <input type="text" onChange={handleChange} placeholder='Write your todo here..' value={todo} className='bg-purple-100 px-2 rounded-md mr-1.5 w-full' />
          <button onClick={handleAdd} disabled={todo.length <= 3} className='bg-violet-700 font-bold cursor-pointer hover:bg-violet-800 p-3 py-1 disabled:bg-violet-500 text-white rounded-md mx-1'>Save</button>
        </div>

        {/* Checkbox to toggle visibility of completed todos */}
        <input type="checkbox" className='my-4 mx-2' onChange={toggleFinished} checked={showFinished}/> 
        Show Finished

        {/* To view the todos list */}
        <h2 className="text-lg font-bold text-center">  Your Todos</h2> 
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div> }
          {todos.map((item, index)=>{

          // Visibility of completed todos is true OR the todo is not completed
          return (showFinished || !item.isCompleted) && <div className="todo  flex my-3 justify-between items-end" key={index}>

            {/* Checkbox to mark todos as completed */}
            <div className='flex gap-5'>
              <input name={item.id} onChange={handleCheckbox} className='w-4 h-6 rounded-md' type="checkbox" checked={todo.isCompleted} />
              <div className={item.isCompleted?"line-through":""}>{item.todo}</div>
            </div>

            {/* Edit and Delete buttons for each todo */}
            <div className="buttons flex h-full">
              <button onClick={(e) => handleEdit(e, item.id)} className='bg-violet-700 font-bold cursor-pointer hover:bg-violet-800 p-3 py-1 text-white rounded-md mx-1'><FaEdit/></button>
              <button onClick={(e)=>{handleDelete(e, item.id)}} className='bg-violet-700 font-bold cursor-pointer hover:bg-violet-800 p-3 py-1 text-white rounded-md mx-1'><MdDelete/></button>
            </div>
          </div>

          })}
        </div>
      </div>
      <pre className='text-center italic text-lg'>
         Build with passion by Dhyan Patel :) 
      </pre>
    </>
  )
} 

export default App
