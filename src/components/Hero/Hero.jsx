// src/components/Hero/Hero.jsx
import React from 'react'
import styles from './Hero.module.css'
import profileImage from '/images/profile/profile.jpg' // Certifique-se de que este caminho está correto
import ThemeToggle from '../ThemeToggle/ThemeToggle'

// Hero agora recebe 'theme' e 'toggleTheme' como props
function Hero({ theme, toggleTheme }) {
  return (
    <section className={styles.hero} aria-label="Seção de Introdução e Apresentação do Portfólio">
      {' '}
      {/* Adicionado aria-label para a seção */}
      <div className={styles.container}>
        <div className={styles.imageContainer}>
          <img
            src={profileImage}
            alt="Foto de perfil de Richard Custodio Batista Quadra" // Alt text mais descritivo
            className={styles.profileImage}
          />
        </div>
        <div className={styles.content}>
          <h1 className={styles.name}>Richard Custodio Batista Quadra</h1>
          <p className={styles.title}>Entusiasta Front-End em Desenvolvimento.</p>
          <p className={styles.description}>
            Sou estudante de Frontend com foco em criar interfaces modernas, responsivas e bem
            estruturadas. Tenho conhecimento em HTML, CSS, JavaScript e estou em constante
            aprendizado. Busco crescer profissionalmente contribuindo com projetos desafiadores e
            criativos.
          </p>
          <a
            href="/cv/Curriculo.pdf"
            download
            className={styles.downloadButton}
            aria-label="Baixar Currículo em formato PDF" // Adicionado aria-label para o botão de download
          >
            Baixar Currículo
          </a>
        </div>
      </div>
      {/* Passa as props 'theme' e 'toggleTheme' para o ThemeToggle */}
      {/* O ThemeToggle, por ser um componente separado, receberá seu próprio aria-label */}
      <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
    </section>
  )
}

export default Hero
