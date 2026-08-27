const postModel = require("../models/post.model")
const ImageKit = require("@imagekit/nodejs")      //imagekit ko require krenge 
const {toFile} = require("@imagekit/nodejs") 
const jwt = require("jsonwebtoken")
const likeModel = require("../models/like.model")


const imagekit = new ImageKit({          //ab imagekit ko initiate krna padta hain  
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY
})


async function createPostController(req, res) {

    //ye piece of code server se file ko imagekit( cloud Storage provider ) tak phocha rha hain
    const file = await imagekit.files.upload({
        file: await ImageKit.toFile(Buffer.from(req.file.buffer), 'file'),  //yha code buffer ko file me convert kri hain 
        fileName: "Test",
        folder: "cohort-2-insta-clone-posts"   //isse kya hoga ki jitni bhi post create krenge unki image jake is folder ke andar imagekit.io me sotre hoti rhengi
    })

    // res.send(file)

    const post = await postModel.create({  //post create kr rhe hain (caption, imageurl, or ab user bhi identify krke)
        caption: req.body.caption,
        imgUrl: file.url,
        users: req.user.id
    })

    res.status(201).json({
        message:"Post created successfully",
        post
    })

}


async function getPostController( req, res){

    const userId = req.user.id    //jis user ne req kri thi ab uski id ajaegi cookies me se 

    const posts = await postModel.find({  // postModel ki collection me jao aur wo saare documents dhoondo jinka users field userId ke barabar ho.
        users: userId
    })

    res.status(200).json({
        message: "Posts fetched sucessfully.",
        posts
    })

}


async function getPostDetailsController(req, res) {

    const userId = req.user.id
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message: "Post not found"
        })
    }

    const isValidUser = post.users.toString() === userId     // jisne create kri post or jo req kr rha hain details ki post ki wo dono same hain ya nhi 

    if(!isValidUser) {                   //means jis user ne create kra tha post or jo req krra hai agr dono match nhi krte to yhi se return hojaega ye msg
        return res.status(403).json({
            message: "forbidden content"
        })
    }

    return res.status(200).json({        //agr sab thik hua to 
        message: "Post fetched successfully"
    })
}


async function likePostController(req,res) {

    const username = req.user.username
    const postId = req.params.postId

    const post = await postModel.findById(postId)

    if(!post){
        return res.status(404).json({
            message: "Post not found."
        })
    }

    const like = await likeModel.create({
        post: postId,
        user: username
    })

    res.status(200).json({
        message:"Post liked successfully.",
        like
    })
}


async function unLikePostController(req, res) {
    const postId = req.params.postId
    const username = req.user.username

    // check kr rhe hai phle ki post ko like kr rkha hain ya nhi
    const isLiked = await likeModel.findOne({
        post: postId,
        user: username
    })

    if(!isLiked){
        return res.status(400).json({
            message:"Post didnt like"
        })
    }

    await likeModel.findOneAndDelete({_id: isLiked._id})

    return res.status(200).json({
        message: "post un liked successfully"
    })
}


async function getFeedController(req,res) {

    const user = req.user

    const posts  = await Promise.all( (await postModel.find().sort({_id: -1}).populate("users").lean() )
    .map(async (post) => {

        /**
         * typeof post => object
         */

        const isLiked = await likeModel.findOne({
            users: user.username,
            post: post._id
        })

        post.isLiked = Boolean(isLiked)

        return post
    }))


    res.status(200).json({
        message: "posts fetched successfully",
        posts 
    })
}


module.exports = {
    createPostController,
    getPostController, 
    getPostDetailsController,
    likePostController,
    getFeedController,
    unLikePostController
}