const express = require('express');
const { getAllProducts, addNewProduct, editProduct, deleteProduct } = require('../controllers/Product_controllers');
const router = express.Router();


router.get('/', (req, res) => { 
  res.json("Hello! This is the backend of the company project");
})

router.get('/get_all_products', getAllProducts)

router.post('/add_new_product', addNewProduct)

router.put("/edit_product", editProduct);

router.delete("/delete_product", deleteProduct);

module.exports = router 