import mongoose from 'mongoose'
import { Schema } from 'mongoose'

const userSchema = new Schema({
    firstName:{type:String,required:1},
    lastName:{type:String,required:1},
    email:{type:String,required:1},
    password:{type:String,required:1}
},{timestamps:true}
)

export default new mongoose.model("user",userSchema)