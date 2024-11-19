import Tasks from '../Db/model/task.js'
import express from 'express'

const app = express()
app.use( express.json())
app.use(express.static("./TaskManager"))

const gettask = async(req, res)=>{
    const alltask = await Tasks.find({}) ;
   
     res.status(201).json({ alltask })
}
const getspecifictask = async(req, res)=>{
  try{
    const { id } = req.params
    const specifictask =  await Tasks.findOne({ _id : id
    })
    if(!specifictask){
      return res.status(400).json( {message : "Object not found"})
    }
      return res.status(201).json({ specifictask })
    
  } catch(error ) {
    res.status(500).send(`hey there is some error `)
  }
   
}

 const createtask = async (req, res) => {
  
    const { name  , completed } = req.body;
   const newTask = await Tasks.create(
    { completed : completed  ,
      name : name 
    });
    res.status(201).json(newTask);
  
}

const updatetask =  async(req , res)=>{
try{
  const { id } = req.params;
  
const task = await Tasks.findOneAndUpdate( { _id : id } ,req.body  , { new: true , runValidators:true })
if(!task){
  return res.status(400).json( {message : "Object not found"})
}
  res.status(200).json({task})
}catch(e){
  res.status(500).send(`hey there is some error `)
}
}

const deletetask =async (req , res)=>{
  try{
    const { id } = req.params
    const task = await  Tasks.findOneAndDelete({ _id : id})
    if(!task){
      return res.status(400).json( {message : "Object not found"})
    }
      return res.status(200).json({ Messagae  :`sucessfully deleted  ${task}`  })
    
  } catch(error ) {
    res.status(500).send(`hey there is some error `)
  }
   
}









export { gettask , getspecifictask , createtask  , updatetask , deletetask}
