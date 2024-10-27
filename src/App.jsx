import React, { useEffect, useState } from 'react';
import { FaCalendarCheck } from "react-icons/fa";
import { MdDeleteOutline } from "react-icons/md";
import { FaHandPointRight } from "react-icons/fa";


const App = () => {
  
  const [inputValue, setInputValue] = useState('');
  const [todos, setTodos] = useState(localStorage.getItem("todos")?JSON.parse(localStorage.getItem("todos")):[]);

  const handleChange = (e) => {
    setInputValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const handleDelete = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  useEffect(()=>{
   localStorage.setItem("todos",JSON.stringify(todos))
  },[todos])
  return (
    <div className='min-h-screen bg-gradient-to-t from-violet-500 to bg-slate-300 flex justify-center items-center'>
      {/* ----Main-container---- */}
      <div className="todo-container bg-slate-200 h-auto sm:h-[600px] sm:w-[600px] p-5 ">
        <div className="header flex justify-center gap-[1.5rem] items-center font-bold w-full">
          <FaCalendarCheck className='text-4xl ' />
          <h1 className='text-4xl'>Todo-List-App</h1>
        </div>
        <form onSubmit={handleSubmit} className='flex justify-center items-center mt-10 flex-col'>
          <input 
            value={inputValue} 
            onChange={handleChange} 
            className='py-2 px-24 border border-violet-500 my-8' 
            type="text" 
            placeholder='Add Todo' 
          />
          <button className='border border-violet-500 rounded-full px-12 py-3 hover:bg-violet-500 duration-700 my-4 hover:text-white' type="submit">Submit</button>
        </form> 
        <ul >
          {todos.map((todo, index) => (
            <li className={`flex px-4 justify-between items-center cursor-pointer my-6 `} key={index}>
              <div className='flex  items-center gap-4 text-2xl'>
              <FaHandPointRight />
              <span  className='text-lg'>{todo}</span></div>
              <MdDeleteOutline onClick={() => handleDelete(index)} className='text-2xl cursor-pointer hover:translate-y-[-10px] duration-300 hover:text-violet-500' />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
