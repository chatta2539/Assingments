const { MongoClient } = require('mongodb');

const uri = 'mongodb+srv://raehchester:raeh123@raehchester.kgowrs0.mongodb.net/?retryWrites=true&w=majority';
const connectorDB = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export default connectorDB;


