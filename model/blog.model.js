const mongoose = require('mongoose');

const blogSchema  = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    title: {
        type: String,
        unique:true
    },
    description: {
        type: String
    },
},{
    versionKey: false,
    timestamps: true,
});


module.exports = mongoose.model("blogs", blogSchema);

