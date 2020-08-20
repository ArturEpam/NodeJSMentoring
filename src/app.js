import express from 'express';
import bodyParser, { json } from 'body-parser';
const app = express();

const APPLICATION_PORT = 8080;
const CONFLICT = 409;
const NOT_FOUND = 404;
const CREATED = 201;

app.use(bodyParser.json())

let users = [
    { id: 1, name: 'John', secondName: 'Kowalski', role: 'admin' },
    { id: 2, name: 'Jane', secondName: 'Nowak', role: 'moderator' },
    { id: 3, name: 'Steven', secondName: 'Seagal', role: 'user' }
];

app.get('/users/:id', (req, res) => {
    const user = users.find(user => user.id == req.params.id);

    if (user)
        res.json(user);
    else
        res.status(NOT_FOUND).json({ message: "User not found" });
});

app.get('/users', (req, res) => {
    res.json(users);
});

app.post('/users', (req, res) => {
    const user = users.find(user => user.id == req.body.id);
    if (user) {
        res.status(CONFLICT).json('User already exists');
        return;
    }

    users.push(req.body);
    res.json(req.body);
});

app.put('/users', (req, res) => {
    const userIndex = users.map(user => user.id).indexOf(req.body.id);
    if (userIndex < 0) {
        res.status(NOT_FOUND).json('User doesnt exist');
        return;
    }

    users[userIndex] = req.body;
    res.json(req.body);
});

app.delete('/users/:id', (req, res) => {
    const user = users.find(user => user.id == req.params.id);
    if (user) {
        const userIndex = users.indexOf(user);
        users.splice(userIndex, 1);
        res.status(CREATED).json({ message: "OK" });
    }
});

app.get('/users/suggest/:nameFilter', (req, res) => {
    const defaultLimit = 10;
    let limit = defaultLimit;
    if (req.query.limit) {
        limit = req.query.limit;
    }

    const filteredUsers = users
        .filter(user => user.name.startsWith(req.params.nameFilter))
        .slice(0, req.query.limit);
    res.json(filteredUsers);
});

app.listen(APPLICATION_PORT);
console.log(`App running on localhost:${APPLICATION_PORT}`);