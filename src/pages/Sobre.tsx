import Header from "../components/Header";
import Footer from "../components/Footer";
import "../assets/styles/pages/Sobre.scss";

const Sobre = () => {
  return (
    <>
      <Header />
      <main className="sobre container">
        <section className="sobre__intro">
          <h1>Sobre o Candy Planner</h1>
          <p>
            O <strong>Candy Planner </strong>
            foi criado pra quem quer organizar a rotina de um jeito leve, colorido e sem pressão. Aqui você acompanha seus hábitos, anota tarefas do dia e vê seu progresso de forma simples e visual. 💖
          </p>
        </section>

        <section className="sobre__how">
          <h2>✨ Como funciona</h2>
          <ul>
            <li>
              <strong>📝 Planner:</strong> um espaço livre pra você
              escrever tarefas do dia, pensamentos, lembretes ou qualquer coisinha importante. É seu cantinho pra descarregar a mente.
            </li>
            <li>
              <strong>💪 Página de Hábitos: </strong>
              adicione seus hábitos semanais (tipo “beber água”, “fazer alongamento” ou “ler 10 minutinhos”) e marque os dias conforme for completando. A barrinha de progresso vai mostrando sua evolução — quanto mais consistente, mais docinho fica o resultado!
            </li>
          </ul>
        </section>

        <section className="sobre__why">
          <h2>O propósito 🍓 </h2>
          <p>
            A ideia é transformar o planejamento em algo divertido e acolhedor sem culpa, sem pressão. Só você, suas metas e pequenas vitórias que deixam o dia mais leve. 🌈
          </p>
        </section>

        <section className="sobre__accessibility">
          <h2>Acessibilidade ♿</h2>
          <p>
            O Candy Planner foi feito com cuidado pra ser acessível a todos: cores com bom contraste, textos claros e botões fáceis de identificar. Organização é pra todo mundo. 💛
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Sobre;
