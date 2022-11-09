import {body} from 'express-validator';
import { ValidationResultExpress } from '../middlewares/validationResultExpress.js';
/*
	* Validationes manager for User
*/
export const validatorManagerUser =[
	//* Email
	body('email', 'Wrong Email Format')
		.trim()
		.isEmail()
		.normalizeEmail(),
	//* Password
	body('password','Wrong Password Format')
		.isLength({ min:6 }),
		ValidationResultExpress
]