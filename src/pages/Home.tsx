import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Card from '../components/Card'
import Button from '../components/Button'
import TaskList from "../components/TaskList";
import HabitList from "../components/HabitList";
import MoodSelector from "../components/MoodSelector";
import '../assets/styles/pages/Home.scss'

const Home = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Estudar React", done: false },
    { id: 2, text: "Beber água", done: false },
    { id: 3, text: "Fazer caminhada", done: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, done: !t.done } : t)));
  };

  const [habits, setHabits] = useState<{ id: number; text: string; done: boolean }[]>([]);

  const toggleHabit = (id: number) => {
    setHabits(habits.map(h => (h.id === id ? { ...h, done: !h.done } : h)));
  };

  const [mood, setMood] = useState<string | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('habits');
      if (saved) {
        const parsed = JSON.parse(saved) as {
          id: number;
          name: string;
          days: Record<string, boolean>;
        }[];

        const adapted = parsed.map((habits) => {
          const totalDays = Object.keys(habits.days).length
          const completedDays = Object.values(habits.days).filter(Boolean).length;
          const done = completedDays / totalDays >= 0.5;

          return { id: habits.id, text: habits.name, done };
        });

        setHabits(adapted);
      }
    } catch (error) {
      console.error("Erro ao carregar hábitos", error);
    }
  }, [])

  return (
    <>
      <Header />
      <main className="container">
        <section className="hero">
          <h1 className="hero__title">Organize seus dias com doçura</h1>
          <p className="hero__subtitle">
            Um planner digital para deixar sua rotina mais leve e divertida
          </p>
          <Button text="Começar Agora" link="/" />
        </section>

        <section className="cards">
          <Card title="Tarefas do Dia" color="#FFD3DD">
            <TaskList tasks={tasks} toggleTask={toggleTask} />
          </Card>

          <Card title="Hábitos" color="#C6E6E3">
            <HabitList habits={habits} toggleHabit={toggleHabit} />
          </Card>

          <Card title="Humor do Dia" color="#FFD3DD">
            <MoodSelector mood={mood} setMood={setMood} />
          </Card>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Home
