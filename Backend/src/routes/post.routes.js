const express = require("express")
const postRouter = express.Router()
const postController = require("../controllers/post.controller")
const multer = require("multer")   //multer power deta hain express ke server ko jo file ari hain unhe read kr sku 
const upload = multer({ storage: multer.memoryStorage() })
const identifyUser = require("../middlewares/auth.middleware")


/** ye api protected hogi means jis user pr token hoga whi acess kr skta hain jispe token nhi hoga use error show krdenge
 * @routePOST /api/posts [protected]
 * - req.body = { caption, image-file }
 */
postRouter.post("/",upload.single("image"), identifyUser, postController.createPostController)


/**
 * @route GET /api/posts/ [protected]
 * @description return all the post create by the user  
 */
postRouter.get("/", identifyUser,  postController.getPostController)


/**
 * @route GET /api/posts/details/:postid
 * @description return an detail about specific post with the id . also check whether the post belongs to the user from whom the request comes from
 */
postRouter.get("/details/:postId", postController.getPostDetailsController)


/**
 * @route POST /api/posts/like/:postid
 * @description like a post with the id provided in the request params.
 */
postRouter.post("/like/:postId", identifyUser, postController.likePostController)

postRouter.post("/unlike/:postId", identifyUser, postController.unLikePostController)


/**
 * @route GET /api/posts/feed
 * @description get all the post created in the DB
 * @access private
 */
postRouter.get("/feed", identifyUser, postController.getFeedController)


module.exports = postRouter