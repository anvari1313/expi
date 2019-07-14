const express = require('express');
const router = express.Router();
const mongo = require('mongodb').MongoClient;

const url = process.env.MONGO_URL || 'mongodb://localhost:27017';

let db = null;

mongo.connect(url, (err, client) => {
  if (err) {
    console.error(err);
  }
  db = client.db('expi');
});

/* GET home page. */
router.get('/', (req, res, next) => {

  db.collection('users').find().toArray((err, items) => {
    if (err != null) {
      res.json({err: err});
    } else {
      res.json(items)
    }
  })
});

/* GET home page. */
router.get('/add', (req, res, next) => {
  db.collection('users').insertOne({name: "User1"}, (err, result) => {
    if (err != null) {
      res.json({err: err});
    } else {
      res.json(result)
    }
  });
});

module.exports = router;
