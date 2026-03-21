// src/components/HabitCard.jsx
function HabitCard({ nome, descricao = '', meta, ativo = true, diasFeitos = 0, onRemover }) {
  // Lógica de exibição baseada em props
  const metaAtingida = diasFeitos >= meta;
  const mensagemMeta = metaAtingida 
    ? 'Meta da semana atingida!!' 
    : `${diasFeitos} de ${meta} dias concluídos`;

  return (
    <div className="habit-card">
      <h3>{nome}</h3>
      {descricao && <p>{descricao}</p>}
      <p>{mensagemMeta}</p>
      
      {/* Ternário para status */}
      <span>{ativo ? 'Ativo' : 'Pausado'}</span>

      {/* Operador && para badge */}
      {metaAtingida && <p>Parabéns! Meta da semana atingida!</p>}

      {/* Dispara o evento de remoção para o componente pai */}
      {onRemover && (
        <button type="button" onClick={onRemover}>
          Remover
        </button>
      )}
    </div>
  );
}

export default HabitCard;
