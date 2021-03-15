const mongoose = require('mongoose');
mongoose.connect("mongodb://localhost:27017/Database", {
	useCreateIndex: true,
	useNewUrlParser: true,
	useUnifiedTopology: true,
	useFindAndModify:false
}).then(function () {
	console.log("Success");
}).catch(function (e) {
	console.log("Defeat");
});  