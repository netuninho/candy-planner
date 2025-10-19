import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import InputField from "../components/InputField";
import "../assets/styles/pages/Habitos.scss";
import { useNotesManager } from "../hooks/useNotesManager";
import Checkbox from "../components/Checkbox";

const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

interface Habit {
  id: number;
  text: string;
  days: Record<string, boolean>;
}

const Habitos = () => {
  const {
    notes: habits,
    newText: newHabit,
    setNewText: setNewHabit,
    editingId,
    editedText,
    setEditedText,
    addNote,
    removeNote,
    startEditing,
    saveEdit,
    handleKeyDown,
    updateNote,
  } = useNotesManager<Habit>("habits");

  const getHabitWithDays = (habit: Habit): Habit => ({
    ...habit,
    days: habit.days || Object.fromEntries(weekDays.map((d) => [d, false])),
  });

  const fullHabits = habits.map(getHabitWithDays);

  const toggleDay = (id: number, day: string) => {
    const habit = fullHabits.find((h) => h.id === id);
    if (!habit) return;

    const updatedDays = {
      ...habit.days,
      [day]: !habit.days[day],
    };

    updateNote(id, { days: updatedDays });
  };

  const totalDays = fullHabits.length * weekDays.length;
  const completedDays = fullHabits.reduce(
    (acc, h) => acc + Object.values(h.days).filter(Boolean).length,
    0
  );
  const progressPercentage =
    totalDays > 0 ? Math.round((completedDays / totalDays) * 100) : 0;

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
      <div className="container">
        <main className="habits">
          <div className="habits__container">
            <h1 className="habits__title">Meus Hábitos</h1>

            <div className="habits__new">
              <InputField
                type="text"
                value={newHabit}
                onChange={(e) => setNewHabit(e.target.value)}
                onKeyDown={(e) => handleKeyDown(e)}
                placeholder="Digite um novo hábito"
                aria-label="Campo para adicionar um novo hábito"
              />
              <Button
                text="Adicionar hábito"
                onClick={addNote}
                ariaLabel="Adicionar novo hábito"
                variant="primary"
              />
            </div>
          </div>

          <table className="habits__table">
            <thead>
              <tr>
                <th>Hábito</th>
                {weekDays.map((day) => (
                  <th key={day}>{day}</th>
                ))}
                <th>Ações</th>
              </tr>
            </thead>

            <tbody>
              {fullHabits.map((habit) => (
                <tr key={habit.id}>
                  <td>
                    {editingId === habit.id ? (
                      <InputField
                        type="text"
                        value={editedText}
                        onChange={(e) => setEditedText(e.target.value)}
                        onKeyDown={(e) => handleKeyDown(e, habit.id)}
                        aria-label={`Editar hábito: ${habit.text}`}
                        autoFocus
                      />
                    ) : (
                      <span datatype="title">{habit.text}</span>
                    )}
                  </td>

                  {weekDays.map((day) => (
                    <td key={day} data-label={day}>
                      <Checkbox
                        checked={habit.days[day]}
                        onChange={() => toggleDay(habit.id, day)}
                        aria-label={`${habit.text} - ${day}`}
                      />
                    </td>
                  ))}

                  <td datatype="buttons">
                    {editingId === habit.id ? (
                      <>
                        <Button
                          icon="save"
                          onClick={() => saveEdit()}
                          ariaLabel={`Salvar edição de ${habit.text}`}
                          variant="icon"
                        />
                      </>
                    ) : (
                      <>
                        <Button
                          icon="edit"
                          onClick={() => startEditing(habit.id, habit.text)}
                          ariaLabel={`Editar hábito ${habit.text}`}
                          variant="icon"
                        />
                        <Button
                          icon="delete"
                          onClick={() => removeNote(habit.id)}
                          ariaLabel={`Remover hábito ${habit.text}`}
                          variant="icon"
                        />
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </main>

        <section className="habits__progress">
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
            Você completou {completedDays} de {totalDays} tarefas (
            {progressPercentage}%)
          </p>
          <p className="habits__message">{progressMessage}</p>
        </section>
      </div>
      <Footer />
    </>
  );
};

export default Habitos;
