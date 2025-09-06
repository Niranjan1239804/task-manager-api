const mongoose=require('mongoose')

const connectDB=async(url)=>{
    try {
         await mongoose.connect(url)
        console.log('Mongodb connected succesfully...')
    } catch (error) {
        console.log('Failed to connect !!')
        process.exit(1)
    }
}
module.exports=connectDB