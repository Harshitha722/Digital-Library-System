const mongoose = require("mongoose");

const borrowRecordSchema =
new mongoose.Schema(
{
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },

    bookId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Book"
    },

    issueDate:{
        type:Date,
        default:Date.now
    },

    dueDate:{
        type:Date
    },

    returnDate:{
        type:Date
    },

    fine:{
        type:Number,
        default:0
    },

    status:{
        type:String,
        enum:[
            "issued",
            "returned",
            "overdue"
        ],
        default:"issued"
    }
},
{
    timestamps:true
}
);

module.exports =
mongoose.model(
"BorrowRecord",
borrowRecordSchema
);