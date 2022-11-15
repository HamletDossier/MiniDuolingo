import {User} from '../models/User.js';
import { addTokensByIDUser, generateRefreshToken, generateToken } from '../utils/tokenManager.js';
import jwt from 'jsonwebtoken';
import { Role } from '../models/Role.js';
export const register = async (req,res)=>{
	//* Get email and passwrod from request
	const {email,password} = req.body;
	try {
		//* Search if exist email
		let user = await User.findOne({email});
		if(user) throw {code:11000};
		//* Create a new user from User.js
		user = User.crateNewUser({
			email,
			password,
			role: 'user'
		});
		//* Generate token,expires and refresh token
		const {token,expiresIn} = addTokensByIDUser(user.id,res);
		//* Return token
		return res.json({token,expiresIn});

	} catch (error) {
		//* Error Duplicate email from Mongodbd Atlas
		if(error.code === 11000)
			return res.status(400).json({error: 'Duplicate email'})
		//* Others error in data base
		return res.status(500).json(error.message)
	}
}

export const login = async (req,res) => {
	try {
		//* Get email and passwrod from request
		const {email,password} = req.body;
		//* Search if exist email
		let user = await User.findOne({email});
		//* If don't exist the user
		if(!user) return res.status(403).json({error:"Don't exist the user"});
		//* Comparation to password from user.js
		const respuestaPassword = await user.comparePassword(password);
		//* If don't comparation submit status 403
		if(!respuestaPassword) return res.status(403).json({error:"Don't exist the user"});
		//* Generate token,expires and refresh token
		const {token,expiresIn} = addTokensByIDUser(user.id,res);
		//* Return token
		return res.json({token,expiresIn});
	} catch (error) {
		//* Return error
		return res.status(500).json({error:'Server error'});
	}
}

export const infoUser = async (req,res) =>{
	try {
		//* Find from Mongodb atlas
		const user = await User.findById(req.uid).lean();
		//* Send email
		res.json({email:user.email});
		
	} catch (error) {
		//* Return error
		return res.status(500).json({error:'Server error'});
	}
}
export const refreshToken = (req,res)=>{
	try {
		//* Generate token and expires from tokenManager.js
		const {token,expiresIn} = generateToken(res.uid);
		//* Return token
		return res.json({token,expiresIn});
	} catch (error) {
		//* Return error
		return res.status(500).json({error:'Server error'});
	}
};

export const logout = (req,res)=>{
	res.clearCookie('refreshToken');
	res.json({ok:true});
};