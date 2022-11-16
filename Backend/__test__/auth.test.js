import app from '../app.js';
import request from 'supertest';

describe('get /logout',()=>{

	test('Should respond with a 200 status code', async ()=>{
		const response = await request(app).get("/api/v1/auth/logout").send();
		expect(response.statusCode).toBe(200);
	})

	test('Shoul respond with a json', async()=>{
		const response = await request(app).get("/api/v1/auth/logout").send();
		expect(response.body).toBeInstanceOf(Object);
	})
});