import { useState } from "react"

function ContadorTeste() {
  let [contagem, setContagem] = useState(0)

  const aumentar = () => {
    
    console.log('Valor atual:', contagem)
    setContagem(contagem + 1) 
  } 

  return (
    <div>
      <p>Cliques: {contagem}</p>
      <button onClick={aumentar}>+1</button>
    </div>
  )
} 
 export default ContadorTeste