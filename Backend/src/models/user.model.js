const mongoose = require("mongoose")

const userSchema = new mongoose.Schema({
    username: {
    type: String,
    unique: [true, "User name already exists"],    // is strinng ka mtlb hain ki agr unique username nhi dia to ye msg show hojaega
    required: [true, "User name is required"]      //*required true means bina username ke ham koi bhi user creaate ni kr paenge 
    },
    email: {
        type: String,
        unique: [true, "Email already exists"],
        required: [true, "Email is required"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    },
    bio: String,
    profileImage: {          // ab profile me hame ek default image bhi to lagani padegi to wo abhi ye laga di
        type: String,
        default: "https://ik.imagekit.io/f8khymiop/9dd2906190f0c1813429fe0c8695ed04.png"
    },
    /**
     * id = 12bytes storage lega
     */
    
})



const userModel = mongoose.model("users", userSchema)

module.exports = userModel




// we will learn imp thing in this proj that is Cloudstorage provider
// or jo ham abhi use krenge cloudstorage provider wo hoga (imagekit.io)

// ham imagekit ka use kaise krte hain -> whaa images ke collection to rhte hi hain wrna ham media library pr jake 
// apne choice ki image bhi dal skte hain drag krke wha pr or wha se hme direct link mi ljati hai us image ki best btt 