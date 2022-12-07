const router =require('express').Router();
const CryptoJs = require('crypto-js');
const jwt =require('jsonwebtoken');

router.post("/register", async (req, res) =>{

    const newUser = new user({
        username: req.body.username,
        email: req.body.email,
        password:  CryptoJS.AES.encrypt(req.body.password, process.env.PASS_SEC).toString()
    })


try {
  const savedUser = await newUser.save();
res.status(201).json(savedUser);
} catch (err) {
 res.status(500).json(err);
};
});

// login
router.post('/login', async(req, res) =>{
   try{ 
    const user = await user.findOne({username: req.body.username})
    !user && res.status(401).json('wrong credentials');

    

    const { originalPassword, ...others } = user._doc;

    const hashedPassword = Crypto.AES.decrypt(
      user.password, 
      process.env.PASS_SEC);
     
      originalPassword !== req.body.password && res.status(401).json('wrong credentials');
      
      const accessToken = jwt.sign({
        id:user._id,
        isAdmin: user.isAdmin,
      }, process.env.JWT_SEC,
      {expiresIn:'3d'} 
      );

      const password = hashedPassword.toString()


      res.status(200).json({...others, accessToken});

   } catch(err) {
    res.status(500).json(err);
   }
})


module.exports = router;
