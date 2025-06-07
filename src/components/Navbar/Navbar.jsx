import React, { useState } from 'react'
import styles from './Navbar.module.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons' // faBars para hambúrguer, faTimes para o 'X'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const currentPath = typeof window !== 'undefined' ? window.location.hash : ''

  const handleSmoothScroll = (event) => {
    event.preventDefault()
    const targetId = event.currentTarget.getAttribute('href').substring(1)
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
    setIsOpen(false)
  }

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }

  return (
    <nav className={styles.navbar} aria-label="Navegação Principal do Portfólio">
      {' '}
      {/* Adicionado aria-label para a navegação */}
      <div className={styles.container}>
        <div className={styles.logo}>
          <a href="#hero" onClick={handleSmoothScroll} aria-label="Navegar para o início da página">
            {' '}
            {/* Adicionado aria-label ao logo link */}
            Richard
          </a>
        </div>

        {/* Botão do Hambúrguer/Menu para mobile */}
        <button
          className={styles.menuToggle}
          onClick={toggleMenu}
          aria-label={isOpen ? 'Fechar menu de navegação' : 'Abrir menu de navegação'}
          aria-expanded={isOpen}
          aria-controls="main-navigation-menu"
        >
          {/* O ícone muda de hambúrguer para 'X' dependendo do estado do menu */}
          <FontAwesomeIcon icon={isOpen ? faTimes : faBars} size="lg" aria-hidden="true" />{' '}
          {/* Ícone é visual, escondido de leitores de tela */}
        </button>

        {/* Lista de links do menu - aplica a classe 'open' condicionalmente */}
        <ul
          id="main-navigation-menu" // ID para ser referenciado por aria-controls
          className={`${styles.menu} ${isOpen ? styles.open : ''}`}
          role="menu"
          aria-orientation="vertical"
          aria-hidden={!isOpen}
        >
          <li className={styles.menuItem}>
            <a
              href="#sobre"
              className={styles.menuLink}
              onClick={handleSmoothScroll}
              aria-current={currentPath === '#sobre' ? 'page' : undefined}
              role="menuitem"
            >
              Sobre Mim
            </a>
          </li>
          <li className={styles.menuItem}>
            <a
              href="#formacao"
              className={styles.menuLink}
              onClick={handleSmoothScroll}
              aria-current={currentPath === '#formacao' ? 'page' : undefined}
              role="menuitem"
            >
              Formação
            </a>
          </li>
          <li className={styles.menuItem}>
            <a
              href="#habilidades"
              className={styles.menuLink}
              onClick={handleSmoothScroll}
              aria-current={currentPath === '#habilidades' ? 'page' : undefined}
              role="menuitem"
            >
              Habilidades
            </a>
          </li>
          <li className={styles.menuItem}>
            <a
              href="#projetos"
              className={styles.menuLink}
              onClick={handleSmoothScroll}
              aria-current={currentPath === '#projetos' ? 'page' : undefined}
              role="menuitem"
            >
              Projetos
            </a>
          </li>
          <li className={styles.menuItem}>
            <a
              href="#contato"
              className={styles.menuLink}
              onClick={handleSmoothScroll}
              aria-current={currentPath === '#contato' ? 'page' : undefined}
              role="menuitem"
            >
              Contato
            </a>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
