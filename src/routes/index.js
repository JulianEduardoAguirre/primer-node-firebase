const { Router } = require("express")
const { db } = require('../firebase')
const router = Router()

//Obtener lista de usuarios
router.get('/user', async (req, res) => {
  const response = await db.collection('users').get()
  const users = await response.docs.map((user) => {
    return {
      id: user.id,
      ...user.data()
    }
  })
  res.send(users)
})

//Guardar un nuevo usuario
router.post('/user', async (req, res) => {
  const user = req.body
  await db.collection('users').add({
    dni: user.dni,
    email: user.email,
    apellido: user.apellido,
    nombre: user.nombre
  })
  res.send(user)
})

//Obtener un usuario por su ID
router.get('/user/:id', async (req, res) => {
  const id = req.params.id
  const user = await db.collection('users').doc(id).get()
  if (user.data()) {
    res.send({
      id: user.id,
      ...user.data()
    })
  } else {
    res.send('No existe ese usuario')
  }
})

//Modificar un usuario existente
router.put('/user/:id', async (req, res) => {
  const id = req.params.id
  await db.collection('users').doc(id).update(req.body)
  res.send('Modificado')
})

//Eliminar un usuario existente
router.delete('/user/:id', 