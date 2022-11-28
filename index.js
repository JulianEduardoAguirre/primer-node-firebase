const express = require('express')
const morgan = require('morgan')
const app = express()
const routes = require('./src/routes/index')
const cors = require('cors');
require('dotenv').config()

//Middleware para mostrar los requests HTTP por consola
app.use(morgan('dev'))

//Configurar Express para interpretar JSON en los POST.
app.use(express.json())
app.use(express.urlencoded({ extended: false }))

//Configurar Express para permitir conexión a una dirección en particular.
//Para permitir a cualquier dirección, app.use(cors())
app.use(cors({
  origin: ['http://localhost:3000']
}));

app.use(routes)

app.listen(process.env.PORT, () => {
  console.log(`Servidor escuchando en el puerto ${process.env.PORT}`)
})