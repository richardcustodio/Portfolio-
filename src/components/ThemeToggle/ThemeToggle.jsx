// src/components/ThemeToggle/ThemeToggle.jsx
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSun, faMoon } from '@fortawesome/free-solid-svg-icons'
import styles from './ThemeToggle.module.css'

function ThemeToggle({ theme, toggleTheme }) {
  return (
    <button
      className={styles.themeToggleButton}
      onClick={toggleTheme}
      aria-label={theme === 'light' ? 'Ativar modo escuro' : 'Ativar modo claro'}
    >
      <FontAwesomeIcon icon={theme === 'light' ? faMoon : faSun} />
    </button>
  )
}

export default ThemeToggle
