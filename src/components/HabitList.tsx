import { useEffect, useState } from "react";

interface Habit {
  id: number;
  text: string;
  done: boolean;
}

function HabitList() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('habits');
      if (saved) {
        const parsed = JSON.parse(saved) as {
          id: number;
          name: string;
          days: Record<string, boolean>;
        }[];

        const adapted = parsed.map((habit) => {
          const totalDays = Object.keys(habit.days).length;
          const completedDays = Object.values(habit.days).filter(Boolean).length;
          const done = totalDays > 0 ? completedDays / totalDays >= 0.5 : false;

          return { id: habit.id, text: habit.name, done };
        });

        setHabits(adapted);
      }
    } catch (error) {
      console.error('Erro ao carregar hábitos', error);
    }
  }, []);

  const toggleHabit = (id: number) => {
    const updated = habits.map((h) =>
      h.id === id ? { ...h, done: !h.done } : h
    );

    setHabits(updated);
    localStorage.setItem('habits', JSON.stringify(updated));
  };

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
