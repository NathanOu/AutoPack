var find = require('find')
var path = require('path')
var fs = require('fs')

/////////////// 需要填写的必要信息 ////////////

// Fastlane 文件所在目录路径
var fastlanePath = '' // 当前目录下

var project_name = "{project_name}" // Scheme Name
var bundle_id = "pure.tuber.tools.os"
var provision_name = "XC Wildcard Dev" // Provision Name
var provision_path = "" // Provision 文件目录路径

/////////////// 传递参数 /////////////

var project_name = ''
var project_path = ''
var pack_description = "功能性更新" // 打包更新说明 蒲公英

module.exports.startToPack = function (path,name) {

   project_path = path
   project_name = name

   var fPath = fastlanePath + 'fastlane'
   copyFolderRecursiveSync(fPath,project_path)

   var project_path_fastlane_fastfile = project_path + '/fastlane/Fastfile'

   replaceDatas(project_path_fastlane_fastfile).then(function(res){
    console.log('更改Fastlane文件成功')              
  }).catch(function(err){
    console.log('更改Fastlane文件失败' + err)              
  })

}

// 替换Fastfile中的参数
function replaceDatas(fastfilePath) {
  var p = new Promise(function(resolve, reject){
    console.log('Ready to replace fast file : ' + fastfilePath)
    var content = fs.readFileSync(fastfilePath, 'utf8')
    content = content.replace('{project_name}', project_name)
    content = content.replace('{bundle_id}', bundle_id)
    content = content.replace('{provision_name}', provision_name)
    content = content.replace('{pack_description}', pack_description)
    content = content.replace('{provision_path}', provision_path)
    console.log( "\n ======================================>" + 'File Content  : \n' + content + "\n ======================================>")
    fs.writeFileSync(fastfilePath, content)
    resolve(1)
  })
  return p

}

function copyFileSync( source, target ) {

  var targetFile = target;

  // If target is a directory, a new file with the same name will be created
  if ( fs.existsSync( target ) ) {
      if ( fs.lstatSync( target ).isDirectory() ) {
          targetFile = path.join( target, path.basename( source ) );
      }
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

// Copy folder to path
function copyFolderRecursiveSync( source, target ) {
  var files = [];

  // Check if folder needs to be created or integrated
  var targetFolder = path.join( target, path.basename( source ) );
  if ( !fs.existsSync( targetFolder ) ) {
      fs.mkdirSync( targetFolder );
  }

  // Copy
  if ( fs.lstatSync( source ).isDirectory() ) {
      files = fs.readdirSync( source );
      files.forEach( function ( file ) {
          var curSource = path.join( source, file );
          if ( fs.lstatSync( curSource ).isDirectory() ) {
              copyFolderRecursiveSync( curSource, targetFolder );
          } else {
              copyFileSync( curSource, targetFolder );
          }
      } );
  }
}