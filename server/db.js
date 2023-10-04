const Pool = require("pg").Pool

const pool = new Pool({
    user:"postgres",
    host: "localhost",
    database: "prueba",
    password:"renato",
    port: 5432,
});

module.exports = pool;