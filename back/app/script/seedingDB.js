const dotenv = require("dotenv");
dotenv.config();
const { Pool } = require("pg");
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function resetDB() {
  console.log("Reseting the database");

  const sqlQuery = `TRUNCATE TABLE "products", "users" RESTART IDENTITY CASCADE;`;

  await pool.query(sqlQuery);

  console.log("database have succesfully been reseted !");
}

const productsFile = require("./products.json");
async function importProductsFromFile() {
  const products = [];

  for (let counter = 0; counter < productsFile.data.length; counter++) {
    const product = {
      code: productsFile.data[counter].code,
      name: productsFile.data[counter].name,
      description: productsFile.data[counter].description,
      price: productsFile.data[counter].price,
      quantity: productsFile.data[counter].quantity,
      inventory_status: productsFile.data[counter].inventoryStatus,
      category: productsFile.data[counter].category,
      image: productsFile.data[counter].image,
      rating: productsFile.data[counter].rating,
    };

    products.push(product);
  }

  return products;
}

async function insertProductsInDataBase(products) {
  console.time("Adding products");

  let values = [];
  let parameters = [];
  let parameterCounter = 1;
  let requestCount = 0;

  for (const product of products) {
    // Ajouter l'utilisateur
    values.push(product.code);
    values.push(product.name);
    values.push(product.description);
    values.push(product.price);
    values.push(product.quantity);
    values.push(product.inventory_status);
    values.push(product.category);
    values.push(product.image);
    values.push(product.rating);

    parameters.push(
      `($${parameterCounter},$${parameterCounter + 1},$${
        parameterCounter + 2
      },$${parameterCounter + 3},$${parameterCounter + 4},$${
        parameterCounter + 5
      },$${parameterCounter + 6},$${parameterCounter + 7},$${
        parameterCounter + 8
      })`
    );
    parameterCounter += 9;
  }

  if (values.length > 0) {
    const sqlQuery = `INSERT INTO "products" (code, name, description, price, quantity, inventory_status, category, image, rating) VALUES ${parameters.join()}`;
    await pool.query(sqlQuery, values);
    requestCount++;
  }

  console.log("Number of products : ", products.length);
  console.log("Nombre of request : ", requestCount);
  console.timeEnd("Adding products");
}

(async () => {
  await resetDB();
  const products = await importProductsFromFile();
  await insertProductsInDataBase(products);
  await pool.end();
  console.log("Script over");
})();
