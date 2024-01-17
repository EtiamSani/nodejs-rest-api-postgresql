const CoreDatamapper = require("./coreDatamapper");
const client = require("../db/pg");

class User extends CoreDatamapper {
  tableName = "users";

  async findByEmail(email) {
    const preparedQuery = {
      text: `SELECT * FROM users u WHERE u.email = $1`,
      values: [email],
    };
    try {
      const result = await this.client.query(preparedQuery);
      return result.rows[0];
    } catch (err) {
      console.error(err, "Base de données");
    }
  }
}

module.exports = new User(client);
