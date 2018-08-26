const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const MongoClient = require('mongodb').MongoClient;
// const url = 'mongodb://heroku_t6bp9lvd:rdoamshc7bbqqhq0kc0mjhdm40@ds133622.mlab.com:33622/heroku_t6bp9lvd';
const url = process.env.MONGODB_URI
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
    // fs.writeFile('UID-' + req.body.id + '.json', JSON.stringify(req.body), function(err) {
    //     if (err) {
    //         res.send(err)
    //     } else {
    //         res.send('save complete!');
    //     }
    // });
    MongoClient.connect(url, { useNewUrlParser: true }, function(err, client) {
        const db = client.db(dbName);
        db.collection(collection).save(req.body, function(err, r) {
            client.close();
            res.send('save complete!');
        });
    });
});
app.listen(process.env.port || 8081, () => console.log('app run!'));