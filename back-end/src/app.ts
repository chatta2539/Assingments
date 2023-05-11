import express from "express";
import jwt from 'jsonwebtoken';

const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const secretKey = 'raehchester';

const app = express();
app.use(express.json());

const uri = 'mongodb+srv://raehchester:raeh123@raehchester.kgowrs0.mongodb.net/?retryWrites=true&w=majority';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.post('/users', async (req, res) => {
  try {
    await client.connect();
    const database = client.db('mydatabase');
    const collection = database.collection('users');
    const result = await collection.insertOne(req.body);

    res.status(201).send({ insertedId: result.insertedId });
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  } finally {
    await client.close();
  }
});

app.get('/user/:username', async (req, res) => {
  try {
    await client.connect();
    const { username } = req.params;

    const database = client.db('mydatabase');
    const collection = database.collection('users');
    const user = await collection.findOne({ username });
    const userall = await collection.findOne({  });

    console.log(userall)

    // if( username == "all"){
    //   res.send({ username: user });
    //   await client.close();
    // }

    res.send({ userall });

  } catch (err) {
    console.error(err);
    res.status(500).send('Internal server error');
  } finally {
    await client.close();
  }
});


app.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Hash the user's password using bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // Connect to the MongoDB database
    const client = new MongoClient(uri);
    await client.connect();

    // Check if the username already exists in the database
    const db = client.db('mydatabase');
    const users = db.collection('users');
    const existingUser = await users.findOne({ username });
    if (existingUser) {
      await client.close();
      return res.status(400).send('Username already exists');
    }

    // Insert the new user into the database
    const result = await users.insertOne({ username, password: hashedPassword });

    // Close the MongoDB connection
    await client.close();

    // Return a success message
    res.send('User created successfully');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error creating user');
  }
});

app.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Connect to the MongoDB database
    const client = new MongoClient(uri);
    await client.connect();

    // Find the user in the database by their username
    const db = client.db('mydatabase');
    const users = db.collection('users');
    const user = await users.findOne({ username });
    if (!user) {
      await client.close();
      return res.status(401).send('Invalid username or password');
    }

    // Compare the hashed password with the user's input using bcrypt
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      await client.close();
      return res.status(401).send('Invalid username or password');
    }

    // Generate a JWT token with the user's ID and a 60-minute TTL
    const token = jwt.sign({ userId: user._id }, secretKey, { expiresIn: '60m' });

    // Close the MongoDB connection
    await client.close();

    // Return the JWT token to the client
    res.send({ token, username: user });
  } catch (error) {
    console.error(error);
    res.status(500).send('Error logging in');
  }
});


app.get("/api/hello", (req, res) => {
  res.send("Hello, world!");
});

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
