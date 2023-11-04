const Pool = require("pg").Pool

const pool = new Pool({
    user:"postgres",
    host: "localhost",
    database: "prueba2",
    password:"postgres", // mi contraseña es renato y la mia postgres
    port: 5432,
});

module.exports = pool;
