import * as express from "express"

export const router = express.Router();

//Routes
import {router as articleRouter} from "./article/index"
import {router as userRouter} from "./user/index"
import {router as authenticationRouter} from "./auth/index"

router.use('/article', articleRouter);
router.use('/user', userRouter);
router.use('/auth', authenticationRouter);

