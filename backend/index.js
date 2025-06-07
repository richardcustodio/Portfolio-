require('dotenv').config() // Carrega variáveis de ambiente do arquivo .env

const express = require('express')
const cors = require('cors') // Habilita requisições de diferentes origens (CORS)
const { Resend } = require('resend') // SDK do Resend para envio de e-mails

const app = express()
// Porta para o servidor local; a Vercel gerencia a porta em produção.
const port = process.env.PORT || 5000

// --- Middlewares ---

// Configuração do CORS para controlar quais origens podem acessar o backend.
app.use(
  cors({
    // Permite acesso apenas da URL do frontend em produção, ou de qualquer origem em desenvolvimento.
    origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : '*',
    methods: ['POST'], // Permite apenas requisições POST.
    allowedHeaders: ['Content-Type'], // Permite apenas o cabeçalho 'Content-Type'.
  }),
)

// Habilita o Express a processar corpos de requisição no formato JSON.
app.use(express.json())

// --- Inicialização do Resend ---
// Inicializa o cliente Resend usando a chave API do ambiente.
const resend = new Resend(process.env.RESEND_API_KEY)

// --- Rota POST para '/send-email' ---
// Endpoint que o frontend utiliza para enviar mensagens.
app.post('/send-email', async (req, res) => {
  // Extrai os dados do corpo da requisição.
  const { name, email, message } = req.body

  // --- Validação básica dos dados recebidos ---
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Todos os campos do formulário são obrigatórios.' })
  }

  try {
    // --- Envia o e-mail usando o serviço Resend ---
    // 'from': Endereço de e-mail verificado no Resend.
    // 'to': Endereço de e-mail do destinatário (seu e-mail pessoal).
    // 'reply_to': Define o remetente da resposta como o e-mail do usuário.
    const { data, error } = await resend.emails.send({
      from: process.env.FROM_EMAIL,
      to: process.env.TO_EMAIL,
      reply_to: email,
      subject: `Nova Mensagem do Portfólio de: ${name}`, // Assunto dinâmico do e-mail.
      html: `
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Mensagem:</strong><br>${message}</p>
            <br>
            <p>---</p>
            <p>Esta mensagem foi enviada do seu portfólio online.</p>
          `, // Conteúdo do e-mail em formato HTML.
    })

    // Verifica se houve erro no envio do e-mail pelo Resend.
    if (error) {
      console.error('Erro ao enviar e-mail via Resend:', error)
      return res.status(500).json({ error: error.message || 'Erro ao enviar mensagem via Resend.' })
    }

    // Retorna sucesso para o frontend após o envio bem-sucedido.
    console.log('E-mail enviado com sucesso via Resend:', data)
    res.status(200).json({ message: 'Mensagem enviada com sucesso! Em breve entrarei em contato.' })
  } catch (error) {
    // Captura erros internos do servidor.
    console.error('Erro interno do servidor ao processar o envio de e-mail:', error)
    res.status(500).json({ error: 'Erro interno do servidor. Tente novamente mais tarde.' })
  }
})

// --- Exporta o app para Vercel Serverless Function ---
// Exporta a instância do Express para ser utilizada pela Vercel.
module.exports = app

// Bloco para iniciar o servidor Express localmente (apenas em ambiente de desenvolvimento).
if (process.env.NODE_ENV !== 'production') {
  app.listen(port, () => {
    console.log(`Servidor backend rodando em http://localhost:${port}`)
  })
}
