import app from '../../app.js';
import request from 'supertest';
import { closeDB, connectDB, requestLogin, requestRefresh} from '../helpers.js';

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
	const TOKEN = admin.headers['set-cookie'];
	//* Response successful 
	response = await requestRefresh(TOKEN);
	//* Response without token
	responseWithoutToken = await requestRefresh('');
	//* Response with invalid token
	responseInvalidToken = await requestRefresh('Something');
});

describe('Get / Refresh / with successful token  ',() =>{

	test('Should respond with a 200 status code',async () =>{
		expect(response.statusCode).toBe(200);
	})

	test('Should respond with a token',async () =>{
		expect(response.body.token).not.toBeNull();
	})

	test('Should respond with a expiresIn',async () =>{
		expect(response.body.expiresIn).not.toBeNull();
	})

})

describe('Get / Refresh / without token  ',() =>{

	test('Should respond with a 401 status code',async () =>{
		expect(responseWithoutToken.statusCode).toBe(401);
	})

	test('Should respond with a error',async () =>{
		expect(responseWithoutToken.body.error).not.toBeNull();
	})

	test('Should respond with a Require Token',async () =>{
		expect(responseWithoutToken.body.error).toEqual('Require Token');
	})

})

describe('Get / Refresh / Invalid token  ',() =>{

	test('Should respond with a 401 status code',async () =>{
		expect(responseInvalidToken.statusCode).toBe(401);
	})

	test('Should respond with a error',async () =>{
		expect(responseInvalidToken.body.error).not.toBeNull();
	})

	test('Should respond with a Require Token',async () =>{
		expect(responseInvalidToken.body.error).toEqual('Require Token');
	})

})