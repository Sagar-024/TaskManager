import express from 'express';
import bodyParser from 'body-parser'; // Middleware to parse the body
import dotenv from 'dotenv';

const server = express();

// Configure dotenv to load environment variables
dotenv.config();

// Middleware to parse JSON data in the body of the request
server.use(bodyParser.json());  // Use bodyParser to handle JSON requests

// Define the POST route
server.post('/tasks', (req, res) => {
  try {
    // Extract task name from the request body
    const { name } = req.body;
    console.log('Received task:', name);  // Log the received task
    res.status(200).json({ message: `Task received: ${name}` }); // Respond back with a message
  } catch (error) {
    console.error('Error receiving task:', error);
    res.status(500).send('Server Error');
  }
});

// Start the server and listen on port 1000
server.listen(1000, () => {
  console.log('Server is running on http://localhost:1000');
});
