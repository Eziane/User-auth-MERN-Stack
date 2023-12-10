const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = 3001;

app.use(express.json()); // Use built-in Express middleware for JSON parsing
app.use(cors());

// Connect to MongoDB (make sure your MongoDB server is running)
// mongoose.connect('mongodb://localhost:27017/mern-stack-app', { useNewUrlParser: true, useUnifiedTopology: true });
// Connect to MongoDB (make sure your MongoDB server is running)
mongoose.connect('mongodb://127.0.0.1:27017/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000, // Set a lower value if needed
  socketTimeoutMS: 45000, // Adjust as needed
});


// Define a simple Task model
const Task = mongoose.model('Task', {
  title: String,
  description: String
});

// API endpoints
app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/tasks', async (req, res) => {
  try {
    const newTask = new Task(req.body);
    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    console.error('Error creating task:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
