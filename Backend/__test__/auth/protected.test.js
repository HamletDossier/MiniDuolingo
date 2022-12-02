import app from '../../app.js';
import request from 'supertest';
import { closeDB, connectDB, requestLogin, requestProtected } from '../helpers.js';

// * Open connect MongoDB Atlas
beforeAll(async() => {await connectDB();});

//* Close Connect MonoDB Atlas
afterAll(async() => {await closeDB();})

//* Responses from request
let response, responseWithoutToken, responseInvalidToken;

//* Do request
beforeEach(async() => {
	//* Get response login
	const admin = await requestLogin(); 
	//* Get Token
	const TOKEN = admin.body.token;
	//* Response successful 
	response = await requestProtected(TOKEN);
	//* Response without token
	responseWithoutToken = await requestProtected('');
	//* Response with invalid token
	responseInvalidToken = await requestProtected('Something');
});


describe('Get / protected / with successful token  ',() =>{

	test('Should respond with a 200 status code',async () =>{
		expect(response.statusCode).toBe(200);
	})

	test('Should respond with a Object',async () =>{
		expect(response.body).toBeInstanceOf(Object);
	})
})
describe('Get / protected / without token', ()=>{

	test('Should respond with a 401 status code',async () =>{
		expect(responseWithoutToken.statusCode).toBe(401);
	})

	test('Should respond with a error',async () =>{
		expect(responseWithoutToken.body.error).not.toBeNull();
	})

})
describe('Get / protected / Invalid token', ()=>{

	test('Should respond with a 401 status code',async () =>{
		expect(responseInvalidToken.statusCode).toBe(401);
	})

	test('Should respond with a jwt malformed',async () =>{
		expect(responseInvalidToken.body.error).toEqual('jwt malformed');
	})

})