import axios from 'axios';
import React, { useEffect, useState } from 'react';
import TodoItem from './TodoItem';

const TodoList = () => {
  const [data, setData] = useState([]);
  const [show, setshow] = useState(false);
  const [newTodo, setNewTodo] = useState('');


  // Function to fetch the data
  const fetchData = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos');
      setData(response.data); // Set the fetched data in the state
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  // Using useEffect to fetch data on component mount
  useEffect(() => {
    fetchData(); // Call the fetch function
  }, []); // Empty dependency array means this runs only on mount

  const handleClick = async (e) => {
    e.preventDefault();
    
    if (newTodo.trim()) {
      try {
        const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
          title: newTodo,
          body: 'bar',
          userId: data.length + 1,
        }, {
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
  
        // Assuming you want to add the new item to your local state as well
        const newTodoItem = response.data;
        setData((prevData) => [...prevData, newTodoItem]); // Update the state with the new data
        setNewTodo(''); // Clear the input field
        console.log("success")
        setshow(!show);
      } catch (error) {
        console.error('Error creating new todo:', error);
      }
    }
  };

  const deleteItem=async(id)=>{
    try {
      const response= await axios.delete(`https://jsonplaceholder.typicode.com/posts/${id}`);
      setData(data.filter(data => data.id !== id));
    } catch (error) {
      console.error(error)
    }

  }
  return (
    <div className=' p-4'>
       <div className="flex items-center justify-between">
       <h4 className=' text-blue-600 p-5 font-bold text-center'>Helllo React</h4>
       <p onClick={()=>setshow(!show)} className=' px-3 py-1 bg-black text-white rounded-md'>+</p>
       </div>
       {show && (
        <form onSubmit={handleClick}>
          <input type="text" className=' border-2 p-1' onChange={(e)=>setNewTodo(e.target.value)} />
          <button className=' ml-2 py-1 px-4 bg-green-500 rounded-md' type='submit'>Add</button>
        </form>
       )}

       <div className="  gap-6 m-auto grid sm:grid-cols-4 ">
       {data.map((todo) => (
          <TodoItem key={todo.id} todo={todo} handleDelete={()=>deleteItem(todo.id)}/>
        ))}
       </div>
     
    </div>
  );
};

export default TodoList;
