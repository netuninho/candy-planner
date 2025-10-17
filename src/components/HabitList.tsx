import { useEffect, useState } from "react";

interface Habit {
  id: number;
  text: string;
  days?: Record<string, boolean>;
  done: boolean;
}

function HabitList() {
  const [habits, setHabits] = useState<Habit[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("habits");
      if (saved) {
        const parsed = JSON.parse(saved) as {
          id: number;
          text: string;
          days?: Record<string, boolean>;
        }[];

        const adapted = parsed.map((habit) => {
          const totalDays = habit.days ? Object.keys(habit.days).length : 0;
          const completedDays = habit.days
            ? Object.values(habit.days).filter(Boolean).length
            : 0;
          const done = totalDays > 0 ? completedDays / totalDays >= 0.5 : false;

          return { ...habit, done };
        });

        setHabits(adapted);
      }
    } catch (error) {
      console.error("Erro ao carregar hábitos", error);
    }
  }, []);

  if (habits.length === 0) {
    return (
      <p style={{ textAlign: "center" }}>
        Nenhum hábito adicionado ainda 🌱
      </p>
    );
  }

  return (
    <ul className="habits__card">
      {habits.map((habit) => (
        <li key={habit.id}>
          <input
            type="checkbox"
            id={`habit-${habit.id}`}
            checked={habit.done}
            readOnly
          />
          <label htmlFor={`habit-${habit.id}`}>{habit.text}</label>
        </li>
      ))}
    </ul>
  );
}

export default HabitList;
