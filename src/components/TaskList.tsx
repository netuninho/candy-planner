import { useNotesManager } from "../hooks/useNotesManager";
import { useEffect, useState } from "react";
import Checkbox from "./Checkbox";

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
          className={task.done ? "planner__note--done" : "planner__note--unchecked"}
        >
          <Checkbox
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
