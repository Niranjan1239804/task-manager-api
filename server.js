const express=require('express')
const app=express()
const taskRouter=require('./routes/TaskRoutes')
const connectDB=require('./config/db')
const path = require('path');
const expressLayouts = require('express-ejs-layouts');
require('dotenv').config()

app.use(express.urlencoded({ extended: true }));
app.use(express.json())

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout', 'layout')

app.use('/',taskRouter)


const url=process.env.MONGO_URI
const port=process.env.PORT ||5050
connectDB(url).then(()=>{
    app.listen(process.env.PORT,()=>{
    console.log('Server started listening ... ')
})
}).catch((error)=>{
    console.log(error.message)
})


