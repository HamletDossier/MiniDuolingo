import mongoose from 'mongoose';
import request from 'supertest';
import app from '../app.js';
// * Open connect MongoDB Atlas
export const connectDB = async() =>{
	try {
		await mongoose.connect(process.env.URI_MONGO_TEST); 
		console.log('Connect DB ok');
	} catch (error) {
		console.log('Err Connect' + error);
	}
}
//* Close Connect MonoDB Atlas
export const closeDB = async()=>{await mongoose.connection.close();}

//* Return Email and Password by an user
export const dataUser = () =>{
	return {
		email: "yo@example.com",
		password: "example123"
	}
}
//* Return random Int
export const getRandomInt = (max)=> {
	max = Math.floor(max);
	return Math.floor(Math.random() * max);
}
//* Return Email and Password by a successful user 
export const dataRandomUser = () =>{
	return {
		email:`test-${getRandomInt(1000)}-${getRandomInt(100)}@test.com`,
		password: `test-${getRandomInt(1000)}-${getRandomInt(100)}`
	}
}
//* Return data Admin with dataUser function
export const requestLogin = async(data = null) =>{
	const user = data || dataUser();
	const response = 
		await request(app)
		.post("/api/v1/auth/login")
		.send(user)
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/);
	return response;
}

export const requestProtected = async(TOKEN) =>{
	const response = 
		await request(app)
		.get("/api/v1/auth/protected")
		.send()
		.set('Accept', 'application/json')
		.set('Authorization', `Bearer ${TOKEN}`)
		.expect('Content-Type', /json/);
	return response;
}

export const requestRefresh = async(TOKEN) =>{
	const response = 
		await request(app)
		.get("/api/v1/auth/refresh")
		.send()
		.set('Cookie', TOKEN)
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/);
	return response;
}

export const requestRegister = async(data = null)=>{
	const user = data || dataRandomUser();
	console.log(user);
	const response = 
		await request(app)
		.post("/api/v1/auth/register")
		.send(user)
		.set('Accept', 'application/json')
		.expect('Content-Type', /json/);
	return response;
}