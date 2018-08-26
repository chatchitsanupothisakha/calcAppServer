const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
const url = process.env.MONGODB_URI;
const dbName = 'heroku_t6bp9lvd';
const collection = 'UserData';

const app = express()
app.use(bodyParser.json());
app.use(cors())

app.get('/api/user', function(req, res) {
    // fs.readFile('UID-' + req.query.id + '.json', function(err, file) {
    //     if (err) {
    //         res.send({ err: true });
    //     } else {
    //         res.send(JSON.parse(file))
    //     }
    // });
    MongoClient.connect(url, function(err, client) {
        const db = client.db(dbName);
        db.collection(collection).find({ id: req.query.id }, function(err, r) {
            client.close();
            res.send(r);
        });
    });
});
app.post('/api/user', function(req, res) {
    // fs.writeFile('UID-' + req.body.id + '.json', JSON.stringify(req.body), function(err) {
    //     if (err) {
    //         res.send(err)
    //     } else {
    //         res.send('save complete!');
    //     }
    // });
    MongoClient.connect(url, function(err, client) {
        const db = client.db(dbName);
        db.collection(collection).insertOne(req.body, function(err, r) {
            client.close();
            res.send('save complete!');
        });
    });
});
app.listen(process.env.port || 8081, () => console.log('app run!'));