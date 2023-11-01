const Pool = require("pg").Pool

const pool = new Pool({
    user:"postgres",
    host: "localhost",
    database: "prueba",
    password:"renato", // mi contraseña es renato y la mia postgres
    port: 5432,
});

module.exports = pool;
