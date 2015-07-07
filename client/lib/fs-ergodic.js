var fs = require('fs');
var join = require('path').join;
var _list = [];
var count = 0;
module.exports = function ergodic(_dir) {
 /* var Stats = fs.lstatSync(_dir);
	if (Stats.isFile()) {
		// cb(_dir);
		_list.push(cb, [_dir]);
		count++;
	} else {
		var _ls = fs.readdirSync(_dir);
		for (var i = 0, t; t = _ls[i]; i++) {
		  ergodic(join(_dir, t), cb);
		  // _list.push(ergodic, [_dir, t]);
		}
	//} */
	return ergodicIterator(_dir);
}

function ergodicIterator (_dir) {
	var Stats = fs.lstatSync(_dir);
	if (Stats.isFile()) {
		// cb(_dir);
		return [_dir];
	} else {
		var arrDir = [];
		var _ls = fs.readdirSync(_dir);
		for (var i = 0, t; t = _ls[i]; i++) {
		  arrDir = arrDir.concat(ergodicIterator(join(_dir, t)));
		  // _list.push(ergodic, [_dir, t]);
		}
		return arrDir;
	}
}