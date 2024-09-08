import { useState, useEffect } from 'react'
import './App.css'
import { CreateTodo } from './components/CreateTodo'
import { Todos } from './components/Todo'

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:3000/todos");
        const json = await response.json();
        setTodos(json.todos);
      } catch (error) {
        console.error("Failed to fetch todos:", error);
      }
    };

    fetchTodos();
  }, []);

  return (
    <div>
      <CreateTodo />
      <Todos todos={todos} />
    </div>
  )
}

export default App