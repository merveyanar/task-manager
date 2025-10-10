import { useState, useEffect } from 'react';  // useEffect eklendi

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');
  const [description, setDescription] = useState('');

  const handleAddTask = async () => {
    if (!input.trim()) return;

    // Bugünün tarihi: "YYYY-MM-DD" formatında
    const today = new Date().toISOString().split('T')[0];
    const newTaskData = {
      title: input,
      description: description,
      dueDate: today,
      status: 'OPEN',
    };
    try {
      const response = await fetch('http://localhost:8080/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTaskData),
      });
      const newTask = await response.json();
      setTasks([...tasks, newTask]);
      setInput('');
      setDescription('');
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
          Görev Yönetimi
        </h1>

        <div className="flex mb-6">
          <input
            className="flex-grow p-3 rounded-l-md border border-purple-300 focus:outline-none focus:ring-4 focus:ring-pink-400"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Yeni görev gir"
            onKeyDown={(e) => { if (e.key === 'Enter') handleAddTask(); }}
          />
          <textarea
            className="w-full p-3 rounded-md border border-purple-300 focus:outline-none focus:ring-4 focus:ring-purple-400"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Açıklama girin (isteğe bağlı)"
            rows={3}
          />
          <button
            onClick={handleAddTask}
            className="bg-pink-500 text-white px-5 rounded-r-md hover:bg-pink-600 transition"
          >
            Ekle
          </button>
        </div>

        <table className="w-full table-auto border border-gray-300 text-left text-purple-900">
          <thead className="bg-purple-100 text-purple-700">
            <tr>
              <th className="border px-4 py-2">Başlık</th>
              <th className="border px-4 py-2">Açıklama</th>
              <th className="border px-4 py-2">Durum</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id} className="hover:bg-pink-50">
                <td className="border px-4 py-2">{task.title}</td>
                <td className="border px-4 py-2">{task.description || '-'}</td>
                <td className="border px-4 py-2">{task.status}</td>
              </tr>
            ))}
          </tbody>
        </table>


      </div>
    </div>
  );
}

export default App;
