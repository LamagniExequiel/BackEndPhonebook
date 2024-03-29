const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const app = express()

morgan.token('body',(req,res,method) => {
    if(method === 'POST'){
        return JSON.stringify(req.body)
    }
    return null
})

app.use(cors())
app.use(express.static('dist'))
app.use(express.json())

app.use(morgan(function (tokens, req, res) {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.body(req,res,tokens.method(req,res))
    ].join(' ')
  }))


let persons = [
    {
      "name": "Arto Hellas",
      "number": "23-4567783",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    }
]

app.get( '/api/persons' ,(request,response)=>{
    response.json(persons)
})

app.get('/info',(request,response) => {
    response.send(
        `
        <div>
            <p>phonebook has info for ${persons.length} people</p>
            ${new Date()}
        </div>
        `
    )
})

app.get( '/api/persons/:id' ,(request,response)=>{
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)
    if(person){
        response.json(person)
    }else{
        response.status(404).end()
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
  
    response.status(204).end()
})


app.post( '/api/persons' ,(request,response)=>{
    const body = request.body

    const generateId = () => {
        const max = 1000
        const min = 1
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    if(!body.name){
        return response.status(400).json({
            error: 'name missing'
        })
    }

    if(!body.number){
        return response.status(400).json({
            error: 'number missing'
        })
    }

    if(persons.some(person => person.name === body.name)){
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    
    const newPerson = {
        name: body.name,
        number: body.number,
        id: generateId()
    }

    persons = persons.concat(newPerson)
    response.json(newPerson)

})

const PORT = 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})