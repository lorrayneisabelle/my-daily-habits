// src/layouts/LayoutPrincipal.jsx
import { Outlet } from 'react-router-dom'
import Header from '../components/header'
// import Footer from '../components/Footer'

function LayoutPrincipal() {
  return (
    <div>
      <Header />
      <Outlet /> {/* Aqui renderiza a página filha */}
      <Footer />
    </div>
  )
}


// App.jsx com rotas aninhadas
<Routes>
  <Route element={<LayoutPrincipal />}>
    <Route path="/"           element={<PaginaInicio />} />
    <Route path="/habitos"    element={<PaginaHabitos />} />
    <Route path="/habito/:id" element={<PaginaDetalhes />} />
  </Route>
  <Route path="*" element={<PaginaNaoEncontrada />} />
</Routes>
