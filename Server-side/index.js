import express from 'express'
import mongoose from 'mongoose';
import  dotenv  from 'dotenv';

import userRoutes from './Routes/user.route.js'
import authRoutes from './Routes/auth.route.js'


dotenv.config();
const app = express();

app.use(express.json())

mongoose.connect(process.env.MONGODB).then(
  ()=>{
    console.log("connected database");
  }
)
.catch(()=>{
  console.log("failed to connect");
})


app.use('/api/user' , userRoutes)
app.use('/api/auth' , authRoutes)



//error handling middleware for any req,res error 

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});


app.listen(3000,()=>{
  console.log("server is running");
})