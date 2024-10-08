import React from 'react'
import Hello from './components/Hello'
import { Routes,Route } from 'react-router-dom'
import TodoList from './components/TodoList'
const App = () => {
  return (
    <Routes>
       <Route path="/" element={<TodoList />} />
    </Routes>
  )
}

export default App
