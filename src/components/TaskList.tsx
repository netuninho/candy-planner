import { useNotesManager } from "../hooks/useNotesManager";
import { useState } from "react";

interface Task {
  id: number;
  text: string;
  done: boolean;
}

export default function TaskList() {
  const { notes } = useNotesManager("plannerPlans");
  const [tasks, setTasks] = useState<Task[]>(
    notes.map((note) => ({ ...note, done: false }))
  );

  const toggleTask = (id: number) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  return (
    <ul className="tasks">
      {tasks.length === 0 && <p>Nenhuma tarefa ainda 💭</p>}

      {tasks.map((task) => (
        <li key={task.id}>
          <input
            type="checkbox"
            id={`task-${task.id}`}
            checked={task.done}
            onChange={() => toggleTask(task.id)}
          />
          <label htmlFor={`task-${task.id}`}>{task.text}</label>
        </li>
      ))}
    </ul>
  );
}
