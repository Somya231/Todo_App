const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://somyaparikh09:v7dz4T5X7vCbeEJM@cluster0.jhcjj.mongodb.net/Todo_app");
        console.log("Connected to MongoDB");
    } catch (err) {
        console.error("Could not connect to MongoDB", err);
        process.exit(1);
    }
};

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});

const todo = mongoose.model('Todo', todoSchema);

module.exports = {
    connectDB,
    todo
}