import * as express from "express"
import * as userController from "../../controllers/userController"
export const router = express.Router();
router.post('/creat', userController.creatUser);
