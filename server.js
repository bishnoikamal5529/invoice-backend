const express = require('express');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const rateLimiter = require('express-rate-limit');
const mongoSanitize = require('express-mongo-sanitize');
require('dotenv').config();


const errorHandlerMiddleware = require('./middleware/errorHandlerMiddleware');
const notFound = require('./middleware/not-found');
const authorizationMiddleware = require('./middleware/authorizationMiddleware');
const roleLevelAccessMiddleware = require('./middleware/roleLevelAccessMiddleware');

// Database connection
const connectDB = require('./config/db');

// Middleware to parse JSON
app.use(express.urlencoded({extended:true}));
app.use(express.json());

// security packages
app.use(cors());
app.use(helmet());

app.use((req,res,next) => {
    if(req.method === 'GET'){
        next()
    }else{
        app.use(
            mongoSanitize({
              allowDots: true,
              replaceWith: '_',
            }),
          );
        next();
    }
})




const limiter = rateLimiter({
	windowMs: 15 * 60 * 1000, // 15 minutes
	limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
	standardHeaders: 'draft-8', // draft-6: `RateLimit-*` headers; draft-7 & draft-8: combined `RateLimit` header
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
	// store: ... , // Redis, Memcached, etc. See below.
})

// Apply the rate limiting middleware to all requests.
app.use(limiter);

// Basic route
app.get('/api/v1/', (req, res) => {
    res.send({name:"api is running"});
});


// Auth Routes for login and register
const authRoutes = require('./Routes/authRoutes');
app.use('/api/v1/auth', authRoutes);

// Authorizing to access protected Routes.
app.use(authorizationMiddleware);


//Invoice Routes
const invoiceRoutes = require('./Routes/invoiceRoutes');
app.use('/api/v1/invoice', invoiceRoutes);

// Customer Routes
const customerRoutes = require('./Routes/customerRoutes');
app.use('/api/v1/customer', customerRoutes);

// Product Routes
const productRoutes = require('./Routes/productRoutes');
app.use('/api/v1/product', productRoutes);

// Supplier Routes
const supplierRoutes = require('./Routes/supplierRoutes');
app.use('/api/v1/supplier', supplierRoutes);

app.use(roleLevelAccessMiddleware);

// User Routes
const userRoutes = require('./Routes/userRoutes');
app.use('/api/v1/user', userRoutes);


// using error hanlder middleware to handle all the errors
app.use(errorHandlerMiddleware);
app.use(notFound);

connectDB()
    .then(() => {
        // Start the server
        const PORT = process.env.PORT || 3000;
        app.listen(PORT, () => {
            console.log(`Server is running with database on http://localhost:${PORT}`);
        });  
  });