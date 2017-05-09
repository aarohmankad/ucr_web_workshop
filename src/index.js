import express from 'express'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

let
	app = express(),
	router = express.Router(),
	port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({
	extended: true,
}));
app.use('/api', router);



app.listen(port);
console.log(`Magic happens on ${ port }`);
