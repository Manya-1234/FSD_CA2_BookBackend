import mongoose from "mongoose";
import { Schema } from "mongoose";

const bookSchema= new Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    availabilitystatus:{
        type:String,
        enum:["yes","no"],
        default:"yes",
    }
},{timestamps:true})

export const Book= mongoose.model("Book",bookSchema)