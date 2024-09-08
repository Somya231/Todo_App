const express = require("express");
const cors = require("cors");
const { createTodo, updateTodo } = require("./types");
const { connectDB, todo } = require("./db");

const app = express();

app.use(express.json());
app.use(cors());

app.post('/todo', async (req, res) => {
    const createPayload = req.body;
    const parsePayload = createTodo.safeParse(createPayload);

    if (!parsePayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs"
        });
        return;
    } 
    try {
        await todo.create({
            title: parsePayload.data.title,
            description: parsePayload.data.description,
            completed: false
        });

        res.json({
            msg: "Todo created"
        });
    } catch(err) {
        console.error("Error creating todo:", err);
        res.status(500).json({ msg: "Something went wrong" });
    }
});

app.get('/todos', async (req, res) => {
    try {
        const todos = await todo.find();
        res.json({ todos });
    } catch(err) {
        console.error("Error fetching todos:", err);
        res.status(500).json({ msg: "Something went wrong" });
    }
});

app.put('/completed', async (req, res) => {
    const updatePayload = req.body.id;
    const parsePayload = updateTodo.safeParse(updatePayload);

    if (!parsePayload.success) {
        res.status(411).json({
            msg: "Wrong inputs"
        });
        return;
    } 
     
    try {
        await todo.updateOne({
            _id: req.body.id
        }, {
            completed: true
        });

        res.json({
            msg: "Todo marked as done"
        });
    } catch(err) {
        console.error("Error updating todo:", err);
        res.status(500).json({ msg: "Something went wrong" });
    }
});

connectDB().then(() => {
    app.listen(3000, () => console.log('Server is running on port 3000'));
}).catch(err => {
    console.error("Failed to connect to the database. Server not started.", err);
    process.exit(1);
});