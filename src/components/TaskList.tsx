import { useNotesManager } from "../hooks/useNotesManager";
import { useEffect, useState } from "react";

interface Task {
  id: number;
  text: string;
  done: boolean;
}

export default function TaskList() {
  const { notes } = useNotesManager<Task>("plannerPlans");
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem("plannerPlans");
    if (saved) {
      const parsed: Task[] = JSON.parse(saved);
      setTasks(parsed);
    }
  }, [notes]);

  return (
    <ul className="tasks">
      {tasks.length === 0 && <p>Nenhuma tarefa ainda 💭</p>}

      {tasks.map((task) => (
        <li
          key={task.id}
          className={task.done ? "planner__note--done" : ""}
        >
          <input
            type="checkbox"
            id={`task-${task.id}`}
            checked={!!task.done}
            readOnly
          />
          <label htmlFor={`task-${task.id}`}>{task.text}</label>
        </li>
      ))}
    </ul>
  );
}
