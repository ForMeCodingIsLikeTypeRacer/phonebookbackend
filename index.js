// const { json } = require('express');
const express = require('express');
const app = express();
var morgan = require('morgan');
const cors = require('cors');
const PhonebookEntry = require('./phonebook')

app.use(cors());
app.use(express.json());
app.use(morgan('combined'));
app.use(express.json());
app.use(express.static('build'));

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

app.get('/api/persons', (request, response) => {
    const res = JSON.stringify(persons, null, 2);
    response.setHeader('Content-Type', 'application/json');
    response.send(res);
})

app.get('/info', (request, response) => {
    const currenttime = new Date();
    let res = `Phonebook has info for ${persons.length} people\n\n${currenttime}`;
    response.setHeader('Content-Type', 'text/plain');
    response.send(res);
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    const person = persons.find(person => person.id === id);

    if(person) {
        response.json(person);
    }
    else {
        response.status(404).end();
    }
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id);
    persons = persons.filter(person => person.id !== id)

    response.status(204).end();
})

app.post('/api/persons', (request, response) => {
    const id = Math.floor(Math.random() * 1000000000);
    const newPerson = {
        id: id,
        name: request.body.name,
        number: request.body.number
    };
    if(newPerson.name === "") {
        response.status(400).json({ error: 'name must not be empty' });
    } else if(newPerson.number === "") {
        response.status(400).json({ error: 'number must not be empty' });
    } else if(persons.some(person => person.name === newPerson.name)) {
        response.status(400).json({ error: 'name must be unique' });
    }
    else {
        persons.push(newPerson);
        response.status(201).json(newPerson);
    }
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
