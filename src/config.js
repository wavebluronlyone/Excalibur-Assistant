const port = process.env.PORT || 3004;

// -- Api Dev -- //

// const apiUrl = 'http://localhost:3003/api';

// -- Api Production -- //
const apiUrl = 'https://excaliburbot-api.herokuapp.com/api';

export default {
    port,
    apiUrl,
}