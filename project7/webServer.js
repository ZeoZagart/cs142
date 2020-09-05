"use strict";

/* jshint node: true */

/*
 * This builds on the webServer of previous projects in that it exports the current
 * directory via webserver listing on a hard code (see portno below) port. It also
 * establishes a connection to the MongoDB named 'cs142project6'.
 *
 * To start the webserver run the command:
 *    node webServer.js
 *
 * Note that anyone able to connect to localhost:portNo will be able to fetch any file accessible
 * to the current user in the current directory or any of its children.
 *
 * This webServer exports the following URLs:
 * /              -  Returns a text status message.  Good for testing web server running.
 * /test          - (Same as /test/info)
 * /test/info     -  Returns the SchemaInfo object from the database (JSON format).  Good
 *                   for testing database connectivity.
 * /test/counts   -  Returns the population counts of the cs142 collections in the database.
 *                   Format is a JSON object with properties being the collection name and
 *                   the values being the counts.
 *
 * The following URLs need to be changed to fetch there reply values from the database.
 * /user/list     -  Returns an array containing all the User objects from the database.
 *                   (JSON format)
 * /user/:id      -  Returns the User object with the _id of id. (JSON format).
 * /photosOfUser/:id' - Returns an array with all the photos of the User (id). Each photo
 *                      should have all the Comments on the Photo (JSON format)
 *
 */

var mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

var async = require("async");
var bodyParser = require("body-parser");
var crypto = require("crypto");
var redis = require("redis");
var redisClient = redis.createClient();
// Load the Mongoose schema for User, Photo, and SchemaInfo
var User = require("./schema/user.js");
var Photo = require("./schema/photo.js");
var SchemaInfo = require("./schema/schemaInfo.js");

var express = require("express");
// const { request, response } = require("express");
var app = express();

mongoose.connect("mongodb://localhost/cs142project6", {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});
mongoose.connection.on("open", () => {
	console.log("Mongoose connection opened");
});
mongoose.connection.on("error", () => {
	console.log("Mongoose connection closed");
});

// We have the express static module (http://expressjs.com/en/starter/static-files.html) do all
// the work for us.
app.use(express.static(__dirname));

app.get("/", function (request, response) {
	response.send("Simple web server of files from " + __dirname);
});

/*
 * Use express to handle argument passing in the URL.  This .get will cause express
 * To accept URLs with /test/<something> and return the something in request.params.p1
 * If implement the get as follows:
 * /test or /test/info - Return the SchemaInfo object of the database in JSON format. This
 *                       is good for testing connectivity with  MongoDB.
 * /test/counts - Return an object with the counts of the different collections in JSON format
 */
app.get("/test/:p1", function (request, response) {
	// Express parses the ":p1" from the URL and returns it in the request.params objects.
	console.log("/test called with param1 = ", request.params.p1);

	var param = request.params.p1 || "info";

	if (param === "info") {
		// Fetch the SchemaInfo. There should only one of them. The query of {} will match it.
		SchemaInfo.find({}, function (err, info) {
			if (err) {
				// Query returned an error.  We pass it back to the browser with an Internal Service
				// Error (500) error code.
				console.error("Doing /user/info error:", err);
				response.status(500).send(JSON.stringify(err));
				return;
			}
			if (info.length === 0) {
				// Query didn't return an error but didn't find the SchemaInfo object - This
				// is also an internal error return.
				response.status(500).send("Missing SchemaInfo");
				return;
			}

			// We got the object - return it in JSON format.
			console.log("SchemaInfo", info[0]);
			response.end(JSON.stringify(info[0]));
		});
	} else if (param === "counts") {
		// In order to return the counts of all the collections we need to do an async
		// call to each collections. That is tricky to do so we use the async package
		// do the work.  We put the collections into array and use async.each to
		// do each .count() query.
		var collections = [
			{ name: "user", collection: User },
			{ name: "photo", collection: Photo },
			{ name: "schemaInfo", collection: SchemaInfo },
		];
		async.each(
			collections,
			function (col, done_callback) {
				col.collection.countDocuments({}, function (err, count) {
					col.count = count;
					done_callback(err);
				});
			},
			function (err) {
				if (err) {
					response.status(500).send(JSON.stringify(err));
				} else {
					var obj = {};
					for (var i = 0; i < collections.length; i++) {
						obj[collections[i].name] = collections[i].count;
					}
					response.end(JSON.stringify(obj));
				}
			}
		);
	} else {
		// If we know understand the parameter we return a (Bad Parameter) (400) status.
		response.status(400).send("Bad param " + param);
	}
});

var jsonParser = bodyParser.json();
app.use(jsonParser);

const AUTH_HEADER = "AUTH-SESSION-TOKEN";
// request verification middleware
const tokenVerifier = function (req, res, next) {
	if (req.originalUrl.includes("login")) {
		console.log("Log-in request, no token needed");
		next();
	} else if (req.originalUrl.includes("logout")) {
		console.log("Log-out request, token not needed in header");
		next();
	} else {
		console.log("Url : " + req.originalUrl);
		var auth = req.get(AUTH_HEADER);
		console.log("Auth header: " + auth + " content type : " + typeof auth);
		console.log(auth);
		redisClient.get(auth, (err, value) => {
			console.log(`in redis get, found err: ${err}, value: ${value}`);
			if (value) {
				console.log(
					`Authorizing user : ${auth} for url: ${req.originalUrl}`
				);
				req.headers["user-id"] = value;
				next();
			} else {
				console.log(
					`auth ${auth} not found for url: ${req.originalUrl}, req: ${req} : ${err}`
				);
				res.status(401).send("Unauthorized, access token not found");
			}
		});
	}
};
app.use(tokenVerifier);

function minify(obj) {
	// console.log("Minifying obj : " + obj);
	let jsObj = JSON.parse(JSON.stringify(obj));
	delete jsObj.__v;
	if (Array.isArray(jsObj)) {
		jsObj.forEach((it) => {
			delete it.__v;
		});
	}
	return jsObj;
}

function find(response, err, res) {
	if (err) {
		console.log(`Error processing request: ${err}`);
		response.status(400).send(err);
	} else {
		try {
			response.status(200).send(minify(res()));
		} catch (err) {
			console.log(`Error finding object: ${JSON.stringify(err)}`);
			response.status(403).send("Incorrect password/username");
		}
	}
}

app.post("/postComment", function (request, response) {
	let photoId = request.body.photo_id;
	let comment_text = request.body.comment;
	let date_time = Date.now();
	let userId = request.headers["user-id"];
	Photo.findById(photoId, (err, photo) => {
		if (err) {
			console.log(`Error processing request: ${err}`);
			response.status(400).send(err);
		} else {
			try {
				photo.comments = photo.comments.concat([
					{
						comment: comment_text,
						date_time: date_time,
						user_id: userId,
					},
				]);
				console.log(
					"Added comment: %s by user: %s to photo: %s",
					comment_text,
					userId,
					photoId
				);
				photo.save();
				response.status(200).send(minify(photo.comments));
			} catch (error) {
				console.log(
					`Error saving comment for photo: ${photo} => ${error}`
				);
				response.status(400).send(error);
			}
		}
	});
});

/*
 * URL /user/list - Return all the User object.
 */
app.get("/user/list", function (request, response) {
	console.log("Returning user list");
	User.find({}, (err, res) => find(response, err, () => res));
});

/*
 * URL /user/:id - Return the information for User (id)
 */
app.get("/user/:id", function (request, response) {
	let id = request.params.id;
	User.findById(id, (err, res) => find(response, err, () => res));
});

app.post("/login", (request, response) => {
	let username = request.body.username;
	let password = request.body.password;
	User.find({ username: username }, (err, res) => {
		find(response, err, () => {
			console.log("Found user : ");
			console.log(res);
			let user = minify(res[0]);
			let salt = user.salt;
			let encrypted = crypto
				.createHash("sha256")
				.update(password + salt)
				.digest("hex");
			if (encrypted === user.password) {
				redisClient.set(encrypted, user._id, (err, value) => {
					if (err) console.log("Error storing token in redis");
					else console.log(`Stored token in redis ${value}`);
				});
				user.sessionToken = encrypted;
				return user;
			} else {
				return null;
			}
		});
	}).limit(1);
});

app.post("/logout", (request, response) => {
	console.log("Logging out : " + JSON.stringify(request.body));
	redisClient.del(request.body.token, (err, res) => {
		if (err)
			console.log(
				`Error removing token :${request.body.token} from redis`
			);
		else
			console.log(
				`Successfully logged out: ${request.body.token} : ${res}`
			);
	});
	response.status(200).send("Logged out successfully!");
});

/*
 * URL /photosOfUser/:id - Return the Photos for User (id)
 */
app.get("/photosOfUser/:id", function (request, response) {
	let id = request.params.id;
	Photo.find({ user_id: id }, (err, res) => find(response, err, () => res));
});

var server = app.listen(3000, function () {
	var port = server.address().port;
	console.log(
		"Listening at http://localhost:" +
			port +
			" exporting the directory " +
			__dirname
	);
});
