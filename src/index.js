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

mongoose.connect('mongodb://localhost/school');

let Student = mongoose.model("Student", {
	createdDate: {
		type: Date,
		default: Date.now,
	},
	id: {
		type: String,
		unique: true,
		required: true,
	},
	name: {
		type: String,
	},
	gender: {
		type: String,
		enum: [
			'Male',
			'Female',
			'Other',
		],
	},
});

router.post('/students', (req, res) => {
	Student.create(req.body, (err, student) => {
		if (err) {
			res.send(err);
		}

		return res.send(student);
	});
});

router.get('/students', (req, res) => {
	Student.find({}, (err, students) => {
		if (err) {
			return res.send(err);
		}

		return res.send(students);
	});
});

router.get('/students/:id', (req, res) => {
	Student.findOne({
		id: req.params.id
	}, (err, student) => {
		if (err) {
			return res.send(err);
		}

		return res.send(student);
	});
});

router.put('/students/:id', (req, res) => {
	Student.findOneAndUpdate({
		id: req.params.id
	}, req.body,
	{ new: true },
	(err, success) => {
		if (err) {
			return res.send(err);
		}

		return res.send(success);
	});
});

router.delete('/students/:id', (req, res) => {
	Student.remove({
		id: req.params.id
	}, (err, success) => {
		if (err) {
			return res.send(err);
		}

		return res.send(success);
	});
});

app.listen(port);
console.log(`Magic happens on ${ port }`);
