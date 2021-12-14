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
var project_team_id = "" // Team ID

/////////////// 传递参数 /////////////

var project_name = ''
var project_path = ''
var pack_description = "功能性更新" // 打包更新说明 蒲公英

var pgy_app_url = "{pgy_app_url}" // 蒲公英的下载地址
var pgy_qrcode = "{pgy_qrcode}" // 蒲公英的二维码地址
var app_branch_name = "" // 蒲公英的二维码地址

module.exports.startToPack = function (path,name,desc,branch) {

   project_path = path
   project_name = name
   pack_description = desc
   app_branch_name = branch

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
    content = content.replace('{project_team_id}', project_team_id)
    content = content.replace('{pgy_app_url}', pgy_app_url)
    content = content.replace('{pgy_qrcode}', pgy_qrcode)
    content = content.replace('{app_branch_name}', app_branch_name)
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
