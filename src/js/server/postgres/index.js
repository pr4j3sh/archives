const { Pool } = require("pg");
const { readFileSync } = require("fs");

async function initPostgres(uri) {
  const config = {
    connectionString: uri,
    ssl: {
      rejectUnauthorized: false,
      ca: readFileSync("./ca.pem").toString(),
    },
  };
  console.log(config);
  const pool = new Pool(config);

  try {
    await pool.connect();
    console.log("connected to postgres");
  } catch (error) {
    console.error(error);
  }
}

initPostgres(process.env.POSTGRES_URI);
