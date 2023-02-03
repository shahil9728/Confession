const express = require('express')
const app = express();
const mongoose = require('mongoose')
require('./db/conn');
const { error } = require('console');
const User = require('./modules/usermessage');
bodyparser = require('body-parser')
app.use(bodyparser.urlencoded({ extended: true }));
const path = require('path')
const hbs = require('hbs')
const bcrypt = require('bcrypt');
const port = process.env.PORT || 4000;
const ejs = require('ejs');
const { response } = require('express');

const templatepath = path.join(__dirname, '../src/templates/views')

app.set('view engine', 'hbs')
app.set('views', templatepath)
app.set('view engine', 'ejs')
app.set('views', templatepath)
app.use(express.json());
app.use('/partial', express.static(path.join(__dirname, '../styles/partial')))
app.use('/styles', express.static(path.join(__dirname, "../styles/index.css")))
app.use('/images', express.static(path.join(__dirname, '/templates/images')))
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.render('index.hbs');
})
app.get('/signup', (req, res) => {
    res.render('signup.hbs');
})
app.get('/login', (req, res) => {
    res.render('login.hbs');
})
app.get('/profiletemp', (req, res) => {
    res.render('./Login/profile.ejs');
})
app.get('/logout',async(req,res)=>{
    res.render('index.hbs')
})


app.post('/profile', async (req, res) => {
    try {
        let user = await User.findOne({ email: req.body.email });
        let username = await User.findOne({ username: req.body.username });
        if (username) {
            return res.status(400).send("Username is already registered");
        }
        if (user) {
            return res.status(400).send("Email is already exists");
        }
        else {
            user = new User(req.body);
        }
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
        await user.save();
        msg1=user.textarea;
        res.status(201).render('./Login/profile.ejs', { name: user.name, username: user.username,msg: msg1});
    }
    catch (error) {
        console.log("Site is crashed")
        res.status(500).send(error);
    }
})

global.user_name = "";

function copy(cusname) {
    user_name = cusname;
}

global.array = [];

app.post('/login', async (req, res) => {
    let user = await User.findOne({ email: req.body.email });
    if (!user) {
        return res.status(400).send("Incorrect Email or password");
    }
    else {
        copy(user.name);
    }
    const validpassword = await bcrypt.compare(req.body.password, user.password);
    if (!validpassword) {
        return res.status(400).send("Incorrect password");
    }
    var msg1 = [];
    msg1 = user.textarea;
    res.status(201).render('login/profile.ejs', { name: user.name, username: user.username,msg:msg1});
})

app.post('/user', async (req, res) => {
    let user = await User.findOne({ name: user_name });
    user_name = user.name;
    res.render('user.ejs', { name: user_name, success: "" });
})

app.post('/sendmsg', async (req, res) => {
    if(req.body.textarea)
    {
        let user = await User.findOne({ name: user_name })
        array = user.textarea;
        user_name = user.name;
        array.push(req.body.textarea);
        await User.findOneAndUpdate({ name: user.name }, { textarea: array });
        res.render('user.ejs', { name: user_name, success: " Message has been sent" })
    }
    else
    {
        res.send("Please write some confession message")
    }
})


var schema = new mongoose.Schema({
    email: String,
    name: String,
    username: String,
    password: String,
    textarea: String
})






app.listen(port, (req, res) => {
    console.log("Server is runnning at 4000");
})