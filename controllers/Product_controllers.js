const { pool } = require("../config/db"); // Import the database pool
const { v4: uuidv4 } = require('uuid'); // Import the uuid package

// Controller to fetch all products
const getAllProducts = async (req, res) => {
  try {
    const InsertQuery = "SELECT * FROM apicompany.api_sales";
    const [results] = await pool.query(InsertQuery);

    if (results.length === 0) {
      return res.status(201).json({
        status: "success",
        message: "No products found in the database",
      });
    }

    res.status(200).json({
      status: "success",
      message: "Data fetched successfully",
      data: results,
    });
  } catch (err) {
    console.error("Error:", err);
    res.status(500).json({
      status: "error",
      message: "An error occurred while fetching data",
    });
  }
};

const addNewProduct = async (req, res) => {
  try {
    const {
      api_name,
      buyer_name,
      buyer_email,
      sale_date,
      price,
      api_version = '1.0',
      license_key,
    } = req.body;
    
    // Validate request data
    if(!api_name || !buyer_name || !buyer_email || !price || !license_key)
    {
      return res.status(400).json({ error: 'Missing required fields, please checkdata from req.body' });
    }
    const id = uuidv4(); // Generate unique ID
    const created_at = new Date();
    const updated_at = created_at;

    const insertQuery = `INSERT INTO apicompany.api_sales (id, api_name, buyer_name, buyer_email, sale_date, price, api_version, license_key, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
    const values = [
    id,
    api_name,
    buyer_name,
    buyer_email,
    sale_date || created_at.toISOString().split('T')[0], // Use current date if not provided
    price,
    api_version,
    license_key,
    created_at,
    updated_at,
    ];

    const [results] = await pool.query(insertQuery, values);
    console.log(results, "results")

    if(results)
    {
      return res.status(200).json({
        status: 'success',  
        message: 'Product added successfully',
        data: results,
      });
    }

  } catch (err) {
    console.error('Error:', err);
    res.status(500).json({
      status: 'error',
      message: 'An error occurred while fetching data',
    });
  }
}

const editProduct = async (req, res) => {
  const { license_key, api_name, buyer_name, buyer_email, sale_date, price, api_version } = req.body;

  if (!license_key) {
    return res.status(400).json({ error: "License key is required" });
  }

  console.log(license_key, buyer_email, "license_key");

  const updateQuery = `
    UPDATE apicompany.api_sales 
    SET api_name = ?, buyer_name = ?, buyer_email = ?, sale_date = ?, price = ?, api_version = ?
    WHERE license_key = ?
  `;
  const values = [api_name, buyer_name, buyer_email, sale_date, price, api_version, license_key];

  try {
    const [result] = await pool.query(updateQuery, values);
    console.log(result)

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.json({ message: "Product updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update product" });
  }
}

const deleteProduct =  async (req, res) => {
  const { license_key } = req.body;

  if (!license_key) {
    return res.status(400).json({ error: "License key is required" });
  }

  console.log(license_key)

  const deleteQuery = `
    DELETE FROM apicompany.api_sales
    WHERE license_key = ?
  `;

  try {
    const [result] = await pool.query(deleteQuery, [license_key]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    console.log(result, "result")
    res.json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to delete product" });
  }
}

module.exports = { getAllProducts, addNewProduct, editProduct, deleteProduct };