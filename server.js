const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
let MongoClient = require('mongodb').MongoClient;
const DATABASE_NAME = "fb-links-db";
const CONNECTION_URL = 'mongodb+srv://dbUser:lejaRCdLopW8gyUF@cluster0.kekkf.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

const app = express();

const  corsOptions = {
    origin: "http://localhost:8081"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./app/models");
const Links = db.links

// db.mongoose
//     .connect(CONNECTION_URL, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     })
//     .then(() => {
//         console.log("Successfully connect to MongoDB.");
//         // initial();
//     })
//     .catch(err => {
//         console.error("Connection error", err);
//         process.exit();
//     });

// set port, listen for requests
const PORT = process.env.PORT || 8080;
let database, collection;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
    MongoClient.connect(CONNECTION_URL, { useNewUrlParser: true }, (error, client) => {
        if(error) {
            throw error;
        }
        database = client.db(DATABASE_NAME);
        collection = database.collection("links");
        console.log("Connected to `" + DATABASE_NAME + "`!");
    });
});

// get all links
app.get("/api/get", (req, res) => {
    try{
        collection.find({}).toArray((error, result) => {
            if(error) return res.status(500).send(error);
            res.send(result);
        });

    }catch(e){
        res.json({error: e.toString()})
    }
});

//store a link
app.post("/api/store", (req, res) => {
    collection.insertOne(req.body, (error, result) => {
        if(error) return res.status(500).send(error)
        res.send(result.result);
    });
});
