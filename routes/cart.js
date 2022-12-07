const Cart = require("../models/Cart");
const { verifyToken, 
    verifyTokenAuthorization ,
    verifyTokenAndAdmin } = require('./verifyToken');

const router =require('express').Router();

// CREATE
router.post("/", verifyToken, async(req, res) => {
const newCart = new Cart(req.body)

  try{
    const savedCart = await newCart.save(); 
    res.status(200).json(savedCart);
  } catch (err) {
    res.status(500).json(err)
  }
})
// UPDATE

router.put('/:id', verifyTokenAuthorization, async(req, res)=>{
   
    try{
        const updatedCart  = await Cart.findByIdAndUpdate(
            req.body.params.id,
             {
          $set: req.body,  
        },{ new: true  });
        res.status(200).json(updatedCart)
    } catch (err) {
        res.status(500).json(err);
    }
});

// DELETE
router.delete('/:id', verifyTokenAuthorization, async(req, res)=>{
    try{
       await Cart.findByIdAndDelete(req.params.id)
       res.status(200).json('cart has been deleted')
    }catch(err){
        res.status(500).json(err)
    }
});

// get user cart
router.get('/find/:userId', verifyTokenAuthorization, async (req, res)=>{
   
    try{
       const Cart = await Cart.findOne({userId: req.params.userIid});
       res.status(200).json(cart);
    }catch(err){
        res.status(500).json(err)
    }
});

// get all 
router.get("/", verifyTokenAndAdmin, async (req, res) =>{
    try {
        let carts = await Cart.find();


        res.status(200).json(carts);; 
    } catch (err) {
        res.status(500).json(err);
    }
});


       

module.exports = router;