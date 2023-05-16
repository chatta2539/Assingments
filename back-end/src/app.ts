import express from "express";
import jwt from 'jsonwebtoken';
import DeviceRoute from "./routes/device.route"
import LoginRoute from "./routes/login.route"
import UserRoute from "./routes/user.route"


const cors = require('cors');
const bcrypt = require('bcrypt');
const secretKey = 'raehchester';
const app = express();
const device = new DeviceRoute()
const login = new LoginRoute()
const user = new UserRoute()


const routers = [
  new UserRoute(),
  new LoginRoute(),
  new DeviceRoute(),
]

app.use(cors());
app.use(express.json());

routers.forEach(route =>{
  app.use('/api', route.router);
})

app.listen(3000, () => {
  console.log("Server listening on port 3000");
});
