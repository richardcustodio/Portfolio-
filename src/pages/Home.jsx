import React from 'react'
import Navbar from '../components/Navbar/Navbar'
import Hero from '../components/Hero/Hero'
import About from '../components/About/About'
import Education from '../components/Education/Education'
import Skills from '../components/Skills/Skills'
import Projects from '../components/Projects/Projects'
import Contact from '../components/Contact/Contact'
import Footer from '../components/Footer/Footer'

// Home agora recebe 'theme' e 'toggleTheme' como props de App.jsx
function Home({ theme, toggleTheme }) {
  return (
    <div>
      <Navbar />
      {/* Passa as props 'theme' e 'toggleTheme' para o Hero */}
      {/* O Hero pode ter suas próprias animações internas */}
      <Hero theme={theme} toggleTheme={toggleTheme} />

      {/* Aplicando data-aos aos divs que contêm as seções */}
      {/* Cada seção pode ter uma animação de entrada diferente */}
      <div id="sobre" data-aos="fade-up" data-aos-duration="1000">
        <About />
      </div>
      <div id="formacao" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="200">
        <Education />
      </div>
      <div id="habilidades" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="400">
        <Skills />
      </div>
      <div id="projetos" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="600">
        <Projects />
      </div>
      <div id="contato" data-aos="fade-up" data-aos-duration="1000" data-aos-delay="800">
        <Contact />
      </div>
      <Footer />
    </div>
  )
}

export default Home
