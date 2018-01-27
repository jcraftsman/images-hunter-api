const request = require('supertest');
const app = require('../app');


describe('Test /images path', () => {
    test('It should respond successfully to the GET method', () => {
        return request(app).get("/images/")
            .expect(200);
    });
});

describe('Test /hunt path', () => {
    test('It should respond successfully to the GET method', () => {
        return request(app).get("/hunt/myKeyword")
            .expect(200);
    });
});