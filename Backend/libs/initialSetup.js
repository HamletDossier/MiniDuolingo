import { Role } from "../models/Role.js"
import { User } from "../models/User.js";

export const createRoles= async () =>{
	try {
		//* Count numbers roles
		const count = await Role.estimatedDocumentCount();
		//* If there are roles retrun
		if(count > 0) return;
		//* Create Roles
		const values = await Promise.all([
			new Role({name:'user'}).save(),
			new Role({name:'moderator'}).save(),
			new Role({name:'admin'}).save()
		]);
		//* Show values
		console.log(values);	
	} catch (error) {
		//* Create a new Error
		throw new Error(error);
	}
}

export const createAdmin = async ()=>{
	try {
		//* Find admin by email
		const email = await User.findOne({email: process.env.ADMIN_EMAIL});
		//* If != Null
		if(!(email === null)) return;
		//* Return Rol admin
		const role = await Role.findOne({name:'admin'},{name:0,_id:1});
		//* Create new Admin
		const newAdmin = await new User({
			email:process.env.ADMIN_EMAIL,
			password:process.env.ADMIN_PASSWORD,
			role
		}).save();
		//* Show new admin
		console.log(newAdmin);
		
	} catch (error) {
		//* Create a new Error
		throw new Error(error);
	}

}