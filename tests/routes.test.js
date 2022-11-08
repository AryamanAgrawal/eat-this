const { ObjectId } = require('bson');
const request = require('supertest')
url = "https://umasseatthis.herokuapp.com";

describe('test /resgister endpoint', () => {
    it('should create a new post', async () => {
        const response = await request(url)
            .post('/register')
            .send({
                firstName: 'Alex',
                lastName: 'Dhima',
                email: 'adhima@mail.com',
                password: '1234'
            })
        expect(response.statusCode).toEqual(200);
    })
})

describe('test /resgister endpoint with duplicate user', () => {
    it('should create a new post', async () => {
        const response = await request(url)
            .post('/register')
            .send({
                firstName: 'Alex',
                lastName: 'Dhima',
                email: 'adhima@mail.com',
                password: '1234'
            })
        expect(response.statusCode).toEqual(404);
    })
})


describe('test /login endpoint with correct login', () => {
    it('should create a new post', async () => {
        const response = await request(url)
            .post('/login')
            .send({
                email: 'adhima@mail.com',
                password: '1234'
            })
        expect(response.statusCode).toEqual(200);
    })
})

describe('test /login endpoint with incorrect login', () => {
    it('should create a new post', async () => {
        const response = await request(url)
            .post('/login')
            .send({
                email: 'adhima@mail.com',
                password: 'wrongpassword'
            })
        expect(response.statusCode).toEqual(401);
    })
})


