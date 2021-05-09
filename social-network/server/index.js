const express = require("express");
const bodyParser = require("body-parser");
const MongoClient = require("mongodb").MongoClient;
const MongoServer = require("mongodb").Server;
const session = require("express-session");
const multipart = require("express-parse-multipart");
const multipartToString = formData => {
  let data = {};
  for(let i in formData) {
    switch(formData[i].name) {
      case "email":                                                                             data.email = formData[i].data.toString();
      break;

      case "password":
        data.password = formData[i].data.toString();
      break;

      case "tos":
        data.tos = formData[i].data.toString();
      break;

      case "post":
        data.post = formData[i].data.toString();

      case "deletePost":
        data.deletePost = formData[i].data.toString();
    }
  }                                                                                       return [data.email, data.password, data.tos, data.post, data.deletePost ];
}

/* Express middleware */
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.use(session({
  secret: '99RX-PWPE6CZA7Z-4',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: false
  }
}));
app.use(/* allow fetch from react in dev */ (req, res, next) => {
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

  next();
});

/* Database global settings */                                                          const url = "mongodb://localhost:27017/";
const dbname = "socialNetwork";
const collection = "accounts";

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
    2 - POST     /signin
    3 - POST     /forgotPassword
    4 - POST     /login
    5 - GET      /logout
  `);
});


app.post("/signin", multipart, (req, res) => {
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
            const replies = [
              ["Hello and welcome.", "strmanolo@gmail.com"],
              ["Hi, i'm d1", "d1@gmail.com"]
            ];
            const acc = {
              email: req.body.email, //TODO: hash password
              password: req.body.password,
              image: "/favicon.ico",
              followers: [ "stringmanolo" ],
              following: [ "stringmanolo" ],
              posts: [
                ["Welcome!", 1, replies]
              ]
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
/* insert new session on MongoDB */
          /*res2[i].session = req.session.email;
          dbo.collection(collection).insertOne(res2[i]);
console.log(`FULL DATA? ${JSON.stringify(res2[i], null, 2)}`);
          */
/* end insertion */
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
  if (req.session.email) {
    req.session.destroy();
    res.send(JSON.stringify({ result: true}));
  } else {
    res.send(JSON.stringify({ result: false, error: "no session to destroy" }));
  }
});


app.get("/profile", (req, res) => {
  if (req.session.email) {
    insertDocumentIntoCollection(dbname, collection, dbo => {
      dbo.collection(collection).findOne( { email: req.session.email }, (err, res2) => {
        if (err) {
          res.send(JSON.stringify({ result: false, error: "server error"}));
          throw err;
        } else {
          const profileInfo = {
            email: res2.email,
            image: res2.image,
            followers: res2.followers,
            following: res2.following,
            posts: res2.posts,
            postId: res2.postId
          };
          res.send(JSON.stringify({ result: true, data: profileInfo }));
        }
      });
    });
  } else {
    res.send(JSON.stringify({ result: false, error: "no session/invalid"}));
  }
});


app.post("/profile", multipart, (req, res) => {
  if (req.session.email) {
    if (req.formData) {
      req.post = multipartToString(req.formData)[3];
      let postId = 0;

      insertDocumentIntoCollection(dbname, collection, dbo => {
        dbo.collection(collection).findOne( { email: req.session.email }, (err, res2) => {
          if (err) {
            res.send(JSON.stringify({ result: false, error: "server error"}));
            throw err;
          } else {
            postId = res2.posts.length ? res2.posts[res2.posts.length - 1][1] : 1;

            insertDocumentIntoCollection(dbname, collection, dbo => {
              dbo.collection(collection).updateOne({ email: req.session.email }, { $push: { posts: [req.post, ++postId] } }, (err, res2) => {
                if (err) {
                  res.send(JSON.stringify({ result: false, error: "server error"}));
                } else {
                  res.send(JSON.stringify({ result: true }));
                }

              });
            });
          }
        });
      })
    } else {
      res.send(JSON.stringify({ result: false, error: "no mutipart \"post\" field found"}));
    }

  } else {
    res.send(JSON.stringify({ result: false, error: "no session/invalid"}));
  }

});


app.post("/deletePost", multipart, (req, res) => {
  console.log("DELETING?");
  if (req.session.email) {
    if (req.formData) {
      const deleteId = multipartToString(req.formData)[4];
console.log(deleteId);
      insertDocumentIntoCollection(dbname, collection, dbo => {
        dbo.collection(collection).updateOne( { email: req.session.email }, { $pull: { posts: { $in: [ +deleteId ]  } }  }, (err, res2) => {
          /* handle crashes and errors and send them trought api */
          console.log("Done");
          res.send(JSON.stringify({ result: true }));
        });
      });
    }
  }
});


app.get("/profiles/:email", multipart, (req, res) => {
  if (req.session.email) {
    while(/\+/g.test(req.params.email)) {
      req.params.email = req.params.email.replace(/\+/g, "@");
    }
    insertDocumentIntoCollection(dbname, collection, dbo => {
      dbo.collection(collection).findOne( { email: req.params.email }, (err, res2) => {
        if (err) {
          res.send(JSON.stringify({ result: false, error: "server error"}));
          return;
        } else {
          try {
            res2.email &&
            res2.image &&
            res2.followers &&
            res2.following &&
            res2.posts &&
            res2.postId;
          } catch (er) {
            res.send(JSON.stringify({ result: false, error: "incomplete profile in database" }));
            return;
          }

          const profileInfo = {
            email: res2.email,
            image: res2.image,
            followers: res2.followers,
            following: res2.following,
            posts: res2.posts,
            postId: res2.postId
          };
          res.send(JSON.stringify({ result: true, data: profileInfo }));
        }
      });
    });

  } else {
    res.send(JSON.stringify({ result: false, error: "no session/invalid" }));
  }


  console.log("id" + req.params.id);

});
