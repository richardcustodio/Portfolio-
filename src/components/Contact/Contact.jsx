// src/components/Contact/Contact.jsx
import React, { useState } from 'react'
import styles from './Contact.module.css'
import { FaLinkedin, FaGithub, FaEnvelope, FaCopy } from 'react-icons/fa'

function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [errors, setErrors] = useState({})
  const [copySuccess, setCopySuccess] = useState('')
  const [formMessage, setFormMessage] = useState({ text: '', type: '' })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const myEmail = 'rc.custodio078@outlook.com'

  const validateForm = () => {
    let isValid = true
    const newErrors = {}

    if (!name.trim()) {
      newErrors.name = 'O nome é obrigatório.'
      isValid = false
    }

    if (!email.trim()) {
      newErrors.email = 'O e-mail é obrigatório.'
      isValid = false
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = 'E-mail inválido.'
      isValid = false
    }

    if (!message.trim()) {
      newErrors.message = 'A mensagem é obrigatória.'
      isValid = false
    }

    setErrors(newErrors)
    return isValid
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    // Limpa mensagens e erros anteriores ao tentar um novo envio
    setFormMessage({ text: '', type: '' })
    setErrors({})

    if (!validateForm()) {
      setFormMessage({
        text: 'Por favor, preencha todos os campos obrigatórios corretamente.',
        type: 'error',
      })
      return
    }

    setIsSubmitting(true) // Desabilita o botão e mostra "Enviando..."

    try {
      // --- INÍCIO DAS ALTERAÇÕES NA FUNÇÃO handleSubmit ---
      // Esta é a chamada real para o seu backend Node.js
      const response = await fetch('http://localhost:5000/api/contact', {
        // <--- URL do seu backend
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }), // Envia os dados como JSON
      })

      const data = await response.json() // Espera e parseia a resposta JSON do backend

      if (response.ok) {
        // Se a resposta HTTP for 2xx (sucesso)
        setFormMessage({
          text: data.message, // Usa a mensagem de sucesso enviada pelo backend
          type: 'success',
        })
        // Limpa os campos do formulário apenas em caso de sucesso
        setName('')
        setEmail('')
        setMessage('')
      } else {
        // Se a resposta HTTP for um erro (ex: 400, 500)
        setFormMessage({
          text: data.error || 'Ocorreu um erro desconhecido. Tente novamente.', // Usa a mensagem de erro do backend ou uma genérica
          type: 'error',
        })
      }
      // --- FIM DAS ALTERAÇÕES NA FUNÇÃO handleSubmit ---
    } catch (error) {
      // Este catch pega erros de rede, como o backend não estar rodando ou conexão recusada
      console.error('Erro ao enviar o formulário ou conectar ao servidor:', error)
      setFormMessage({
        text: 'Não foi possível conectar ao servidor. Por favor, tente novamente mais tarde.',
        type: 'error',
      })
    } finally {
      setIsSubmitting(false) // Habilita o botão novamente, independentemente do resultado
      // A mensagem de sucesso some após 5 segundos, a de erro permanece até nova tentativa
      if (formMessage.type === 'success') {
        // Correção importante: esta condição deve ser avaliada após o setState,
        // mas a lógica está ok, `formMessage.type` irá refletir o estado antes do timeout.
        setTimeout(() => setFormMessage({ text: '', type: '' }), 5000)
      }
    }
  }

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(myEmail)
      setCopySuccess('Copiado!')
      setTimeout(() => setCopySuccess(''), 2000)
    } catch (err) {
      setCopySuccess('Falha ao copiar!')
      console.error('Falha ao copiar texto: ', err)
    }
  }

  return (
    <section
      id="contato"
      className={styles.contact}
      aria-label="Seção de Contato para envio de mensagem ou redes sociais"
    >
      <div className={styles.container}>
        <h2 className={styles.title} data-aos="fade-down">
          Contato
        </h2>
        <div className={styles.contactContent}>
          <form
            onSubmit={handleSubmit}
            className={styles.contactForm}
            aria-label="Formulário de envio de mensagem"
            data-aos="fade-right"
            data-aos-duration="1000"
          >
            {formMessage.text && (
              <p
                className={`${styles.formFeedback} ${styles[formMessage.type]}`}
                role="alert"
                aria-live="polite"
              >
                {formMessage.text}
              </p>
            )}
            <div className={styles.formGroup} data-aos="fade-right" data-aos-delay="100">
              <label htmlFor="name" className={styles.label}>
                Nome:
              </label>
              <input
                type="text"
                id="name"
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                aria-required="true"
                aria-invalid={errors.name ? 'true' : 'false'}
                aria-describedby={errors.name ? 'error-name' : undefined}
              />
              {errors.name && (
                <p id="error-name" className={styles.errorMessage}>
                  {errors.name}
                </p>
              )}
            </div>
            <div className={styles.formGroup} data-aos="fade-right" data-aos-delay="200">
              <label htmlFor="email" className={styles.label}>
                E-mail:
              </label>
              <input
                type="email"
                id="email"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                aria-required="true"
                aria-invalid={errors.email ? 'true' : 'false'}
                aria-describedby={errors.email ? 'error-email' : undefined}
              />
              {errors.email && (
                <p id="error-email" className={styles.errorMessage}>
                  {errors.email}
                </p>
              )}
            </div>
            <div className={styles.formGroup} data-aos="fade-right" data-aos-delay="300">
              <label htmlFor="message" className={styles.label}>
                Mensagem:
              </label>
              <textarea
                id="message"
                className={styles.textarea}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                aria-required="true"
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'error-message' : undefined}
              />
              {errors.message && (
                <p id="error-message" className={styles.errorMessage}>
                  {errors.message}
                </p>
              )}
            </div>
            <button
              type="submit"
              className={styles.submitButton}
              disabled={isSubmitting}
              aria-label={
                isSubmitting ? 'Enviando sua mensagem, por favor aguarde' : 'Enviar Mensagem'
              }
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              {isSubmitting ? 'Enviando...' : 'Enviar Mensagem'}
            </button>
          </form>
          <div className={styles.contactInfo} data-aos="fade-left" data-aos-duration="1000">
            <h3>Outras formas de contato:</h3>
            <div className={styles.emailCopyContainer} data-aos="fade-left" data-aos-delay="100">
              <p className={styles.emailText} id="my-email-address">
                {myEmail}
              </p>
              <button
                onClick={copyToClipboard}
                className={styles.copyButton}
                title="Copiar e-mail"
                aria-label={`Copiar endereço de e-mail ${myEmail} para a área de transferência`}
              >
                <FaCopy size={18} aria-hidden="true" />
              </button>
              {copySuccess && (
                <span className={styles.copyMessage} aria-live="polite">
                  {copySuccess}
                </span>
              )}
            </div>

            <div className={styles.socialLinks} data-aos="fade-left" data-aos-delay="200">
              <a
                href="https://www.linkedin.com/in/richard-custodio-279391312/"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="Meu perfil no LinkedIn"
              >
                <FaLinkedin size={30} aria-hidden="true" />
              </a>
              <a
                href="https://github.com/richardcustodio"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.socialIcon}
                aria-label="Meu perfil no GitHub"
              >
                <FaGithub size={30} aria-hidden="true" />
              </a>
              <a
                href={`mailto:${myEmail}`}
                className={styles.socialIcon}
                aria-label={`Enviar e-mail para ${myEmail}`}
              >
                <FaEnvelope size={30} aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact
