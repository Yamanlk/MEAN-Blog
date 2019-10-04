import * as express from "express"
import { login, signUp } from "../../middleware/authentication/local.auth"
export const router = express.Router();

router.post('/login', login);
router.post('/signup', signUp)