const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');

const app = express()

app.use(bodyParser.json());
app.use(cors())

app.get('/api/user', function(req, res) {
    fs.readFile('UID-' + req.query.id + '.json', function(err, file) {

        if (err) {
            console.log('err: ', err);
            res.send({ err: true });
        } else {
            console.log('file: ', file);

            res.send(JSON.parse(file))
        }
    });
});
app.post('/api/user', function(req, res) {
    fs.writeFile('UID-' + req.body.id + '.json', JSON.stringify(req.body), function(err) {
        if (err) {
            res.send(err)
        } else {
            res.send('save complete!');
        }
    });
});
app.listen(process.env.port || 8081, () => console.log('app run!'));