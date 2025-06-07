// backend/index.js
require('dotenv').config() // Carrega as variáveis do .env do backend

const express = require('express')
const cors = require('cors') // Para permitir comunicação entre frontend e backend
const { Resend } = require('resend') // Importa a biblioteca do Resend

const app = express()
// A porta é para uso local. A Vercel gerencia a porta em produção.
const port = process.env.PORT || 5000

// --- Middlewares ---
// Configuração do CORS: Muito importante para segurança!
// Permite que seu frontend (em um domínio diferente) se comunique com este backend.
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? process.env.FRONTEND_URL // Em produção, só permite requisições da URL do seu portfólio
        : '*', // Em desenvolvimento local, permite qualquer origem para facilitar testes
    methods: ['POST'], // Permite apenas requisições POST para o formulário
    allowedHeaders: ['Content-Type'], // Permite apenas o cabeçalho 'Content-Type'
  }),
)

// Habilita o Express a ler o corpo das requisições como JSON
app.use(express.json())

// --- Inicializa o Resend ---
// Usa a API Key que você definiu no .env do backend
const resend = new Resend(process.env.RESEND_API_KEY)

// --- Rota POST para '/send-email' ---
// Esta rota é o endpoint que o seu frontend irá chamar.
app.post('/send-email', async (req, res) => {
  // Extrai os dados enviados pelo frontend
  const { name, email, message } = req.body

  // --- Validação básica dos dados ---
  if (!name || !email || !message) {
    // Se algum campo obrigatório estiver faltando, retorna erro 400
    return res.status(400).json({ error: 'Todos os campos do formulário são obrigatórios.' })
  }

  try {
    // --- Envio do e-mail usando o Resend ---
    // 'from': O e-mail que você verificou no Resend. É crucial!
    // 'to': O e-mail para onde as mensagens serão enviadas (seu e-mail pessoal)
    // 'reply_to': Isso faz com que, ao responder o e-mail, você responda diretamente ao usuário.
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      reply_to: email, // Permite que você responda diretamente ao usuário
      subject: `Nova Mensagem do Portfólio de: ${name}`, // Assunto do e-mail
      html: `
                <p><strong>Nome:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
                <p><strong>Mensagem:</strong><br>${message}</p>
                <br>
                <p>---</p>
                <p>Esta mensagem foi enviada do seu portfólio online.</p>
            `, // Conteúdo do e-mail em HTML
    })

    // Verifica se o Resend retornou algum erro no envio
    if (error) {
      console.error('Erro ao enviar e-mail via Resend:', error)
      return res.status(500).json({ error: error.message || 'Erro ao enviar mensagem via Resend.' })
    }

    // Se deu tudo certo, loga no console do servidor e envia sucesso para o frontend
    console.log('E-mail enviado com sucesso via Resend:', data)
    res.status(200).json({ message: 'Mensagem enviada com sucesso! Em breve entrarei em contato.' })
  } catch (error) {
    // Captura erros inesperados durante o processo
    console.error('Erro interno do servidor ao processar o envio de e-mail:', error)
    res.status(500).json({ error: 'Erro interno do servidor. Tente novamente mais tarde.' })
  }
})

// --- Exporta o app para Vercel Serverless Function ---
// Para o Vercel, precisamos exportar o app Express.
// O app.listen() é apenas para rodar o servidor localmente,
// a Vercel gerencia isso em produção.
module.exports = app

// Bloco para iniciar o servidor localmente, útil para desenvolvimento
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Servidor backend rodando em http://localhost:${port}`)
  })
}
