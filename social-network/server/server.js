const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const MongoServer = require("mongodb").Server;

const app = express();
app.use(bodyParser. urlencoded({ extended: true }));
const url = "mongodb://localhost:27017/";

const dbname = "socialNetwork";
const collection = "accounts";

const insertDocumentIntoCollection = (dbname, collection, callback) => {
  console.log("Inserting called. Conecting...");
  MongoClient.connect(url, {useUnifiedTopology: true}, (err, db) => {
    if (err) {
      throw err;
    }

    const dbo = db.db(dbname);

    dbo.listCollections().toArray( (err, collections) => {
      if (err) {
        throw err;
      }

      for (let i in collections) {
        if(collections[i].name == collection) {
          console.log(`Found ${collection} colection`);
        }
      }

      callback(dbo);
    });
  });
}


app.listen(8000, () => {
  console.log("Express listening at http://127.0.0.1:8000");
});

app.get("/", (req, res) => {
  res.send(`Api endpoints:
    1-GET /
    2-POST /sigin
    3-POST /forgotPassword
    4-POST /login
  `);
});


app.post("/sigin", (req, res) => {
  if (!req.body.email || !req.body.password || !req.body.tos) {
    res.send(`Missing email, password or tos`);
    return;
  }

  if (!!req.body.tos == true) {
    // TODO: validate email and password before insert
    insertDocumentIntoCollection(dbname, collection, dbo => {
      dbo.collection(collection).find(req.body.email).toArray( (err, res2) => {
        if (err) {
          throw err;
        }

        let emailAlreadySigin = false;
        for(let i in res2) {
          if (res2[i].email == req.body.email) {
            console.log("Email already exists");
            res.send("Email already exists");
            emailAlreadySigin = true;
          }
          console.log(res2[i]);
        }

        if (!emailAlreadySigin) {
          console.log("Not found email, creating...");
          const acc = {
            email: req.body.email,
            password: req.body.password
          };
          dbo.collection(collection).insertOne(acc);
          res.send(`Account created`);
        }

      });
    });
  }
});


app.post("/login", (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.send(`Missing email or password`);
    return;
  }

  // TODO: validate email and password before compare
  insertDocumentIntoCollection(dbname, collection, dbo => {
    dbo.collection(collection).find(req.body.email).toArray( (err, res2) => {
      if (err) {
        res.send(`Error finding email`);
        throw err;
      }

      for(let i in res2) {
        if (res2[i].email == req.body.email && res2[i].password == req.body.password) {
          console.log(`${req.body.password} is logged in`);
          res.send(`Logged in`);
          return;
        }
      }
      res.send(`Not logged in`);
    });
  });
});


app.post("/forgotPassword", (req, res) => {
  res.send(`Not implemented yet.`);
});
