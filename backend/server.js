const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

//Defining global variables
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // * => allow all origins
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,OPTIONS,DELETE");
  res.header(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Auth-Token, Accept"
  ); // add remove headers according to your needs
  next();
});

//Connect to DB
const db = "mongodb://localhost:27017/ontsk";

mongoose
  .connect(process.env.MONGODB_URI || db, { useNewUrlParser: true })
  .then(console.log("Connected to MongoDB"))
  .catch(err => console.log(err));

//Creating DB
const todoSchema = new mongoose.Schema({
  title: String,
  complete: {
    type: Boolean,
    default: false
  }
});

const Todo = mongoose.model("todos", todoSchema);

//GET request
app.get("/todos", (req, res) => {
  Todo.find().then(todo => res.json(todo));
});

//POST request
app.post("/todos", (req, res) => {
  const newTodo = new Todo({
    title: req.body.title
  });
  newTodo.save().then(todo => res.json(todo));
});

//DELETE request
app.delete("/todos/:id", (req, res) => {
  Todo.findByIdAndDelete(req.params.id).then(() => res.json({ remove: true }));
});

// if (process.env.NODE_ENV === "production") {
//   app.use(express.static("client/build"));
//
//   app.get("*", (req, res) => {
//     res.sendFile(path.join(__dirname, "client", "build", "index.html"));
//   });
// }

app.use(express.static(__dirname + "/dist/"));
app.get(/.*/, function(req, res) {
  res.sendFile(__dirname + "/dist/index.html");
});

app.listen(PORT, () => {
  console.log(`Server is starting at PORT: ${PORT}`);
});
