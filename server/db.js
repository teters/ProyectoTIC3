const Pool = require("pg").Pool

const pool = new Pool({
    user:"postgres",
    host: "localhost",
    database: "prueba",
    password:"Igna.soler10",
    port: 5432,
});

module.exports = pool;