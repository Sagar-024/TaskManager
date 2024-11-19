import mongoose, { Schema } from "mongoose";

const blogschema = new Schema({
    completed : Boolean , 
    name : String ,
})


export default mongoose.model('Task', blogschema)