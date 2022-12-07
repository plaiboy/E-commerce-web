 const express = require('express');
 const app = express();
 const PORT = 5100;
 const mongose = require('mongoose');
 const userRoute = require('./routes/user');
 const authRoute = require('./routes/auth');
 const orderRoute = require('./routes/order');
 const cartRoute = require('./routes/cart');
 const productRoute = require('./routes/product');
 const stripeRoute = require('./routes/stripe')
 const cors = require('cors');

 const dotenv = require('dotenv');
const { application } = require('express');

 dotenv.config();

mongoose
.connect(process.env.MONGO_URL)
.then(() => console.log("DB connection is successful"))
.catch((err) => {
    console.log(err);
});

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);
app.use('/api/products', productRoute);
app.use('/api/carts', cartRoute);
app.use('/api/orders', orderRoute)
app.use('/api/checkout', stripeRoute)

 app.listen(process.env.PORT, () => {
    console.log(`server is listening at ${PORT}`)
 });