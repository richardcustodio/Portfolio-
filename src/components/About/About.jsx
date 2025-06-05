// src/components/About/About.jsx
import React from 'react'
import styles from './About.module.css'
import { FaLinkedin, FaGithub, FaEnvelope } from 'react-icons/fa' // Importe os ícones que você precisa

function About() {
  const myEmail = 'rc.custodio078@outlook.com' // Definindo o e-mail aqui para uso no aria-label

  return (
    <section
      id="sobre"
      className={styles.about}
      aria-label="Seção Sobre Mim - Biografia e Contato Social"
    >
      {' '}
      {/* Adicionado aria-label para a seção */}
      <div className={styles.container}>
        <h2 className={styles.title} data-aos="fade-down">
          Sobre Mim
        </h2>{' '}
        {/* Animação para o título */}
        <div className={styles.content}>
          <p className={styles.biography} data-aos="fade-up" data-aos-delay="200">
            {' '}
            {/* Animação para o parágrafo de biografia */}
            Meu interesse por tecnologia surgiu muito cedo, motivado tanto pela minha curiosidade
            natural quanto pelo incentivo do meu pai, que sempre me encorajou a explorar e aprender
            coisas novas. Desde pequeno, a internet exercia um enorme fascínio sobre mim, mesmo
            naquela época em que as conexões eram lentas e os recursos bastante limitados. Ainda
            assim, eu passava horas navegando, tentando entender como as coisas funcionavam por trás
            das telas. Quando ingressei no ensino médio técnico, tive meu primeiro contato mais
            profundo e estruturado com a área de Tecnologia da Informação. Foi nesse período que
            comecei a compreender melhor as diversas possibilidades e caminhos profissionais que
            existiam dentro do setor, especialmente nas áreas de Backend, Frontend e Fullstack. À
            medida que fui pesquisando e experimentando, percebi que o Frontend era a área que mais
            despertava meu interesse. Achei fascinante a ideia de criar interfaces, interações
            visuais e experiências diretas para os usuários, unindo criatividade, design e lógica de
            programação. Desde então, venho me dedicando intensamente a aprender e evoluir como
            desenvolvedor Frontend. Busco constantemente aprimorar minhas habilidades técnicas,
            explorar novas ferramentas e metodologias, e me manter atualizado com as tendências do
            mercado. Ao mesmo tempo, sigo aberto a conhecer e entender cada vez mais sobre outras
            áreas da tecnologia, pois acredito que ter uma visão abrangente é fundamental para me
            tornar um profissional completo e preparado para os desafios do setor.
          </p>
          <div className={styles.socialLinks} data-aos="fade-up" data-aos-delay="400">
            {' '}
            {/* Animação para os links sociais */}
            <a
              href="https://www.linkedin.com/in/richard-custodio-279391312/"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="Meu perfil no LinkedIn" // Melhoria de acessibilidade
            >
              <FaLinkedin size={30} aria-hidden="true" />{' '}
              {/* Ícone é visual, escondido de leitores de tela */}
            </a>
            <a
              href="https://github.com/richardcustodio"
              target="_blank"
              rel="noopener noreferrer"
              className={styles.socialIcon}
              aria-label="Meu perfil no GitHub" // Melhoria de acessibilidade
            >
              <FaGithub size={30} aria-hidden="true" />
            </a>
            <a
              href={`mailto:${myEmail}`}
              className={styles.socialIcon}
              aria-label={`Enviar e-mail para ${myEmail}`} // Melhoria de acessibilidade
            >
              <FaEnvelope size={30} aria-hidden="true" />
            </a>
            {/* Adicione mais links para outras redes sociais conforme necessário */}
          </div>
        </div>
      </div>
    </section>
  )
}

export default About
