import jwt from 'jsonwebtoken';
export const requireToken = (req,res,next) =>{
	try {
		//* Get token And bearear
		let token = req.headers?.authorization;
		//* If token don't exist 
		if(!token) throw new Error("Require Token");
		//* Get only token
		token = token.split(" ")[1];
		//* Get payload
		const {uid} =jwt.verify(token, process.env.JWT_SECRET)
		//* Set uid
		req.uid = uid;
		//* Ok next
		next();
	} catch (error) {
		return res.status(401).json({
			error:error.message
		})
	}
}