const mongoose = require("mongoose")


const postSchema = new mongoose.Schema({
    caption: {
        type: String,
        default: ""
    },
    imgUrl: {
        type: String,
        required: [true, "imgUrl is required for creating an post"]
    },
    users:{     //ab yha pr ye refrence mtlb hain hame ye user id (users Collection) me mil jaegi
        type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: [ true, "user id is required for creating an post"]
    }
})


const postModel = mongoose.model("posts", postSchema)


module.exports = postModel