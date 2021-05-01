const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const MongoServer = require("mongodb").Server;
const session = require("express-session");                            const multipart = require("express-parse-multipart");
const multipartToString = formData => {
  let data = {};
  for(let i in formData) {
    switch(formData[i].name) {
      case "email":
        data.email = formData[i].data.toString();
      break;

      case "password":
        data.password = formData[i].data.toString();
      break;

      case "tos":
        data.tos = formData[i].data.toString();
    }
  }
  return (data.tos ? [data.email, data.password, data.tos] : [data.email, data.password]);
}


const app = express();
app.use(bodyParser.urlencoded({ extended: true }), session({
  secret: '99RX-PWPE6CZA7Z-4',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false
  }
}), /* allow fetch from react in dev */ (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();
});


const url = "mongodb://localhost:27017/";
const dbname = "socialNetwork";
const collection = "accounts";                                         let mySession = false;

/* TODO: Add csfr token to react forms */

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
    1 - GET      /
    2 - POST     /sigin
    3 - POST     /forgotPassword
    4 - POST     /login
    5 - GET      /logout
  `);
});


app.post("/sigin", multipart, (req, res) => {
  if (!req.formData && (!req.body.email || !req.body.password || !req.body.tos)) {
    res.send(JSON.stringify({ result: false, error: "Missing email, password or tos"}));
console.log("req.body.email: " + req.body.email);
    return;
  }

  if (req.formData) {
    [req.body.email, req.body.password, req.body.tos] = multipartToString(req.formData);
  }

  if (!!req.body.tos == true) {
    // TODO: validate email and password before insert
    insertDocumentIntoCollection(dbname, collection, dbo => {
      dbo.collection(collection).find(req.body.email).toArray( (err, res2) => {
        if (err) {
          res.send(JSON.stringify({ result: false, error: "server error"}));
          return;
        }


        else {
          let emailAlreadySigin = false;
          for(let i in res2) {
            if (res2[i].email == req.body.email) {
              console.log("Email already exists");
              res.send(JSON.stringify({ result: false, error: "exists"}));
              emailAlreadySigin = true;
              break;
            }
            console.log(res2[i]);
          }

          if (!emailAlreadySigin) {
            console.log("Not found email, creating...");
            const acc = {
              email: req.body.email, //TODO: hash password
              password: req.body.password
            };
            dbo.collection(collection).insertOne(acc);
            res.send(JSON.stringify({ result: true }));
            console.log("Account created");
          }
        }
      });
    });
  }
});


app.post("/login", multipart, (req, res) => {
  if (!req.formData && (!req.body.email || !req.body.password)) {
    res.send(JSON.stringify({result: false, error: "Missing email or password"}));
    return;
  }

  if (req.formData) {
    [req.body.email, req.body.password] = multipartToString(req.formData);
  }

  // TODO: validate email and password before compare
  insertDocumentIntoCollection(dbname, collection, dbo => {
    dbo.collection(collection).find(req.body.email).toArray( (err, res2) => {
      if (err) {
        res.send(JSON.stringify({ result: false, error: "server error"}));
        console.log("Error finding email");
        throw err;
      }

      for(let i in res2) {
        if (res2[i].email == req.body.email && res2[i].password == req.body.password) {
          console.log(`${req.body.email} is logged in`);
          res.setHeader("Access-Control-Allow-Credentials", "true");
          req.session.email = req.body.email
          mySession = req.session.email;
          res.send(JSON.stringify({ result: true }));
console.log("Logged in");

          return;
        }
      }
      res.send(JSON.stringify({ result: false, error: "invalid credentials"}));
console.log("Not logged in");
    });
  });
});


app.post("/forgotPassword", (req, res) => {
  res.send(JSON.stringify({ result: false, error: "unavailable"}));
});


app.get("/logout", (req, res) => {
  //if (req.session.email) {
  if (mySession) {
    mySession = false;
    //req.session.destroy();
    res.send(JSON.stringify({ result: true}));
  } else {
    res.send(JSON.stringify({ result: false, error: "no session" }));
  }
});

app.get("/profile", (req, res) => {
  //if (req.session.email) {
  if (mySession) {
    const userData = {
    /* dummy, req from db instead. getUserData() */
      email: "fake@gmail.com",
      posts: [
        "hello, this is my first post!",
        "how are you?",
        "my third post!!"
      ]
    }
    res.send(JSON.stringify({ result: true, data: userData }));
  } else {
    res.send(JSON.stringify({ result: false, error: "unavailable"}));
  }
});
