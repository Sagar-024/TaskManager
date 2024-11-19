import express from 'express';
import connection from './Db/connect.js';
import dotenv from 'dotenv';
import router from './route/taskroute.js';
import cors from 'cors'

dotenv.config(); 

const port = 1000;
const app = express();
app.use(express.json());
app.use(cors())
app.use('/tasks' , router);






const startServer = async () => {
  try {
     await connection(process.env.CONNECT_STRING);
    console.log('Database connected successfully');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  } catch (e) {
    console.error('Error during app startup:', e);
  }
};

startServer();
