import  express from "express";
import { createComment ,getPostComments ,LikeComment,editComment ,deleteComment} from "../controllers/comment.controller.js";
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router()


router.post('/create',verifyToken, createComment)
router.get('/getPostComments/:postId' ,getPostComments )
router.put('/likeComment/:commentId',verifyToken ,LikeComment)
router.put('/editComment/:commentId',verifyToken ,editComment)
router.delete('/deleteComment/:commentId',verifyToken ,deleteComment)

export default router;