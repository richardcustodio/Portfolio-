// src/components/Education/Education.jsx
import React from 'react'
import styles from './Education.module.css'

function Education() {
  const educationData = [
    {
      year: '2027',
      degree: 'Graduação em Análise e Desenvolvimento de Sistemas',
      institution: 'UNIGRANDE - Centro Universitário da Grande Fortaleza',
      description: 'Atualmente cursando',
    },
    {
      year: 'Mai - 2025',
      degree: 'Certificação em IA Generativa',
      institution: 'Alura',
      description:
        'Formação em Inteligência Artificial Generativa, com foco em aplicações práticas de IA para desenvolvimento web, UX e Data Science.',
    },
    {
      year: 'Abr - 2025',
      degree: 'Certificação em SQL com MySQL Server da Oracle',
      institution: 'Alura',
      description:
        'Formação em Banco de Dados, com foco em manipulação, consulta, administração e segurança de dados utilizando MySQL Server da Oracle.',
    },
    {
      year: 'Abr - 2025',
      degree: 'Certificação em Oracle Cloud Infrastructure',
      institution: 'Alura',
      description:
        'Formação em Computação em Nuvem, com foco na Oracle Cloud Infrastructure (OCI), incluindo implantação de aplicações, gestão de bancos de dados e automação com infraestrutura como código.',
    },
    {
      year: 'Jun - 2025', // Ajustado para Junho, conforme a certificação ONE.
      degree: 'Certificação em Oracle Next Education F2 T7 Front-end',
      institution: 'Alura',
      description:
        'Formação intensiva de 326 horas, concluída na Alura em parceria com a Oracle Next Education (ONE), com foco em Front-End, React.js, lógica de programação e soft skills, além de metodologias ágeis e desenvolvimento profissional.',
    },
    {
      year: 'Mai - 2024',
      degree: 'Curso de formação em Programador de Sistemas',
      institution: 'Senai - centro de educação e tecnologia arivaldo silveira fontes',
      description:
        'Curso técnico de 200 horas, com foco na formação de programadores de sistemas, incluindo desenvolvimento de aplicações desktop, lógica de programação e competências empreendedoras e éticas.',
    },
    // Adicione mais itens de formação aqui
  ]

  return (
    <section
      id="formacao"
      className={styles.education}
      aria-label="Seção de Formação Acadêmica e Certificações"
    >
      {' '}
      {/* Adicionado aria-label para a seção */}
      <div className={styles.container}>
        <h2 className={styles.title} data-aos="fade-down">
          Formação Acadêmica
        </h2>{' '}
        {/* Animação para o título */}
        <div className={styles.timeline}>
          {educationData.map((item, index) => (
            <div
              key={index}
              className={styles.timelineItem}
              data-aos="fade-left" // Animação para cada item da linha do tempo
              data-aos-delay={`${index * 150}`} // Atraso incremental para efeito cascata
            >
              <div className={styles.timelineYear} aria-hidden="true">
                {item.year}
              </div>{' '}
              {/* Ano é visualmente parte do item, pode ser escondido do leitor de tela para não duplicar */}
              <div className={styles.timelineContent}>
                <h3 className={styles.degree}>{item.degree}</h3>
                <p className={styles.institution}>
                  <span className="sr-only">Instituição: </span>
                  {item.institution}
                </p>{' '}
                {/* sr-only para adicionar contexto sem mudar o visual */}
                <p className={styles.description}>
                  <span className="sr-only">Descrição: </span>
                  {item.description}
                </p>{' '}
                {/* sr-only para adicionar contexto */}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Education
