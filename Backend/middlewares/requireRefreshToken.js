import jwt from 'jsonwebtoken';
export const requiereRefreshToken = (req,res,next)=>{
	try {
		//* Get token from cookies
		const refreshTokenCookie = req.cookies.refreshToken;
		//* If token don't exist 
		if(!refreshTokenCookie) throw new Error("Require Token");
		//* Get payload
		const {uid} =jwt.verify(refreshTokenCookie, process.env.JWT_REFRESH);
		//* Return uid
		res.uid = uid;
		//* Next
		next();
	} catch (error) {
		return res.status(401).json({
			error:error.message
		});
	}
}