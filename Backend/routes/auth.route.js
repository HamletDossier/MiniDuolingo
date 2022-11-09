import {Router} from "express"
import { infoUser, login, register,refreshToken, logout } from '../controllers/auth.controller.js';
import {body} from 'express-validator';
import { ValidationResultExpress } from '../middlewares/validationResultExpress.js';
import { requireToken } from "../middlewares/requireToken.js";
import { requiereRefreshToken } from "../middlewares/requireRefreshToken.js";
const router = Router();

/*
	*Register
*/
router.post('/register',[
	body('email', 'Wrong Email Format')
		.trim()
		.isEmail()
		.normalizeEmail(),
	body('password','Wrong Password Format')
		.isLength({ min:6 })
	],
	ValidationResultExpress,
	register);

/*
	*Login
*/
router.post("/login", [
	body('email', 'Wrong Email Format')
		.trim()
		.isEmail()
		.normalizeEmail(),
	body('password','Wrong Password Format')
		.isLength({ min:6 })
	],
	ValidationResultExpress,
	login);
/*
	//* Examples
*/
router.get('/protected',requireToken,infoUser);
router.get('/refresh',requiereRefreshToken,refreshToken);
router.get('/logout',logout);

export default router;