const { Client, Pool } = require('pg');

const pool = new Pool({
    host: '127.0.0.1',
    port: 5432,
    user: 'testing',
    password: '',
    database: 'sanbercode1',
});



module.exports = pool