// src/components/ProjectCard/ProjectCard.jsx
import React from 'react'
import styles from './ProjectCard.module.css'
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa'

function ProjectCard({ project }) {
  // Gerar um ID único para o título do projeto para uso com aria-labelledby
  // Isso é importante para que cada card seja rotulado de forma única.
  const projectId = `project-title-${project.id || project.title.replace(/\s+/g, '-').toLowerCase()}`

  return (
    <div
      className={styles.projectCard}
      aria-labelledby={projectId}
      data-aos="zoom-in-up" // Animação de entrada para o card inteiro
      data-aos-duration="800" // Duração da animação
    >
      {project.image && (
        <div className={styles.imageContainer}>
          <img
            src={project.image}
            alt={`Imagem de demonstração do projeto: ${project.title}`} // Alt text mais descritivo
            className={styles.projectImage}
            loading="lazy" // <--- Atributo de lazy loading nativo
          />
        </div>
      )}
      <div className={styles.projectDetails}>
        <h3 id={projectId} className={styles.projectTitle}>
          {project.title}
        </h3>
        <p className={styles.projectDescription}>{project.description}</p>
        {project.techStack &&
          project.techStack.length > 0 && ( // Verifica se há techStack antes de renderizar
            <ul className={styles.techStack} aria-label="Tecnologias utilizadas no projeto">
              {/* Adicionado aria-label para a lista de tecnologias */}
              {project.techStack.map((tech, index) => (
                <li key={index}>{tech}</li>
              ))}
            </ul>
          )}
        <div className={styles.links}>
          {project.githubLink && (
            <a
              href={project.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkButton}
              aria-label={`Ver código-fonte do projeto ${project.title} no GitHub`} // aria-label mais descritivo
            >
              <FaGithub size={20} aria-hidden="true" /> GitHub{' '}
              {/* Ícone é visual, escondido de leitores de tela */}
            </a>
          )}
          {project.liveDemoLink && (
            <a
              href={project.liveDemoLink}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.linkButton}
              aria-label={`Ver demonstração online do projeto ${project.title}`} // aria-label mais descritivo
            >
              <FaExternalLinkAlt size={20} aria-hidden="true" /> Live Demo{' '}
              {/* Ícone é visual, escondido de leitores de tela */}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
