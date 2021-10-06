const express=require('express');
const app=express();
let mongoose=require('mongoose');

const port=5000;
app.listen(port,()=>{
    console.log(port);  
})

let mongoDBUri=require('./config/keys').mongoDBUri;
    mongoose.connect(mongoDBUri,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(()=>{
    console.log("Connected!");
}).catch((err)=>{
    console.log(err);
})

var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const auth=require('./routers/auth');
app.use('/',auth);