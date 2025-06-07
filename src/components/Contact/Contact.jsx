// src/components/Contact/Contact.jsx
import React, { useState, useEffect } from 'react'
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

  // O formulário de contato está desabilitado permanentemente.
  // Se houver planos de reativá-lo, 'formDisabled' deve ser um estado.
  const formDisabled = true

  const myEmail = 'rc.custodio078@outlook.com'

  // Define a mensagem inicial de indisponibilidade do formulário.
  useEffect(() => {
    if (formDisabled) {
      setFormMessage({
        text: 'No momento, o envio de mensagens está temporariamente indisponível. Por favor, use os links diretos para contato.',
        type: 'info',
      })
    }
  }, [formDisabled]) // Este efeito executa quando formDisabled (a constante) é inicializado.

  // Valida os campos do formulário antes do envio.
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

  // Lida com a submissão do formulário.
  const handleSubmit = async (event) => {
    event.preventDefault()

    // Impede o envio se o formulário estiver desabilitado.
    if (formDisabled) {
      setFormMessage({
        text: 'O envio de mensagens está desabilitado no momento. Use os links abaixo.',
        type: 'info',
      })
      return // Bloqueia a execução do restante da função.
    }

    // Limpa mensagens anteriores e erros.
    setFormMessage({ text: '', type: '' })
    setErrors({})

    // Valida o formulário antes de tentar enviar.
    if (!validateForm()) {
      setFormMessage({
        text: 'Por favor, preencha todos os campos obrigatórios corretamente.',
        type: 'error',
      })
      return
    }

    setIsSubmitting(true)

    try {
      // O código de envio ao backend está comentado pois o formulário está desabilitado.
      /*
      const backendUrl = import.meta.env.MODE === 'production'
        ? import.meta.env.VITE_BACKEND_URL
        : 'http://localhost:5000/send-email';

      const response = await fetch(backendUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const data = await response.json();

      if (response.ok) {
        setFormMessage({
          text: data.message || 'Mensagem enviada com sucesso! Em breve entrarei em contato.',
          type: 'success',
        });
        setName('');
        setEmail('');
        setMessage('');
      } else {
        setFormMessage({
          text: data.error || 'Ocorreu um erro desconhecido ao enviar a mensagem. Tente novamente.',
          type: 'error',
        });
      }
      */
      // Exibe a mensagem de que o formulário está desabilitado, simulando uma falha controlada.
      setFormMessage({
        text: 'O envio de mensagens está desabilitado no momento. Por favor, use os links diretos para contato.',
        type: 'info',
      })
    } catch (error) {
      console.error('Erro (simulado) ao enviar o formulário:', error)
      setFormMessage({
        text: 'Não foi possível enviar a mensagem no momento.',
        type: 'error',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Copia o endereço de e-mail para a área de transferência.
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
            {/* Exibe mensagens de feedback do formulário (sucesso, erro, info). */}
            {formMessage.text && (
              <p
                className={`${styles.formFeedback} ${styles[formMessage.type]}`}
                role="alert"
                aria-live="polite"
              >
                {formMessage.text}
              </p>
            )}
            {/* Campos do Formulário - desabilitados se 'formDisabled' for true. */}
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
                disabled={formDisabled} // Desabilita o campo
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
                disabled={formDisabled} // Desabilita o campo
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
                disabled={formDisabled} // Desabilita o campo
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
              disabled={isSubmitting || formDisabled} // Desabilita se estiver enviando OU se o formulário estiver desabilitado.
              aria-label={
                isSubmitting
                  ? 'Enviando sua mensagem, por favor aguarde'
                  : formDisabled
                    ? 'Envio de mensagem desabilitado'
                    : 'Enviar Mensagem'
              }
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              {isSubmitting
                ? 'Enviando...'
                : formDisabled
                  ? 'Temporariamente Indisponível'
                  : 'Enviar Mensagem'}
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
