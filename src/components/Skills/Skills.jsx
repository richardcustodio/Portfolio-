// src/components/Skills/Skills.jsx
import React from 'react'
import styles from './Skills.module.css'
import { FaHtml5, FaCss3Alt, FaJs, FaReact, FaGitAlt, FaPython } from 'react-icons/fa'
import { SiMysql } from 'react-icons/si' // Importando o ícone do MySQL da Simple Icons

function Skills() {
  const skillsData = [
    { name: 'HTML5', icon: <FaHtml5 size={40} />, proficiency: 'Básico' },
    { name: 'CSS3', icon: <FaCss3Alt size={40} />, proficiency: 'Básico' },
    { name: 'JavaScript', icon: <FaJs size={40} />, proficiency: 'Básico' },
    { name: 'React', icon: <FaReact size={40} />, proficiency: 'Básico' },
    { name: 'Git', icon: <FaGitAlt size={40} />, proficiency: 'Básico' },
    { name: 'MySQL', icon: <SiMysql size={40} />, proficiency: 'Básico' },
    { name: 'Python', icon: <FaPython size={40} />, proficiency: 'Básico' },
  ]

  return (
    <section
      id="habilidades"
      className={styles.skills}
      aria-label="Seção de Habilidades Técnicas e Ferramentas"
    >
      <div className={styles.container}>
        <h2 className={styles.title} data-aos="fade-down">
          Habilidades
        </h2>{' '}
        {/* Animação para o título */}
        <ul className={styles.skillsList}>
          {skillsData.map((skill, index) => (
            <li
              key={index}
              className={styles.skillItem}
              data-aos="fade-up" // Animação de entrada para cada item de habilidade
              data-aos-delay={`${index * 100}`} // Atraso incremental para um efeito cascata
            >
              {/* Ícone é visual, não precisa ser lido pelo leitor de tela se o nome já estiver presente */}
              <div className={styles.skillIcon} aria-hidden="true">
                {skill.icon}
              </div>
              <span className={styles.skillName}>{skill.name}</span>
              {/* O nível de proficiência é importante, mas o texto já é claro. aria-label reforça se necessário. */}
              <div
                className={styles.proficiency}
                aria-label={`Nível de proficiência: ${skill.proficiency}`}
              >
                ({skill.proficiency})
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}

export default Skills
