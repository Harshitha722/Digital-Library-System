const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
{
    title:{
        type:String,
        required:true
    },

    author:{
        type:String,
        required:true
    },

    isbn:{
        type:String,
        required:true,
        unique:true
    },

    quantity:{
        type:Number,
        default:1
    },

    availableCopies:{
        type:Number,
        default:1
    },

    type:{
        type:String,
        enum:["physical","ebook"],
        default:"physical"
    },

    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category"
    }
},
{
    timestamps:true
}
);

module.exports =
mongoose.model("Book",bookSchema);