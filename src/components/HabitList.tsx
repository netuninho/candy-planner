interface Habit {
  id: number;
  text: string;
  done: boolean;
}

interface HabitListProps {
  habits: Habit[];
  toggleHabit: (id: number) => void;
}

function HabitList({ habits, toggleHabit }: HabitListProps) {
  if (habits.length === 0) {
    return <p style={{ textAlign: "center" }}>Nenhum hábito adicionado ainda 🌱</p>;
  }

  return (
    <ul className="habits__card">
      {habits.map((habit) => (
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
}

export default HabitList;
