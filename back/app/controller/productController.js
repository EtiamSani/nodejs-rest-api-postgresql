const productDatamapper = require("../model/productsModel");

const productController = {
  async getAllProducts(_, res) {
    try {
      const allProducts = await productDatamapper.findAll();
      res.json(allProducts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async createProduct(req, res) {
    try {
      const {
        code,
        name,
        description,
        price,
        quantity,
        inventory_status,
        category,
        image,
        rating,
      } = req.body;

      const createdProduct = await productDatamapper.create({
        code,
        name,
        description,
        price,
        quantity,
        inventory_status,
        category,
        image,
        rating,
      });

      res.status(201).json(createdProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async getProductById(req, res) {
    const productId = req.params.id;
    try {
      const getOneProduct = await productDatamapper.findByPk(productId);
      res.json(getOneProduct);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async deleteProduct(req, res) {
    const productId = req.params.id;
    try {
      const productToDelete = await productDatamapper.delete(productId);
      res.json(productToDelete);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  async updateProduct(req, res) {
    const productId = req.params.id;
    const { updatedProperty, updatedValue } = req.body;

    const allowedProperties = [
      "code",
      "name",
      "description",
      "price",
      "quantity",
      "inventory_status",
      "category",
      "image",
      "rating",
    ];

    if (!allowedProperties.includes(updatedProperty)) {
      return res.status(400).json({ error: "Invalid property to update" });
    }
    const productInfo = { [updatedProperty]: updatedValue };
    try {
      const existingProduct = await productDatamapper.findByPk(productId);

      if (!existingProduct) {
        return res.status(404).json({ error: "Product not found" });
      }

      const productToUpdate = await productDatamapper.update(
        { id: productId },
        productInfo
      );
      res.json(productToUpdate);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
};

module.exports = productController;
