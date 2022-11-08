const { ObjectId } = require('bson');
const request = require('supertest')
url = "https://umasseatthis.herokuapp.com";

describe('test /register endpoint with duplicate user', () => {
    it('should not create a new post', async () => {
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

describe('test /user/preferences endpoint by adding preferences', () => {
    it('should add new preferences', async () => {
        const response = await request(url)
            .post('/user/preferences')
            .send({
                userId: ObjectId('63629d6ad8308303c3383d37'),
                preferredLocation: ["Franklin", "Worcester"],
                allergens: ["Milk", "Corn", "Eggs"],
                ingredients: ["Chicken"]
            })
        expect(response.statusCode).toEqual(200);
    })
})

describe('test /user/preferences endpoint by updating preferences', () => {
    it('should add new preferences', async () => {
        const response = await request(url)
            .post('/user/preferences/:id/edit')
            .send({
                userId: ObjectId('63629d6ad8308303c3383d37'),
                preferredLocation: ["Berkshire"],
                allergens: ["Milk", "Corn", "Eggs"],
                ingredients: ["Chicken"]
            })
        expect(response.statusCode).toEqual(200);
    })
})


