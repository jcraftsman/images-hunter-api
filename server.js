const config = require('dotenv').config();

const app = require('./infra/AppAssembly');

const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
    console.log('Express server listening on port ' + port);
});