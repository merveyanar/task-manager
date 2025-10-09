import { useState, useEffect } from 'react';  // useEffect eklendi

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  const handleAddTask = async () => {
    if (!input.trim()) return;
    try {
      const response = await fetch('http://localhost:8080/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title: input, completed: false }),
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setInput('');
    } catch (error) {
      console.error('Görev eklenirken hata:', error);
    }
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:8080/api/tasks');
        const data = await response.json();
        setTasks(data);
      } catch (error) {
        console.error('Görevler çekilirken hata:', error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="flex justify-center items-start pt-20 min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">
      <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-md">
        <h1 className="text-3xl font-extrabold text-purple-700 mb-6 text-center">
          🎨 Renkli Task Manager
        </h1>

        {/* Kompakt görev ekleme formu */}
        <div className="flex mb-6">
          <input
            className="flex-grow p-3 rounded-l-md border border-purple-300 focus:outline-none focus:ring-4 focus:ring-pink-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Yeni görev gir"
            onKeyDown={(e) => { if (e.key === 'Enter') handleAddTask(); }}
          />
          <button
            onClick={handleAddTask}
            className="bg-pink-500 text-white px-5 rounded-r-md hover:bg-pink-600 transition"
          >
            Ekle
          </button>
        </div>

        <ul className="space-y-4 max-h-96 overflow-auto">
          {tasks.map(task => (
            <li
              key={task.id}
              className="p-4 rounded-md shadow-md bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 text-purple-900 font-semibold flex justify-between items-center"
            >
              {task.title}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
