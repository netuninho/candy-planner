import React from "react";

interface Habit {
  id: number;
  text: string;
  done: boolean;
}

interface HabitListProps {
  habits: Habit[];
  toggleHabit: (id: number) => void;
}

const HabitList: React.FC<HabitListProps> = ({ habits, toggleHabit }) => {
  return (
    <ul className="habits">
      {habits.map(habit => (
        <li key={habit.id}>
          <input
            type="checkbox"
            id={`habit-${habit.id}`}
            checked={habit.done}
            onChange={() => toggleHabit(habit.id)}
          />
          <label htmlFor={`habit-${habit.id}`}>{habit.text}</label>
        </li>
      ))}
    </ul>
  );
};

export default HabitList;
