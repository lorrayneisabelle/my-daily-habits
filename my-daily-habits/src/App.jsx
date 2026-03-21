import Header from './components/Header';
import Footer from './components/footer';
import BemVindo from './components/bemvindo';
import SecaoHabitos from './components/SecaoHabitos';
import HabitList from './components/HabitList';
import ContadorTeste from './ContadorTeste';

function App() {
  const habits = [
    { id: 1, titulo: 'Exercício',   meta: 5, ativo: true,  diasFeitos: 5 },
    { id: 2, titulo: 'Leitura',     meta: 7, ativo: true,  diasFeitos: 3 },
    { id: 3, titulo: 'Meditação',   meta: 7, ativo: false, diasFeitos: 0 },
    { id: 4, titulo: 'Hidratação',  meta: 7, ativo: true,  diasFeitos: 6 },
    { id: 5, titulo: 'Sono',        meta: 7, ativo: true,  diasFeitos: 4 },
  ];

  return (
    <div>
      <ContadorTeste /> 
      <Header />
      <BemVindo nomeUsuario="Isabelle Falconi" totalHabitos={habits.length} />
      <SecaoHabitos titulo="Meus Hábitos">
        <HabitList habits={habits} />
      </SecaoHabitos>
      <Footer />
    </div>
  );
}

export default App;


