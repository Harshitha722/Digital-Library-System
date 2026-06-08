const mongoose =
require("mongoose");

const bookSchema =
new mongoose.Schema({

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

  category:{
    type:
    mongoose.Schema.Types.ObjectId,

    ref:"Category"
  },

  description:{
    type:String
  },

  publisher:{
    type:String
  },

  totalCopies:{
    type:Number,
    default:1
  },

  availableCopies:{
    type:Number,
    default:1
  },

  coverImage:{
    type:String
  }

},

{
  timestamps:true
});

module.exports =
mongoose.model(
  "Book",
  bookSchema
);