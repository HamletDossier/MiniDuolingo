import {Router} from "express"
import { login, register } from '../controllers/auth.controller.js';
import {body} from 'express-validator';
import { ValidationResultExpress } from '../middlewares/validationResultExpress.js';
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

export default router;