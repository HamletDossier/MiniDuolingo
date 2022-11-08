import jwt from 'jsonwebtoken';
export const generateToken = (uid) => {
	//* Time Token (60s * 15)
	 const expiresIn = 60*15;
	try {
		//* Sign Token 
		const token = jwt.sign({uid},process.env.JWT_SECRET,{expiresIn});
		return {token,expiresIn}
	} catch (error) {
		console.log(error);
		
	}
};