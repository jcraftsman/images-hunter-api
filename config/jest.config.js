const dotenv = require('dotenv');

const config = dotenv
    .config({
        testEnvironment: 'node',
        path: 'config/.test.env',
    });