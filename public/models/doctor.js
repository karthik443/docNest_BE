import mongoose from "mongoose";

const docSchema= new mongoose.Schema({
    name:{ type: String,required: true,trim: true},
    specialisation:{ type: String,required: false},
    charge:{type:Number,required:true,default:0,min:0},
    description: {type: String},
    caseCount:{type:Number},
    experience:{type:Number},
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
   
},{
    timestamps: true 
})
const doctor= mongoose.model('doctor',docSchema)
export default doctor