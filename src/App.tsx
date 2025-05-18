import React, { useState, useEffect } from 'react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem('todos');
    return savedTodos ? JSON.parse(savedTodos) : [];
  });
  const [inputValue, setInputValue] = useState<string>('');
  const [filter, setFilter] = useState<'all' | 'active' | 'completed'>('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (inputValue.trim() !== '') {
      const newTodo: Todo = {
        id: Date.now(),
        text: inputValue,
        completed: false,
      };
      setTodos([...todos, newTodo]);
      setInputValue('');
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  const activeTodosCount = todos.filter((todo) => !todo.completed).length;

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Todo App</h1>
      
      <div style={styles.inputContainer}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && addTodo()}
          placeholder="What needs to be done?"
          style={styles.input}
        />
        <button onClick={addTodo} style={styles.addButton}>
          Add
        </button>
      </div>
      
      {todos.length > 0 && (
        <div style={styles.filterContainer}>
          <button 
            onClick={() => setFilter('all')} 
            style={{
              ...styles.filterButton,
              ...(filter === 'all' ? styles.activeFilter : {})
            }}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('active')} 
            style={{
              ...styles.filterButton,
              ...(filter === 'active' ? styles.activeFilter : {})
            }}
          >
            Active
          </button>
          <button 
            onClick={() => setFilter('completed')} 
            style={{
              ...styles.filterButton,
              ...(filter === 'completed' ? styles.activeFilter : {})
            }}
          >
            Completed
          </button>
        </div>
      )}
      
      <ul style={styles.todoList}>
        {filteredTodos.map((todo) => (
          <li key={todo.id} style={styles.todoItem}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleTodo(todo.id)}
              style={styles.checkbox}
            />
            <span style={{
              ...styles.todoText,
              ...(todo.completed ? styles.completedTodo : {})
            }}>
              {todo.text}
            </span>
            <button
              onClick={() => deleteTodo(todo.id)}
              style={styles.deleteButton}
            >
              ×
            </button>
          </li>
        ))}
      </ul>
      
      {todos.length > 0 && (
        <div style={styles.footer}>
          <span>{activeTodosCount} items left</span>
          <button onClick={clearCompleted} style={styles.clearButton}>
            Clear completed
          </button>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  title: {
    textAlign: 'center' as const,
    color: '#333',
  },
  inputContainer: {
    display: 'flex',
    marginBottom: '20px',
  },
  input: {
    flex: '1',
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px 0 0 4px',
    border: '1px solid #ddd',
    borderRight: 'none',
  },
  addButton: {
    padding: '10px 15px',
    backgroundColor: '#4CAF50',
    color: 'white',
    border: 'none',
    borderRadius: '0 4px 4px 0',
    cursor: 'pointer',
  },
  todoList: {
    listStyleType: 'none',
    padding: '0',
    margin: '0',
  },
  todoItem: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    borderBottom: '1px solid #eee',
  },
  checkbox: {
    marginRight: '10px',
  },
  todoText: {
    flex: '1',
  },
  completedTodo: {
    textDecoration: 'line-through',
    color: '#888',
  },
  deleteButton: {
    backgroundColor: 'transparent',
    color: '#ff6b6b',
    border: 'none',
    fontSize: '20px',
    cursor: 'pointer',
    padding: '0 5px',
  },
  filterContainer: {
    display: 'flex',
    justifyContent: 'center',
    margin: '15px 0',
  },
  filterButton: {
    margin: '0 5px',
    padding: '5px 10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    backgroundColor: 'white',
    cursor: 'pointer',
  },
  activeFilter: {
    borderColor: '#4CAF50',
    color: '#4CAF50',
  },
  footer: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: '10px 0',
    color: '#777',
    fontSize: '14px',
  },
  clearButton: {
    backgroundColor: 'transparent',
    border: 'none',
    color: '#777',
    cursor: 'pointer',
    textDecoration: 'underline',
  },
};

export default App;