import { useState, useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import "../assets/styles/pages/Planner.scss";
import InputField from "../components/InputField";

interface Plano {
  id: number;
  text: string;
}

function Planner() {
  const [plans, setPlans] = useState<Plano[]>([]);
  const [newPlan, setNewPlan] = useState("");
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editedText, setEditedText] = useState("");

  useEffect(() => {
    try {
      const saved = localStorage.getItem("plannerPlans");
      if (saved) setPlans(JSON.parse(saved));
    } catch (error) {
      console.error("Erro ao carregar planos", error);
    }
  }, []);

  useEffect(() => {
    try {
      if (plans.length > 0) {
        localStorage.setItem("plannerPlans", JSON.stringify(plans));
      } else {
        localStorage.removeItem("plannerPlans");
      }
    } catch (error) {
      console.error("Erro ao salvar planos", error);
    }
  }, [plans]);

  const addPlan = () => {
    if (!newPlan.trim()) return;
    const newItem: Plano = { id: Date.now(), text: newPlan.trim() };
    setPlans([...plans, newItem]);
    setNewPlan("");
  };

  const removePlan = (id: number) => {
    setPlans(plans.filter(plan => plan.id !== id));
  };

  const startEditing = (id: number, text: string) => {
    setEditingId(id);
    setEditedText(text);
  };

  const saveEdit = (id: number) => {
    if (!editedText.trim()) return;
    setPlans(plans.map(plan =>
      plan.id === id ? { ...plan, text: editedText } : plan
    ));
    setEditingId(null);
    setEditedText("");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, id?: number) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (editingId !== null && id !== undefined) {
        saveEdit(id);
      } else {
        addPlan();
      }
    }
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
            <Button text="Adicionar" variant="secondary" onClick={addPlan} />
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
                        onClick={() => saveEdit(plan.id)}
                      />
                      <Button
                        text="✖️"
                        variant="icon"
                        ariaLabel="Cancelar edição"
                        onClick={() => setEditingId(null)}
                      />
                    </div>
                  </>
                ) : (
                  <>
                    <p>{plan.text}</p>
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
                        onClick={() => removePlan(plan.id)}
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}

export default Planner;
