const { Pool } = require('pg');

const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'hotel_management',
    password: 'linux',
    port: 5432,
});

module.exports = pool;