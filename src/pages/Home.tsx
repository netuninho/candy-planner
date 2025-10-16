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
          <Button
            text="Começar Agora"
            link="/planner"
            variant='primary'
          />
        </section>

        <section className="cards">
          <Card title="Planner" color="#FFD3DD">
            <TaskList />
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
