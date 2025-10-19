const mongoose=require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;
//mongoose.connect("mongodb+srv://gohul4151:l0CuxIReNPQHJeFh@cluster0.wmlpvp8.mongodb.net/gohul");

const User = new Schema({
  name: String,
  email: String,
  password: String
});

const Todo = new Schema({
    userId: ObjectId,
    title: String,
    done: Boolean
});
const usermodel=mongoose.model('user',User);
const todomodel=mongoose.model('todo',Todo);

module.exports = {
    usermodel,
    todomodel
}