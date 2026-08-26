const mongoose = require("mongoose")


const likeSchema = new mongoose.Schema({
    post: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "posts",
        required: [true, "post id is required for creating a like"]
    },
    user: {
        type: String,
        required: [ true, "username is required for creatign a like"]
    }
}, {
    timestamps: true
})

//again ham chahte hain ki same post ko same user lika na kre to isliye post or user ka combination unique hona chaiye 

likeSchema.index({ post: 1, user: 1}, { unique: true })

const likeModel = mongoose.model("likes", likeSchema)



module.exports = likeModel