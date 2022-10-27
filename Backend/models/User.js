import {Schema,model} from "mongoose";

const userSchema = new Schema({
	email:{
		type:string,
		require:true,
		trim:true,
		unique:true,
		lowercase:true,
		index:{ unique:true }

	},
	password:{
		type:string,
		require:true,
	}
});

export const User = model('user',userSchema);