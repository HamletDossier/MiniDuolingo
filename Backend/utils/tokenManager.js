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

export const generateRefreshToken = (uid,res) =>{
	//* 30 days expires
	const expiresIn = 60 * 60 * 24 * 30;
	try {
		//* Sing refresh token
		const refreshToken = jwt.sign({uid},process.env.JWT_REFRESH,{expiresIn});
		//* Send cookie client
		res.cookie("refreshToken",refreshToken,{
			httpOnly: true,
			secure: !(process.env.MODO === "developer"),
			expires:new Date(Date.now() + expiresIn * 1000)
		});
	} catch (error) {
		//* Error server
		console.log(error);
	}
}