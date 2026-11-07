const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

// GET /products - Mengembalikan seluruh produk
const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

// GET /products/:id - Mengembalikan produk berdasarkan ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await prisma.product.findUnique({
      where: { id: Number(id) },
    });

    if (!product) {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

// POST /products - Membuat produk baru
const createProduct = async (req, res) => {
  try {
    const { name, price } = req.body;
    const product = await prisma.product.create({
      data: { name, price },
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

// PUT /products/:id - Mengupdate produk berdasarkan ID
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price } = req.body;
    const product = await prisma.product.update({
      where: { id: Number(id) },
      data: { name, price },
    });
    res.status(200).json(product);
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

// DELETE /products/:id - Menghapus produk berdasarkan ID
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.product.delete({
      where: { id: Number(id) },
    });
    res.status(200).json({ message: "Produk berhasil dihapus" });
  } catch (error) {
    if (error.code === "P2025") {
      return res.status(404).json({ message: "Produk tidak ditemukan" });
    }
    res.status(500).json({ message: "Terjadi kesalahan pada server" });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
