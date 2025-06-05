// backend/server.js

// 1. Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config()

// 2. Importa os módulos necessários
const express = require('express')
const nodemailer = require('nodemailer')
const cors = require('cors')

// 3. Inicializa o aplicativo Express
const app = express()
const port = process.env.PORT || 5000 // Define a porta do servidor (5000 por padrão)

// 4. Configura Middlewares
// Habilita o CORS para permitir requisições do frontend React
// O '*' significa que qualquer origem pode acessar. Em produção, você pode restringir.
app.use(cors())
// Habilita o Express para parsear o corpo das requisições JSON
app.use(express.json())

// 5. Rota de Teste (opcional)
// Acessível em http://localhost:5000/
app.get('/', (req, res) => {
  res.send('Servidor do formulário de contato do portfólio está online!')
})

// 6. Rota POST para o Formulário de Contato
// Esta rota receberá os dados do formulário do seu frontend
// Acessível em http://localhost:5000/api/contact
app.post('/api/contact', async (req, res) => {
  // Desestrutura os dados do corpo da requisição
  const { name, email, message } = req.body

  // Validação básica dos dados
  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Todos os campos são obrigatórios.' })
  }

  // 7. Configuração do Nodemailer (para Outlook.com)
  // Cria um "transportador" de e-mail usando as credenciais do seu .env
  let transporter = nodemailer.createTransport({
    host: 'smtp.office365.com', // Servidor SMTP para Outlook/Office 365
    port: 587, // Porta comum para TLS/STARTTLS
    secure: false, // 'false' para porta 587 (usa STARTTLS)
    auth: {
      user: process.env.EMAIL_USER, // E-mail de usuário definido no .env
      pass: process.env.EMAIL_PASS, // Senha de usuário definida no .env
    },
    tls: {
      // Pode ser necessário para alguns ambientes para evitar erros de certificado
      // Remova esta linha se você tiver problemas e não souber o motivo
      ciphers: 'SSLv3',
    },
  })

  // 8. Opções do E-mail a ser Enviado
  // Define quem envia, quem recebe, o assunto e o conteúdo do e-mail
  let mailOptions = {
    from: `"<span class="math-inline">\{name\}" <</span>{email}>`, // Remetente que aparecerá no e-mail (nome e e-mail do visitante)
    to: process.env.EMAIL_TO, // SEU e-mail para onde a mensagem será enviada (do .env)
    subject: `[Portfólio] Nova Mensagem de ${name}`, // Assunto do e-mail
    html: `
      <h2>Nova Mensagem do seu Portfólio</h2>
      <p><strong>Nome:</strong> ${name}</p>
      <p><strong>E-mail:</strong> <span class="math-inline">\{email\}</p\>
<p><strong>Mensagem:</strong></p>
<p>{message}</p>
<br>
<small>Este e-mail foi enviado através do formulário de contato do seu portfólio.</small>
`,
  }

  // 9. Envio do E-mail e Resposta ao Frontend
  try {
    await transporter.sendMail(mailOptions)
    console.log('E-mail enviado com sucesso para:', process.env.EMAIL_TO)
    // Responde ao frontend com sucesso
    res.status(200).json({ message: 'Mensagem enviada com sucesso! Em breve entrarei em contato.' })
  } catch (error) {
    console.error('Erro ao enviar e-mail:', error)
    // Responde ao frontend com erro
    res
      .status(500)
      .json({ error: 'Ocorreu um erro ao enviar sua mensagem. Tente novamente mais tarde.' })
  }
})

// 10. Inicia o Servidor Express
app.listen(port, () => {
  console.log(`Servidor backend rodando em http://localhost:${port}`)
})
