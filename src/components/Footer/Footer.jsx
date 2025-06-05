// src/components/Footer/Footer.jsx
import React from 'react'
import styles from './Footer.module.css'

function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          &copy; {currentYear} Richard Custodio. Todos os direitos reservados.
        </p>
        {/* Você pode adicionar mais links ou informações aqui, como: */}
        {/* <ul className={styles.footerLinks}>
          <li><a href="/politica-de-privacidade">Política de Privacidade</a></li>
          <li><a href="/termos-de-uso">Termos de Uso</a></li>
        </ul> */}
      </div>
    </footer>
  )
}

export default Footer
