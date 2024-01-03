const express = require('express')
const app = express()
app.use(express.json())

const persons = [
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

const PORT = 3001
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})