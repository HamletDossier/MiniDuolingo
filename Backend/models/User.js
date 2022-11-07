import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';

/*
	* New Schema (User)
*/
const userSchema = new mongoose.Schema({
	email:{
		type:String,
		require:true,
		trim:true,
		unique:true,
		lowercase:true,
		index:{ unique:true }

	},
	password:{
		type:String,
		require:true,
	},
	salt:{
		type:String,
		require:true,
	}
});

/*
	* Hash Password
*/
userSchema.pre("save", async function(next){
	//* User value
	const user = this;

	if(!user.isModified('password')) return next();
	try {
		//* Create a new salt
		user.salt = await bcryptjs.genSalt(10);
		//* Hash Password
		user.password = await bcryptjs.hash(user.password,user.salt);
		//* Next
		next();
	} catch (error) {
		console.log(error);
		//* Create a new Error
		throw new Error('Error to hash a password');
	}
});

/*
	* Comparation for password
*/
userSchema.methods.comparePassword = async function(candidatePassword){
	//* User value
	const user = this;
	//* Comparation
	return await bcryptjs.compare(candidatePassword, user.password);
};

//* Export Schema
export const User = mongoose.model('User',userSchema);