// src/App.jsx
import React, { useEffect } from 'react'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Home from './pages/Home'
import './styles/global.css'
import './styles/themes.css'
import useTheme from './hooks/useTheme'

function App() {
  const [theme, toggleTheme] = useTheme() // Usa o hook para gerenciar o tema

  // Inicializa o AOS quando o componente App é montado
  useEffect(() => {
    AOS.init({
      // Definições globais para as animações
      duration: 1000, // Duração padrão das animações em milissegundos
      easing: 'ease-in-out', // Tipo de easing para as animações (suavidade)
      once: true, // Se true, a animação só ocorre uma vez ao rolar para baixo
      mirror: false, // Se true, a animação acontece novamente ao rolar para cima
    })
    // Força uma atualização do AOS para garantir que ele detecte todos os elementos
    // especialmente útil se o conteúdo for carregado dinamicamente
    AOS.refresh()
  }, []) // O array vazio [] garante que este efeito seja executado apenas uma vez, no montagem do componente

  return (
    // Passa 'theme' e 'toggleTheme' para o componente Home
    // Home é o contêiner das seções, então ele repassará para Hero
    <div>
      <Home theme={theme} toggleTheme={toggleTheme} />
    </div>
  )
}

export default App
