// src/hooks/useTheme.js
import { useState, useEffect } from 'react'

const useTheme = () => {
  // Inicializa o estado do tema com base no localStorage ou preferência do sistema
  const [theme, setTheme] = useState(() => {
    // Tenta obter o tema salvo no localStorage
    const savedTheme = localStorage.getItem('theme')
    if (savedTheme) {
      return savedTheme
    }
    // Se não houver tema salvo, verifica a preferência do sistema
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
  })

  // useEffect para aplicar a classe 'dark-mode' ao <html>
  useEffect(() => {
    const root = window.document.documentElement // Pega o elemento <html>
    const isDarkMode = theme === 'dark'

    // Adiciona ou remove a classe 'dark-mode'
    root.classList.remove(isDarkMode ? 'light-mode' : 'dark-mode') // Remove a oposta para garantir
    root.classList.add(isDarkMode ? 'dark-mode' : 'light-mode') // Adiciona a classe correta

    // Salva a preferência do tema no localStorage
    localStorage.setItem('theme', theme)
  }, [theme]) // Roda sempre que o estado 'theme' mudar

  // Função para alternar o tema
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
  }

  return [theme, toggleTheme] // Retorna o tema atual e a função para alterná-lo
}

export default useTheme
