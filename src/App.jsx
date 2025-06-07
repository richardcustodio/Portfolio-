import React, { useEffect } from 'react'
import AOS from 'aos' // Biblioteca para animações de rolagem
import 'aos/dist/aos.css' // Estilos do AOS
import Home from './pages/Home' // Componente principal da página
import './styles/global.css' // Estilos globais
import './styles/themes.css' // Estilos de tema
import useTheme from './hooks/useTheme' // Hook personalizado para gerenciamento de tema

function App() {
  const [theme, toggleTheme] = useTheme() // Gerencia o estado do tema e a função para alterná-lo

  // Inicializa a biblioteca AOS para animações ao carregar o componente.
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duração padrão das animações em milissegundos.
      easing: 'ease-in-out', // Suavidade da animação.
      once: true, // Animação ocorre apenas uma vez ao rolar para baixo.
      mirror: false, // Animação não se repete ao rolar para cima.
    })
    // Força uma atualização do AOS para garantir que todos os elementos sejam detectados.
    AOS.refresh()
  }, []) // O efeito executa apenas uma vez na montagem do componente.

  return (
    <div>
      {/* Renderiza o componente Home, passando o tema atual e a função de alternância. */}
      <Home theme={theme} toggleTheme={toggleTheme} />
    </div>
  )
}

export default App
