// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config()

// Importa os módulos essenciais para o servidor.
const express = require('express')
const nodemailer = require('nodemailer') // Módulo para envio de e-mails via SMTP
const cors = require('cors') // Middleware para controle de acesso de origem

// Inicializa o aplicativo Express.
const app = express()
// Define a porta do servidor; utiliza a variável de ambiente PORT ou 5000 como padrão.
const port = process.env.PORT || 5000

// --- Configuração de Middlewares ---

// Habilita o CORS para permitir requisições do frontend.
// Em produção, é recomendado restringir 'origin' à URL específica do seu frontend.
app.use(cors())
// Habilita o Express para interpretar corpos de requisição JSON.
app.use(express.json())

// --- Rota de Teste (Opcional) ---
// Endpoint simples para verificar se o servidor está online.
app.get('/', (req, res) => {
  res.send('Servidor do formulário de contato do portfólio está online!')
})

// --- Rota POST para o Formulário de Contato ---
// Endpoint responsável por receber e processar os dados do formulário de contato.
app.post('/api/contact', async (req, res) => {
  // Desestrutura os dados enviados pelo corpo da requisição.
  const { name, email, message } = req.body

  // Realiza uma validação básica para garantir que todos os campos obrigatórios foram preenchidos.
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' })
  }

  // --- Configuração do Nodemailer ---
  // Cria um objeto "transporter" para enviar e-mails usando as credenciais SMTP.
  let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com', // Servidor SMTP do Outlook/Office 365
    port: 587, // Porta padrão para TLS/STARTTLS
    secure: false, // Define 'false' para uso com STARTTLS na porta 587
    auth: {
      user: process.env.EMAIL_USER, // E-mail de autenticação, do .env
      pass: process.env.EMAIL_PASS, // Senha de autenticação, do .env
    },
    tls: {
      // Configuração TLS específica; pode ser removida se não houver problemas de certificado.
      ciphers: 'SSLv3',
    },
  })

  // --- Opções do E-mail ---
  // Define os detalhes do e-mail a ser enviado.
  let mailOptions = {
    from: `"${name}" <${email}>`, // Remetente que aparecerá no e-mail (nome e e-mail do visitante).
    to: process.env.EMAIL_TO, // Endereço de destino da mensagem (seu e-mail).
    subject: `[Portfólio] Nova Mensagem de ${name}`, // Assunto do e-mail.
    html: `
        <h2>Nova Mensagem do seu Portfólio</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>E-mail:</strong> ${email}</p>
        <p><strong>Mensagem:</strong></p>
        <p>${message}</p>
        <br>
        <small>Este e-mail foi enviado através do formulário de contato do seu portfólio.</small>
      `, // Conteúdo HTML do e-mail.
  }

  // --- Envio do E-mail e Resposta ---
  try {
    // Tenta enviar o e-mail usando o transporter configurado.
    await transporter.sendMail(mailOptions)
    console.log('E-mail enviado com sucesso para:', process.env.EMAIL_TO)
    // Retorna uma resposta de sucesso para o frontend.
    res.status(200).json({ message: 'Mensagem enviada com sucesso! Em breve entrarei em contato.' })
  } catch (error) {
    // Captura e loga quaisquer erros que ocorram durante o envio.
    console.error('Erro ao enviar e-mail:', error)
    // Retorna uma resposta de erro para o frontend.
    res
      .status(500)
      .json({ error: 'Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.' })
  }
})

// --- Inicia o Servidor Express ---
// Faz o servidor Express escutar requisições na porta definida.
app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`)
})
