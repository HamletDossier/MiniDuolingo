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

export const Role = mongoose.model('Role',roleSchema);