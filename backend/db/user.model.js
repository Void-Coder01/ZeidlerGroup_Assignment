import mongoose from 'mongoose';

const User = new mongoose.Schema({
    name : String,
    email : {
        type : String,
        required : true,
        unique : true,
        lowercase: true
    },
    password : {
        type : String,
        required : true
    }
})

const Todo = new mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    description :{
        type : String,
        default : null
    },
    due_date : {
        type : Date,
    },
    isCompleted : {
        type : Boolean,
        default : false
    },
    userId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Users',
        required: true
    },
    reminderSent: { 
        type: Boolean, 
        default: false 
    }
    }, {
    timestamps: true
})

export const userModel = mongoose.model('Users', User);
export const todoModel = mongoose.model('Todos', Todo);

