import { useState, useEffect } from 'react';
import { collection, query, onSnapshot, doc, setDoc, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { Plus, Clock, CheckCircle2, Circle } from 'lucide-react';

// WICHTIG: Nutze exakt diesen Pfad für die my-new-app App
const APP_ID = 'my_new_app__my_new_app_v1';
const TASKS_PATH = `apps/${APP_ID}/tasks`;

interface Task {
  id: string;
  title: string;
  status: 'open' | 'in_progress' | 'done';
  priority: 'low' | 'medium' | 'high';
  dueDate: Timestamp;
}

export function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, TASKS_PATH));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const taskData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Task[];
      setTasks(taskData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleAddTask = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    // REGEL: Menschenlesbare, slugifizierte IDs anstatt zufälliger Strings
    const slugifiedId = newTaskTitle
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '_')
      .replace(/(^_|_$)/g, '');
    
    const taskId = `task_${slugifiedId}_${Date.now().toString().slice(-4)}`;

    try {
      await setDoc(doc(db, TASKS_PATH, taskId), {
        title: newTaskTitle,
        status: 'open',
        priority: 'medium',
        dueDate: Timestamp.now()
      });
      setNewTaskTitle('');
    } catch (error) {
      console.error("Error adding task: ", error);
      alert("Fehler beim Speichern des Tasks. Bitte Firebase-Regeln prüfen.");
    }
  };

  const toggleTaskStatus = async (task: Task) => {
    const newStatus = task.status === 'done' ? 'open' : 'done';
    try {
      await setDoc(doc(db, TASKS_PATH, task.id), { status: newStatus }, { merge: true });
    } catch (error) {
      console.error("Error updating task: ", error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'done': return <CheckCircle2 className="text-green-500" size={20} />;
      case 'in_progress': return <Clock className="text-yellow-500" size={20} />;
      default: return <Circle className="text-gray-400" size={20} />;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
        <h2 className="text-lg font-serif font-semibold mb-4">Neuen Task erstellen</h2>
        <form onSubmit={handleAddTask} className="flex gap-4">
          <input
            type="text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
            placeholder="Task Beschreibung..."
            className="flex-1 p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          />
          <button 
            type="submit"
            className="bg-secondary text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors flex items-center gap-2"
          >
            <Plus size={20} />
            Hinzufügen
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-serif font-semibold">Aktive Tasks</h2>
        </div>
        
        {loading ? (
          <div className="p-8 text-center text-gray-500">Lade Tasks...</div>
        ) : tasks.length === 0 ? (
          <div className="p-8 text-center text-gray-500">Keine Tasks vorhanden.</div>
        ) : (
          <ul className="divide-y divide-gray-100">
            {tasks.map((task) => (
              <li key={task.id} className="p-4 hover:bg-gray-50 flex items-center gap-4 transition-colors">
                <button onClick={() => toggleTaskStatus(task)} className="focus:outline-none">
                  {getStatusIcon(task.status)}
                </button>
                <div className="flex-1">
                  <p className={`font-medium ${task.status === 'done' ? 'text-gray-400 line-through' : 'text-gray-800'}`}>
                    {task.title}
                  </p>
                  <p className="text-xs text-gray-400 mt-1 font-mono">ID: {task.id}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${
                  task.priority === 'high' ? 'bg-red-100 text-red-700' : 
                  task.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' : 
                  'bg-green-100 text-green-700'
                }`}>
                  {task.priority}
                </span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
