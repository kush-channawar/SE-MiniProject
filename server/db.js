const Pool = require("pg").Pool;

const pool = new Pool({
  host: "localhost",
  user: "postgres",
  password: "Kvc17*WAR",
  port: 5432,
  database: "attendance"
});

module.exports = pool;