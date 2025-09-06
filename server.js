const express=require('express')
const app=express()
const taskRouter=require('./routes/TaskRoutes')
const connectDB=require('./config/db')
require('dotenv').config()


app.use(express.json())
app.use('/api/tasks',taskRouter)

app.get("/",(req,res)=>{
    res.send('hi from root')
})
const url=process.env.MONGO_URI
const port=process.env.PORT ||5050
connectDB(url).then(()=>{
    app.listen(process.env.PORT,()=>{
    console.log('Server started listening ... ')
})
}).catch((error)=>{
    console.log(error.message)
})


