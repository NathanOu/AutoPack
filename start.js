
var args = require('node-args')
var packageinfo = require('./packageinfo')
var replace = require('./replace')

var type = args.type
var path = args.path
var name = args.name
var desc = args.desc

if (type == 0) {
  // Rename
  var oldpre = args.oldpre
  var newpre = args.newpre
  replace.processClasses(path,name,oldpre,newpre)

} else if (type == 1) { 
  // pack
  // 修改fast file
  packageinfo.startToPack(path,name,desc)
}


packageinfo


