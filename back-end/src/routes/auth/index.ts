import * as express from "express"
import { login, signUp, update } from "../../middleware/authentication/local.auth"
export const router = express.Router();

router.post('/login', login);
router.post('/signup', signUp)
router.post('/update', update)
