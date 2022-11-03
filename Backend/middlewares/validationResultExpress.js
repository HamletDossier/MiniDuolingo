import { validationResult } from "express-validator";

/*
	* Validationes for login and register
*/
export const ValidationResultExpress = (req,res,next) => {
	//* Get errors from auth.route.js
	const errors = validationResult(req);

	//* Return if there are errors
	if(!errors.isEmpty())
		return res.status(400).json({errors: errors.array()});

	//* Next
	next();
}