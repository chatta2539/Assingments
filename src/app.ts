import express from "express";
import jwt from 'jsonwebtoken';
import ApiRoute from "./routes/api.route";

const cors = require('cors');
const bcrypt = require('bcrypt');
const secretKey = 'raehchester';
const app = express();
const api = new ApiRoute()

app.use(cors());
app.use(express.json());
app.use('/', api.router);

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
