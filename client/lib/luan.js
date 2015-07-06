module.exports = function (len) {
  var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz123456789';
  var maxPos = $chars.length;
  var pwd = '';
  for (var i = 0; i < len; i++) {
　  pwd += $chars.charAt(Math.floor(Math.random() * maxPos))
　};
　return pwd;
}