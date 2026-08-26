const userModel = require('../models/user.model')
// const crypto = require('crypto')
const bcrypt  = require("bcrypt")
const jwt = require('jsonwebtoken')


async function registerController(req,res)  {
    const {email, username, password, bio, profileImage } = req.body

    // const isUserExistByEmail = await userModel.findOne({email})

    // if(isUserExistsByEmail){
    //     return res.status(409).json({
    //         message: "user already exists with same email"
    //     })
    // }

    // const isUserExistByUsername = await userModel.findOne({ username })

    // if(isUserExistByUsername) {
    //     return res.status(409).json({ 
    //         message:"user already exists by username"
    //     })
    // }


    //efficeint way to checck is UserAlreadyExists (using $or: [])
    const isUserAlreadyExists = await userModel.findOne({
        $or: [
            {  username },
            { email }
        ]
    })

    if (isUserAlreadyExists) {
        return res.status(409)            //ek check laga dia ki agr email repeat hor ahoga t owo likha ajega wrna username already exists 
        .json({
            message: "User already exists" + (isUserAlreadyExists.email == email ? "Email already exists" : "Username already exists")
        })
    }

    // const hash = crypto.createHash('sha256').update(password).digest('hex')  // converting our password into hash (sha256 is hashing algo)

    const hash = await bcrypt.hash(password, 10)

    const user  = await userModel.create({
        username,
        email,
        bio,
        profileImage,
        password: hash
    })
  
/** for creating token
    * - user ka data hona chahiye 
    * - data unique hona chahiye
*/
    const token = jwt.sign({
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET,
    {expiresIn: "1d"}              //kab tak expirehoga token wo bataya 
    )

    res.cookie("token", token)

    res.status(201).json({
        message: "User registered successfully",
        user:{
            email: user.email,
            username: user.username,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}


async function loginController(req,res) {
    const { username, email, password } = req.body

    /** in dono me se kuch bhi user ek sath dega to login hojaye hame aisa likhna hain 
     * username
     * passowrd
     * 
     * email
     * password
     */

    const user = await userModel.findOne({
        $or:[
            {
                username: username  
            },
            {
                email: email      
            }
        ] 
    })

    if(!user) {
        return res.status(404).json({
            message: "User not found"
        })
    }

    // const hash = crypto.createHash('sha256').update(password).digest('hex')
    // const isPasswordValid = hash == user.password

    const isPasswordValid = await bcrypt.compare(password, user.password)

    if(!isPasswordValid){
        return res.status(404).json({
            message: "password invlaid"
        })
    }

    const token  = jwt.sign({              // agr password valid hua to token create krdia 
        id: user._id,
        username: user.username
    }, process.env.JWT_SECRET, {expiresIn: "1d"})

    res.cookie("token", token)        //cookie stoarage me server ab token ko save kr rha hain so that it can check cookie again while user will in futute again req. to acess

    res.status(200).json({
        message: "User logged in successfully",
        user:{
            username:user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}


async function getMeController(req,res) {
    const userId = req.user.id

    const user = await userModel.findById(userId)

    res.status(200).json({
        user:{
            username: user.username,
            email: user.email,
            bio: user.bio,
            profileImage: user.profileImage
        }
    })
}


module.exports = {
    registerController,
    loginController,
    getMeController
}