// src/components/HabitList.jsx
import { useState, useEffect, useRef } from 'react';
import HabitCard from './HabitCard';

function HabitList() {
  
  const [habits, setHabits] = useState(() => {
    const stored = localStorage.getItem('my-daily-habits');

    if (!stored) return [
      { id: 1, nome: 'Exercício',  descricao: 'Treino de força',   meta: 5, ativo: true,  diasFeitos: 5 },
      { id: 2, nome: 'Leitura',    descricao: 'Livro ou artigo',   meta: 7, ativo: true,  diasFeitos: 3 },
      { id: 3, nome: 'Meditação',  descricao: 'Respiração e foco', meta: 7, ativo: false, diasFeitos: 0 },
      { id: 4, nome: 'Hidratação', descricao: 'Beber 2L de água',  meta: 7, ativo: true,  diasFeitos: 6 },
    ];

    try {
      return JSON.parse(stored);
    } catch {
      return [];
    }
  });

 
  const [novonome, setNovoNome] = useState('');
  const [novaDescricao, setNovaDescricao] = useState('');
  const [novaCategoria, setNovaCategoria] = useState('');
  const [novaMeta, setNovaMeta] = useState(7); 
  const [erroNome, setErroNome] = useState(''); 
  const [erroMeta, setErroMeta] = useState(''); 

  
  const nomeInputRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('my-daily-habits', JSON.stringify(habits));
  }, [habits]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'novonome') {
      setNovoNome(value);
     
      if (value.length > 0 && value.length < 3) {
        setErroNome('O nome deve ter pelo menos 3 caracteres.');
      } else {
        setErroNome('');
      }
    }

    if (name === 'novaDescricao') setNovaDescricao(value);
    if (name === 'novaCategoria') setNovaCategoria(value);

    
    if (name === 'novaMeta') {
      const num = parseInt(value);
      setNovaMeta(value);
      if (num < 1 || num > 7) {
        setErroMeta('Meta deve ser entre 1 e 7 dias.');
      } else {
        setErroMeta('');
      }
    }
  };

  const removerHabit = (id) => {
    setHabits(habits.filter(habit => habit.id !== id)); 
  };

  const adicionarHabit = (event) => {
    event.preventDefault();

    
    if (!novonome.trim()) {
      alert('Informe um nome para o hábito.');
      return;
    }
    if (erroNome || erroMeta) {
      nomeInputRef.current?.focus();
      return;
    }

    const novoHabit = {
      id: Date.now(),
      nome: novonome,
      descricao: novaDescricao,
      meta: parseInt(novaMeta),
      ativo: true,
      diasFeitos: 0,
      categoria: novaCategoria || 'Geral',
    };

    setHabits(prev => [...prev, novoHabit]); 
    
    
    setNovoNome('');
    setNovaDescricao('');
    setNovaCategoria('');
    setNovaMeta(7);
    nomeInputRef.current?.focus(); 
  };

  const limparHistorico = () => {
    localStorage.removeItem('my-daily-habits');
    window.location.reload();
  };

  return (
    <section>
      <form onSubmit={adicionarHabit} className="habit-form">
        <div>
          <label>
            Nome do hábito 
            <input 
              type="text" 
              name="novonome" 
              value={novonome} 
              onChange={handleChange} 
              ref={nomeInputRef} 
            />
          </label>
          {erroNome && <p style={{ color: 'red', fontSize: '0.8rem' }}>{erroNome}</p>}
        </div>

        <div>
          <label>
            Meta Semanal (1-7)
            <input 
              type="number" 
              name="novaMeta" 
              value={novaMeta} 
              onChange={handleChange} 
            />
          </label>
          {erroMeta && <p style={{ color: 'red', fontSize: '0.8rem' }}>{erroMeta}</p>}
        </div>

        <div>
          <label>Descrição
            <input type="text" name="novaDescricao" value={novaDescricao} onChange={handleChange} />
          </label>
        </div>

        <div>
          <label>Categoria
            <input type="text" name="novaCategoria" value={novaCategoria} onChange={handleChange} />
          </label>
        </div>

        <button type="submit">Adicionar hábito</button>
      </form>

      <div style={{ textAlign: 'center', margin: '15px 0' }}>
        <button type="button" onClick={limparHistorico}>Limpar Histórico</button>
      </div>

      <ul>
        {habits.length === 0 && <p>Nenhum hábito cadastrado ainda.</p>}
        {habits.map((habit) => (
          <HabitCard
            key={habit.id}
            nome={habit.nome}
            descricao={habit.descricao}
            meta={habit.meta}
            ativo={habit.ativo}
            diasFeitos={habit.diasFeitos}
            onRemover={() => removerHabit(habit.id)}
          />
        ))}
      </ul>
    </section>
  );
}

export default HabitList;