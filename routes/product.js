const { Router } = require("express");
const Product = require("../models/Product");
const { verifyToken, 
    verifyTokenAuthorization ,
    verifyTokenAndAdmin } = require('./verifyToken');

const router =require('express').Router();

// CREATE
router.post("/", async(req, res) => {
const newProduct = new Product(req.body)

  try{
    const savedProduct = await newProduct.save(); 
    res.status(200).json(savedProduct);
  } catch (err) {
    res.status(500).json(err)
  }
})
// UPDATE

router.put('/:id', verifyTokenAndAdmin, async(req, res)=>{
   
    try{
        const updatedProduct  = await Product.findByIdAndUpdate(
            req.body.params.id,
             {
          $set: req.body,  
        },{ new: true  });
        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE
router.delete('/:id', verifyTokenAndAdmin , async(req, res)=>{
    try{
       await Product.findByIdAndDelete(req.params.id)
       res.status(200).json('product has been deleted')
    }catch(err){
        res.status(500).json(err)
    }
});

// get product
router.get('/find/:id', async (req, res)=>{
   
    try{
       const product = await Product.findById(req.params.id);
       res.status(200).json(product);
    }catch(err){
        res.status(500).json(err)
    }
});

// get all products
router.get("/",  async (req, res) =>{
    const qNew = req.query.new;
    const qCategory  = req.query.category;
    try {
        let product; 

      if(qNew) {
        products = await Product.find().sort({ createdAt: -1 }).limit(5);
      } else if (qCategory) {
        products = await Product.find({
            categories: {
                $in: [qCategory],
            },
        });
    } else{
        product = await Product.find();

    }


        res.status(200).json(products);; 
    } catch (err) {
        res.status(500).json(err);
    }
});


       

module.exports = router;