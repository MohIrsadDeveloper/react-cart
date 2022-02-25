const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const cors = require('cors')
const mongo = require('mongodb')
const MongoClient = mongo.MongoClient;
let db;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(cors())

const mongouri = 'mongodb://localhost:27017'

app.get('/', (req, res) => {
    res.json('Welcome')
})

app.get('/all', (req, res) => {
    db.collection("first").find().toArray((err, result) => {
        if (err) throw err;
        res.json(result)
    })
})

app.post('/post', (req,res) => {
    let data = req.body;
    db.collection('first').insertOne(req.body, (err, result) => {
        if(err) throw err;
        res.json({
            msg : "OK",
            data : req.body
        });
    })
})

app.post('/find', (req, res) => {
    let data = req.body;
    db.collection("first").find({ name: { $in: req.body } }).toArray((err, result) => {
        if (err) throw err;
        res.json(result)
    })
})



MongoClient.connect(mongouri, (err, client) => {
    if (err) {
        console.log(`Error while connecting` + err);
    }
    else {
        db = client.db('Practice')
        console.log(`Database Connected...`);
    }
})


const PORT = 5000;
app.listen(PORT, () => {
    console.log('Application is running on http://localhost' + PORT);
})