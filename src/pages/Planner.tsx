import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useNotesManager } from "../hooks/useNotesManager";
import "../assets/styles/pages/Planner.scss";
import Checkbox from "../components/Checkbox";

interface Plan {
  id: number;
  text: string;
  done: boolean;
}

const Planner = () => {
  const {
    notes: basePlans,
    newText: newPlan,
    setNewText: setNewPlan,
    editingId,
    editedText,
    setEditedText,
    addNote,
    removeNote,
    startEditing,
    saveEdit,
    handleKeyDown,
  } = useNotesManager<Plan>("plannerPlans");

  const [plans, setPlans] = useState<Plan[]>([]);

  useEffect(() => {
    const withDone = basePlans.map((p) => ({
      ...p,
      done: p.done ?? false,
    }));
    setPlans(withDone);
  }, [basePlans]);

  useEffect(() => {
    localStorage.setItem("plannerPlans", JSON.stringify(plans));
  }, [plans]);

  const toggleDone = (id: number) => {
    setPlans((prev) =>
      prev.map((p) => (p.id === id ? { ...p, done: !p.done } : p))
    );
  };

  return (
    <>
      <Header />
      <main className="planner">
        <section className="planner__container">
          <h1 className="planner__title">Meu Planner 📝</h1>

          <div className="planner__input">
            <textarea
              value={newPlan}
              onChange={(e) => setNewPlan(e.target.value)}
              onKeyDown={(e) => handleKeyDown(e)}
              placeholder="Escreva sua anotação..."
            />
            <Button text="Adicionar" variant="secondary" onClick={addNote} />
          </div>

          <div className="planner__notes">
            {plans.length === 0 && <p>Nenhuma anotação ainda 💭</p>}

            {plans.map((plan) => (
              <div key={plan.id} className="planner__note">
                {editingId === plan.id ? (
                  <>
                    <InputField
                      value={editedText}
                      onChange={(e) => setEditedText(e.target.value)}
                      onKeyDown={(e) => handleKeyDown(e, plan.id)}
                      autoFocus
                    />
                    <div>
                      <Button
                        text="💾"
                        variant="icon"
                        ariaLabel="Salvar anotação"
                        onClick={() => saveEdit()}
                      />
                      <Button
                        text="✖️"
                        variant="icon"
                        ariaLabel="Cancelar edição"
                        onClick={() => setEditedText("")}
                      />
                    </div>
                  </>
                ) : (
                  <label
                    htmlFor={`plan-${plan.id}`}
                    className={`planner__label ${plan.done ? "planner__note--done" : ""}`}
                  >
                    <Checkbox
                      id={`plan-${plan.id}`}
                      checked={plan.done}
                      onChange={() => toggleDone(plan.id)}
                    />
                    <span className="planner__label--text">{plan.text}</span>
                    <div>
                      <Button
                        text="✏️"
                        variant="icon"
                        ariaLabel="Editar anotação"
                        onClick={() => startEditing(plan.id, plan.text)}
                      />
                      <Button
                        text="✖️"
                        variant="icon"
                        ariaLabel="Excluir anotação"
                        onClick={() => removeNote(plan.id)}
                      />
                    </div>
                  </label>

                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Planner;
