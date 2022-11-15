import mongoose from "mongoose";
import bcryptjs from 'bcryptjs';
import { Role } from "./Role.js";


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
	role:{
		type:mongoose.Schema.Types.ObjectId,
		ref:"Role"
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
		const salt = await bcryptjs.genSalt(10);
		//* Hash Password
		user.password = await bcryptjs.hash(user.password,salt);
		//* Next
		next();
	} catch (error) {
		//* Create a new Error
		throw new Error(error);
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
/*
	* Creat a new user with:
	! Email, password and role
*/
userSchema.statics.crateNewUser = async function(data){
	try {
		//* Get values
		let {email,password,role} = data;
		//* Search the user role 
		role = await Role.getIDByName(role);
		//* Add new instance
		let newUser = new User({
			email,
			password,
			role
		})
		//* Save user
		newUser = await newUser.save();
		//* Return new User
		return newUser;
		
	} catch (error) {
		console.log(error);
		
	}

}
//* Export Schema
export const User = mongoose.model('User',userSchema);