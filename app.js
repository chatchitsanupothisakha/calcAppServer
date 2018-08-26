const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI
const dbName = 'heroku_t6bp9lvd';
const collection = 'UserData';

const app = express()
app.use(bodyParser.json());
app.use(cors())

app.get('/api/user', function(req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        const db = client.db(dbName);
        db.collection(collection).findOne({ _id: req.query._id }, function(err, data) {
            client.close();
            if (err !== null || data === null) {
                res.send({ err: true });
            } else {
                res.send(data);
            }
        });
    });
});
app.post('/api/user', function(req, res) {
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        const db = client.db(dbName);
        db.collection(collection).save(req.body, function(err, r) {
            client.close();
            res.send('save complete!');
        });
    });
});
app.listen(process.env.port || 8081, () => console.log('app run!'));