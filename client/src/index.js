import express from 'express'
import path from 'path'

let app = express();

app.use(express.static(__dirname + path.sep, {}));

app.get('/', (request, response) => {
	return response.sendFile(__dirname + path.sep + 'index.html');
});

app.listen(9000);
console.log(`Magic happens on 9000`);
