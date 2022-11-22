const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://Shahil:Shahil123@cluster0.fedo0nq.mongodb.net/Confession?retryWrites=true&w=majority',
{}).then(()=>{
    console.log("Connection is successful");
}).catch((error)=>{
    console.log(error);
})