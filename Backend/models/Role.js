import mongoose from "mongoose";

/*
	* New schema (role)
*/
const roleSchema = new mongoose.Schema({
	name:{
		type:String,
		require:true,
		trim:true,
		unique:true,
		lowercase:true,
		index:{ unique:true }
	}
});
/*
	* Method get id by name
*/
roleSchema.statics.getIDByName = async function(nameRole){
	try {
		//* Return Rol
		const id = await Role.findOne({name:nameRole},{name:0,_id:1,__v: 0});
		//* If exist retrun ID
		if(id) return id['_id'];
		//* If don't exist generate error
		throw {code: 10};
	} catch (error) {
		//* Error wrong name
		if(error.code === 10)
			throw new Error({error: 'Wrong name getIDName'});
		//* Others error in Roles
		throw new Error({error: 'Roles error'})
	}
}
export const Role = mongoose.model('Role',roleSchema);