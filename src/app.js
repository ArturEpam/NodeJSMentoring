import express from 'express'
import bodyParser from 'body-parser'
import * as Joi from '@hapi/joi'
import { createValidator } from 'express-joi-validation'

const app = express()
const validator = createValidator({})

const APPLICATION_PORT = 8080
const CONFLICT = 409
const NOT_FOUND = 404
const CREATED = 201
const NO_CONTENT = 204

app.use(bodyParser.json())

const users = [
  { id: 1, login: 'John', password: 'admin', role: 'admin', isDeleted: false },
  { id: 2, login: 'Jane', password: 'nimda', role: 'moderator', isDeleted: false },
  { id: 3, login: 'Steven', password: 'dupa123', role: 'user', isDeleted: false }
]

const userSchema = Joi.object({
  id: Joi.number().integer().required(),
  login: Joi.string().required(),
  password: Joi.string().alphanum().required(),
  age: Joi.number().min(4).max(130).required(),
  role: Joi.string().required()
})

function getNotDeletedUsers () {
  return users.filter(user => !user.isDeleted)
}

app.get('/users/:id', (req, res) => {
  const user = getNotDeletedUsers().find(user => user.id === req.params.id)

  if (user) { res.json(user) } else { res.status(NOT_FOUND).json({ message: 'User not found' }) }
})

app.get('/users', (req, res) => {
  res.json(getNotDeletedUsers())
})

app.post('/users', validator.body(userSchema), (req, res) => {
  const user = getNotDeletedUsers().find(user => user.id === req.body.id)
  if (user) {
    res.status(CONFLICT).json('User already exists')
    return
  }

  const newUser = { ...req.body, isDeleted: false }
  users.push(newUser)
  res.status(CREATED).json(newUser)
})

app.put('/users', validator.body(userSchema), (req, res) => {
  const userIndex = getNotDeletedUsers().map(user => user.id).indexOf(req.body.id)
  if (userIndex < 0) {
    res.status(NOT_FOUND).json('User doesnt exist')
    return
  }

  const newUser = { ...req.body, isDeleted: false }
  users[userIndex] = newUser
  res.json(newUser)
})

app.delete('/users/:id', (req, res) => {
  const user = getNotDeletedUsers().find(user => user.id === req.params.id)
  if (user) {
    const userIndex = users.indexOf(user)
    users[userIndex].isDeleted = true
    res.status(NO_CONTENT).json('ok')
  } else {
    res.status(NOT_FOUND).json('User doesnt exist')
  }
})

app.get('/users/suggest/:nameFilter', (req, res) => {
  const defaultLimit = 10
  let limit = defaultLimit
  if (req.query.limit) {
    limit = req.query.limit
  }

  const filteredUsers = getNotDeletedUsers()
    .filter(user => user.login.startsWith(req.params.nameFilter))
    .slice(0, limit)
  res.json(filteredUsers)
})

app.listen(APPLICATION_PORT)
console.log(`App running on localhost:${APPLICATION_PORT}`)
