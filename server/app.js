// server/index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    }
});
dotenv.config()
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

const QuestionSchema = new mongoose.Schema({
    content: String,
});

const Question = mongoose.model('Question', QuestionSchema);

app.post('/api/questions', async (req, res) => {
    const question = new Question(req.body);
    await question.save();
    io.emit('newQuestion', question);
    res.status(201).send(question);
});

// server/index.js
app.delete('/api/questions/:id', async (req, res) => {
    const { id } = req.params;
    await Question.findByIdAndDelete(id);
    res.status(200).send({ message: 'Question deleted' });
});


io.on('connection', (socket) => {
    console.log('a user connected');
});

server.listen(5000, () => {
    console.log('Server is running on port 5000');
});
