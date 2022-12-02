import app from '../../app.js';
import request from 'supertest';
import { closeDB, connectDB } from '../helpers.js';

// * Open connect MongoDB Atlas
beforeAll(async() => {await connectDB();});

//* Close Connect MonoDB Atlas
afterAll(async() => {await closeDB();})

//* Response from request
let response;

//* Do request
beforeEach(async() => {
	response = await request(app)
		.get("/api/v1/auth/logout")
		.send();
});

describe('Get / logout',()=>{

	test('Should respond with a 200 status code', async ()=>{
		expect(response.statusCode).toBe(200);
	})

	test('Should respond with a json', async()=>{
		expect(response.body).toBeInstanceOf(Object);
	})
});