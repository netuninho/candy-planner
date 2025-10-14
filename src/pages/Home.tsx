import { useState } from 'react'
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

  const [mood, setMood] = useState<string | null>(null);

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
            <HabitList />
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
