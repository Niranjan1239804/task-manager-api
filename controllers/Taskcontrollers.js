const Task=require('../models/Task')

exports.getTasks=async(req,res)=>{
  try {
    const tasks= await Task.find()
    res.status(200).json(tasks)
  } catch (error) {
    console.log('Error while fetching tasks',error)
    res.status(500).json({message:"Internal server error ..."})
    
  }

}
exports.getTask=async(req,res)=>{

try {
    const task= await Task.findById(req.params.id)
    if(!task){
        res.status(404).json({message:"Inavlid id !!"})
    }
    res.status(200).json(task)
} catch (error) {
     console.log('Error while fetchinga task',error)
    res.status(500).json({message:"Internal server error ..."})
}
}
exports.createTask=async(req,res)=>{
try {
    const newTask= new Task(req.body)
    const savedTask= await newTask.save()
    res.status(201).json(savedTask)
} catch (error) {
     console.log('Error while creating a task',error)
    res.status(500).json({message:"Internal server error ..."})
}
}
exports.updateTask=async(req,res)=>{
try {
    const updatedTask=await Task.findByIdAndUpdate(req.params.id,req.body,{new:true,runValidators:true})
    if(!updatedTask){
        res.status(404).json({message:"Inavlid id !!"})
    }
    res.status(200).json(updatedTask)
} catch (error) {
     console.log('Error while updating a task',error)
    res.status(500).json({message:"Internal server error ..."})
}
}
exports.deleteTask=async(req,res)=>{
try {
    const deletedTask=await Task.findByIdAndDelete(req.params.id)
    if(!deletedTask){
        res.status(404).json({message:"Inavlid id !!"})
    }
     res.status(200).json(deletedTask)
} catch (error) {
     console.log('Error while deleting a task',error)
    res.status(500).json({message:"Internal server error ..."})
}
}
