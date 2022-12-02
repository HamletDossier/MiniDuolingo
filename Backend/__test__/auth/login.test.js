import { closeDB, connectDB, requestLogin } from '../helpers.js';

// * Open connect MongoDB Atlas
beforeAll(async() => {await connectDB();});

//* Close Connect MonoDB Atlas
afterAll(async() => {await closeDB();})

//* Responses from request
let response, responseInvalidUser;

//* Do request
beforeEach(async() => {
	//* Response successful 
	response = await requestLogin();
	//* Response with invalid User
	responseInvalidUser = await requestLogin({
		email:'NotEmail',
		password: ''
	});
});


describe('Post / Login / with successful User',() =>{

	test('Should respond with a 200 status code',async () =>{
		expect(response.statusCode).toBe(200);
	})

	test('Should respond with a Object',async () =>{
		expect(response.body).toBeInstanceOf(Object);
	})

	test('Should respond with a Token',async () =>{
		expect(response.body.token).not.toBeNull();
	})

	test('should respond with a cookie token', async()=>{
		expect(response.headers['set-cookie']).not.toBeNull();
	})

})
describe('Post / Login / with invalid User',() =>{

	test('Should respond with a 400 status code',async () =>{
		expect(responseInvalidUser.statusCode).toBe(400);
	})

	test('Should respond with the errors',async () =>{
		expect(responseInvalidUser.body.errors).not.toBeNull();
	})
	

	test('Should respond with Wrong Email Format',async () =>{
		expect(responseInvalidUser.body.errors[0].msg).toEqual("Wrong Email Format");
	})

	
	test('Should respond with Wrong Password Format',async () =>{
		expect(responseInvalidUser.body.errors[1].msg).toEqual("Wrong Password Format");
	})

})