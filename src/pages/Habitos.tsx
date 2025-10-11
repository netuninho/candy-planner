import React, { useEffect } from 'react'
import Header from '../components/Header'
import Footer from '../components/Footer'
import Button from '../components/Button';
import '../assets/styles/pages/Habitos.scss'

interface HabitosProps {
  id: number;
  name: string;
  days: { [key: string]: boolean }
};

const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

const Habitos = () => {
  const [habits, setHabits] = React.useState<HabitosProps[]>([]);
  const [newHabit, setNewHabit] = React.useState('');
  const [editingId, setEditingId] = React.useState<number | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('habits')
      if (saved) {
        setHabits(JSON.parse(saved))
      }
    } catch (error) {
      console.error('Erro ao carregar hábitos', error)
    }
  }, [])

  useEffect(() => {
    try {
      if (habits.length > 0) {
        localStorage.setItem('habits', JSON.stringify(habits))
      } else {
        localStorage.removeItem('habits')
      }
    } catch (error) {
      console.error('Erro ao salvar hábitos', error)
    }
  }, [habits])

  const addHabit = () => {
    if (newHabit.trim() === '') return;
    const habit: HabitosProps = {
      id: Date.now(),
      name: newHabit,
      days: Object.fromEntries(weekDays.map(day => [day, false]))
    };
    setHabits([...habits, habit]);
    setNewHabit('');
  };

  const removeHabit = (id: number) => {
    setHabits(habits.filter(habit => habit.id !== id));
  };

  const editHabit = (id: number, newName: string) => {
    setHabits(habits.map(habit => (habit.id === id ? { ...habit, name: newName } : habit)));
  };

  const toggleDay = (id: number, day: string) => {
    setHabits(habits.map(habit => habit.id === id ? { ...habit, days: { ...habit.days, [day]: !habit.days[day] } } : habit));
  };

  const totalDays = habits.length * weekDays.length;
  const completedDays = habits.reduce(
    (acc, h) => acc + Object.values(h.days).filter(Boolean).length,
    0
  );

  const progressPercentage = totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;

  const progressMessage =
    progressPercentage === 0
      ? "Comece o dia com o primeiro passo 🌱"
      : progressPercentage < 50
        ? "Você está indo bem! Continue! 💖"
        : progressPercentage < 100
          ? "Quase lá, mantenha o foco 🍬"
          : "Perfeito! Você arrasou! 🌈";

  return (
    <>
      <Header />
      <main className='habits container'>
        <h1 className='habits__title'>Meus Hábitos</h1>

        <div className='habits__new'>
          <input
            type="text"
            value={newHabit}
            onChange={(e) => setNewHabit(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') addHabit();
            }}
            placeholder='Digite um novo hábito'
            aria-label='Campo para adicionar um novo hábito'
          />

          <Button
            text="Adicionar hábito"
            onClick={addHabit}
            ariaLabel="Adicionar novo hábito"
          />
        </div>

        <table className='habits__table'>
          <thead>
            <tr>
              <th>
                Hábito
              </th>

              {weekDays.map(day => (
                <th key={day}>{day}</th>
              ))}

              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {habits.map(habit => (
              <tr key={habit.id}>
                <td>
                  {editingId === habit.id ? (
                    <input
                      type='text'
                      value={habit.name}
                      onChange={(e) => editHabit(habit.id, e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter') setEditingId(null);
                      }}
                      onBlur={() => setEditingId(null)}
                      aria-label={`Editar hábito: ${habit.name}`}
                      autoFocus
                    />
                  ) : (
                    <span>{habit.name}</span>
                  )}
                </td>

                {weekDays.map(day => (
                  <td key={day}>
                    <input
                      type="checkbox"
                      checked={habit.days[day]}
                      onChange={() => toggleDay(habit.id, day)}
                      aria-label={`${habit.name} - ${day}`}
                    />
                  </td>
                ))}

                <td>
                  <Button
                    text='✏️'
                    onClick={() => setEditingId(habit.id)}
                    ariaLabel={`Editar hábito $habit.name`}
                    variant='icon'
                  />
                  <Button
                    text="✖️"
                    onClick={() => removeHabit(habit.id)}
                    ariaLabel={`Remover hábito ${habit.name}`}
                    variant="icon"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </main >

      <section className="habits__progress container">
        <h2>Seu progresso da semana 💪</h2>
        <div className="habits__progress-bar">
          <div
            className="habits__fill"
            style={{ width: `${progressPercentage}%` }}
            aria-valuenow={progressPercentage}
            aria-valuemin={0}
            aria-valuemax={100}
            role="progressbar"
          ></div>
        </div>
        <p className="habits__progress-text">
          Você completou {completedDays} de {totalDays} tarefas ({progressPercentage}%)
        </p>
        <p className="habits__message">{progressMessage}</p>
      </section>
      <Footer />
    </>
  )
}

export default Habitos
