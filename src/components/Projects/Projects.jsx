import React from 'react'
import styles from './Projects.module.css'
import ProjectCard from './ProjectCard'

function Projects() {
  const projectsData = [
    {
      title: 'Busca de Perfil GitHub',
      description:
        'Este é um projeto web desenvolvido com React que permite aos usuários buscar e visualizar informações de perfis do GitHub. A aplicação consome a API pública do GitHub para exibir dados como nome, bio, repositórios e seguidores.',
      techStack: ['HTML', 'CSS', 'JavaScript', 'React.js'],
      githubLink: 'https://github.com/richardcustodio/Busca-de-Perfil-no-GitHub',
      liveDemoLink: 'https://projeto1.seudominio.com',
      image: '/images/image_projects/Busca_de_perfil_no_Github.jpg',
    },
    {
      title: 'AVANTI - Loja de Roupas Online',
      description:
        'AVANTI é uma plataforma e-commerce focada em moda, com navegação intuitiva e visual atraente. Oferece uma ampla variedade de roupas e funcionalidades que facilitam a busca e compra. Totalmente responsiva, proporciona uma ótima experiência em qualquer dispositivo.',
      techStack: ['HTML', 'CSS', 'JavaScript', 'React.js'],
      githubLink: 'https://github.com/richardcustodio/Desenvolvimento-do-Layout',
      liveDemoLink: 'https://projeto2.seudominio.com',
      image: '/images/image_projects/Site_ficticio_avanti.jpg',
    },
    {
      title: 'Prateleira de Vídeos',
      description:
        'Aplicação web interativa para gerenciar coleções de vídeos de plataformas como YouTube e Vimeo. Desenvolvida com React e Vite, permite adicionar, editar, remover e buscar vídeos. Inclui modo claro e escuro para uma experiência personalizada.',
      techStack: ['HTML', 'CSS', 'JavaScript', 'React.js'],
      githubLink: 'https://github.com/richardcustodio/Prateleira-de-videos',
      liveDemoLink: 'https://projeto2.seudominio.com',
      image: '/images/image_projects/Prateleira_de_videos.jpg',
    },
    {
      title: 'Catálogo de Produtos',
      description:
        'Este projeto é um catálogo de produtos interativo com funcionalidades completas de CRUD. Desenvolvido com React e Vite, utiliza o LocalStorage para persistência de dados. Faz parte de um desafio da Alura voltado ao aprimoramento em frontend.',
      techStack: ['HTML', 'CSS', 'JavaScript', 'React.js'],
      githubLink: 'https://github.com/richardcustodio/Catalogo-de-Produtos',
      liveDemoLink: 'https://projeto2.seudominio.com',
      image: '/images/image_projects/Catalogos_de_produtos.jpg',
    },
    {
      title: 'Decodificador de Texto',
      description:
        'Este projeto é um decodificador de texto que utiliza cifras clássicas como César, Vigenère e Atbash. Desenvolvido como desafio do curso da Alura, tem como foco o aprimoramento em frontend. Possui uma interface web simples, intuitiva e responsiva.',
      techStack: ['HTML', 'CSS', 'JavaScript', 'React.js'],
      githubLink: 'https://github.com/richardcustodio/Decodificador-de-Texto',
      liveDemoLink: 'https://projeto2.seudominio.com',
      image: '/images/image_projects/Decodificador_de_texto.jpg',
    },
    // Adicione mais objetos de projeto aqui
  ]

  return (
    <section id="projetos" className={styles.projects} aria-label="Seção de Projetos e Portfólio">
      {' '}
      {/* Adicionado aria-label para a seção */}
      <div className={styles.container}>
        <h2 className={styles.title} data-aos="fade-down">
          Projetos
        </h2>{' '}
        {/* Animação para o título */}
        <div className={styles.projectsGrid}>
          {projectsData.map((project, index) => (
            <ProjectCard
              key={index}
              project={project}
              data-aos="fade-up"
              data-aos-delay={`${index * 150}`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Projects
