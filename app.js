const express = require('express')
const bodyParser = require('body-parser');
const cors = require('cors')
const AWS = require("aws-sdk");

const app = express()

app.use(bodyParser.json());
app.use(cors())

AWS.config.update({
    region: "ap-southeast-1",
    endpoint: "https://dynamodb.ap-southeast-1.amazonaws.com"
});
var docClient = new AWS.DynamoDB.DocumentClient();
var table = "user";

app.get('/api/user', function(req, res) {
    var params = {
        TableName: table,
        Key: {
            "id": req.query.id
        }
    };
    docClient.get(params, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send(data);
        }
    });
});
app.post('/api/user', function(req, res) {
    var params = {
        TableName: table,
        Item: req.body
    };
    docClient.put(params, function(err, data) {
        if (err) {
            res.send(err);
        } else {
            res.send("Save Complete!");
        }
    });
});
app.listen(process.env.port || 8081, () => console.log('app run!'))