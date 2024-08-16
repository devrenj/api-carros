const express = require('express')
const brandRouter = require('./routes/brand')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware para usar JSON no body das requisições
app.use(express.json())

// Rota principal
app.get('/', async (req, res) => {
  res.send({message: 'Hello world!'})
})

// Usar o brandRouter para rotas que começão com /brand
app.use('/brand', brandRouter)

app.listen(PORT, () => {
  console.log(`Servidor rodando em: http://localhost:${PORT}`)
})