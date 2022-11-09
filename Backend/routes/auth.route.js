import {Router} from "express"
import { infoUser, login, register,refreshToken, logout } from '../controllers/auth.controller.js';
import { requireToken } from "../middlewares/requireToken.js";
import { requiereRefreshToken } from "../middlewares/requireRefreshToken.js";
import { validatorManagerUser } from "../middlewares/validatorManager.js";
/*
	*Start router
*/
const router = Router();

/*
	*Register
*/
router.post('/register',validatorManagerUser, register);

/*
	*Login
*/
router.post("/login", validatorManagerUser,  login);
/*
	*Logout
*/
router.get('/logout',logout);


/*
	//* Examples
*/
router.get('/protected',requireToken,infoUser);
router.get('/refresh',requiereRefreshToken,refreshToken);

export default router;