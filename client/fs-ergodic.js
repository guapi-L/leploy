var fs = require('fs');
var join = require('path').join;
module.exports = function ergodic(_dir, cb) {
	var Stats = fs.lstatSync(_dir);
	if (Stats.isFile()) { 
		cb(_dir);
		return false;
	} else {
		var _ls = fs.readdirSync(_dir);
		for (var i = 0, t; t = _ls[i]; i++) ergodic(join(_dir, t), cb);
	}
}