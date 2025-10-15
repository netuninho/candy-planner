import Header from "../components/Header";
import Footer from "../components/Footer";
import Button from "../components/Button";
import InputField from "../components/InputField";
import { useNotesManager } from "../hooks/useNotesManager";
import "../assets/styles/pages/Planner.scss";

function Planner() {
  const {
    notes: plans,
    newText: newPlan,
    setNewText: setNewPlan,
    editingId,
    editedText,
    setEditedText,
    addNote: addPlan,
    removeNote: removePlan,
    startEditing,
    saveEdit,
    handleKeyDown,
  } = useNotesManager("plannerPlans");

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
                        onClick={() => setEditedText("")}
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
