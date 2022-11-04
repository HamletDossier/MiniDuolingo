import {User} from '../models/User.js'
export const register = async (req,res)=>{
	//* Get email and passwrod from request
	const {email,password} = req.body;
	try {
		//* Search if exist email
		let user = await User.findOne({email});
		if(user) throw {code:11000};
		//* Add new instance
		user = new User({
			email,
			password
		})
		//* Save user
		await user.save();
		//* Return jwt
		return res.json({ok:true});

	} catch (error) {
		//* Error Duplicate email from Mongodbd Atlas
		if(error.code === 11000)
			return res.status(400).json({error: 'Duplicate email'})
		//* Others error in data base
		return res.status(500).json({error: 'Data Base error'})
	}
}

export const login = async (req,res) => {
	res.json({'ok':'loging'});
}
