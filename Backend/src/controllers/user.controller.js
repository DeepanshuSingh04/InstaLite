const followModel = require("../models/follow.model")
const userModel = require("../models/user.model")


async function followUserController(req,res) {

    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    //ye ek check laga dia taki user khud ko follow na kr ske
    if(followeeUsername == followerUsername) {
        return res.status(400).json({
            message: "You cannot follow yourself"
        })
    }

    // agr koi followee us username ka exist ni krta to uske liye ek or check 
    const isFolloweeExists = await userModel.findOne({
        username: followeeUsername
    })

    if(!isFolloweeExists) {
        return res.status(404).json({
            message: "User you are trying to follow does not exists"
        })
    }

    // ek or check lagare hain so that agr koi already kisi ko follow kr rha hain to wapis na kr paye
    const isAlreadyFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername
    })

    if(isAlreadyFollowing) {
        return res.status(200).json({
            message: `You are alreaady following ${followeeUsername}`,
            follow: isAlreadyFollowing
        })
    }

    const followRecord = await followModel.create({
        follower: followerUsername,
        followee: followeeUsername
    })

    res.status(201).json({
        message: `You are now following ${followeeUsername}`,
        follow: followRecord
    })

}

async function unFollowUserController(req, res) {

    const followerUsername = req.user.username
    const followeeUsername = req.params.username

    const isUserFollowing = await followModel.findOne({
        follower: followerUsername,
        followee: followeeUsername,
    })

    if (!isUserFollowing) {
        return res.status(200).json({
            message: `You are not following ${followeeUsername}`
        })
    }

    await followModel.findByIdAndDelete(isUserFollowing._id)

    res.status(200).json({
        message: `You have unfollowed ${followeeUsername}`
    })
}

module.exports = {
    followUserController,
    unFollowUserController
}