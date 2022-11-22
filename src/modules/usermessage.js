const mongoose = require('mongoose');
const validator = require('validator');

const UserSchema = new mongoose.Schema
({
    email:
    {
        type:String,
        required : true,
        validator(value)
        {
            if(!validator.isEmail(value)){
                throw new Error('Invalid Email Id');
            }
        }
    },
    name:
    {
        type:String,
        required:true,
        minlength:3
    },
    username:
    {
        type:String,
        required:true,
        minlength:5
    },
    password:
    {
        type:String,
        required:true,
        minlength:5
    },
    textarea:
    {
        type:[String],
        minlength:10
    }
})

const User = new mongoose.model('User',UserSchema)
module.exports = User;