const Pool = require("pg").Pool;
const pool = new Pool({
    user: "postgres",
    password: "adnan123",
    host: "localhost",
    port: 5432,
    database: "peantodo"
});

module.exports = pool;