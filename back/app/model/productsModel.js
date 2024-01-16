const CoreDatamapper = require("./coreDatamapper");
const client = require("../db/pg");

class Products extends CoreDatamapper {
  tableName = "products";
}

module.exports = new Products(client);
