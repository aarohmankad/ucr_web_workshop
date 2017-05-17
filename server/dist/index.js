'use strict';

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _mongoose = require('mongoose');

var _mongoose2 = _interopRequireDefault(_mongoose);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var app = (0, _express2.default)(),
    router = _express2.default.Router(),
    port = process.env.PORT || 8000;

app.use(_bodyParser2.default.urlencoded({
	extended: true
}));
app.use('/api', router);

_mongoose2.default.connect('mongodb://localhost/school');

var Student = _mongoose2.default.model("Student", {
	createdDate: {
		type: Date,
		default: Date.now
	},
	id: {
		type: String,
		unique: true,
		required: true
	},
	name: {
		type: String
	},
	gender: {
		type: String,
		enum: ['Male', 'Female', 'Other']
	}
});

router.post('/students', function (req, res) {
	Student.create(req.body, function (err, student) {
		if (err) {
			res.send(err);
		}

		return res.send(student);
	});
});

router.get('/students', function (req, res) {
	Student.find({}, function (err, students) {
		if (err) {
			res.send(err);
		}

		return res.send(students);
	});
});

router.get('/students/:id', function (req, res) {
	Student.findOne({
		id: req.params.id
	}, function (err, student) {
		if (err) {
			res.send(err);
		}

		return res.send(student);
	});
});

router.put('/students/:id', function (req, res) {
	Student.findOneAndUpdate({
		id: req.params.id
	}, req.body, { new: true }, function (err, success) {
		if (err) {
			res.send(err);
		}

		return res.send(success);
	});
});

router.delete('/students/:id', function (req, res) {
	Student.remove({
		id: req.params.id
	}, function (err, success) {
		if (err) {
			res.send(err);
		}

		return res.send(success);
	});
});

app.listen(port);
console.log('Magic happens on ' + port);
//# sourceMappingURL=index.js.map