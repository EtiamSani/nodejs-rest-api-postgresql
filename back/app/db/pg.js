const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

let queryCount = 0;


module.exports = {
  originalClient: pool,
  async query(...params) {
    queryCount += 1;
    return this.originalClient.query(...params);
  },
};
