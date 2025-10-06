import React from "react";

interface Task {
  id: number;
  text: string;
  done: boolean;
}

interface TaskListProps {
  tasks: Task[];
  toggleTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, toggleTask }) => {
  return (
    <ul className="tasks">
      {tasks.map(task => (
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
};

export default TaskList;
