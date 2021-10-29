var find = require('find')
var path = require('path')
var rename = require('./rename')
var fs = require('fs')
var projectPath = 'ProjectPath'
var projectPath2 = 'ProjectPath/Name.xcodeproj'

var oldprefix = ''
var newprefix = ''

// 找到匹配的文件
function findAllFiles(match, directory, isDir = false) {
  var p = new Promise(function(resolve, reject ){
    if (isDir) {
      console.log('Finding Dir Name : '+directory)              
      find.dir(match, directory, function(files) {
        resolve(files)
      })
    } else {
      find.file(match, directory, function(files) {
        resolve(files)
      })
    }
  })
  return p
}

module.exports.renameAllImagesets =  function (){

  var imageSetReg = /\.(imageset)$/
  var imageRegGlobal1 = new RegExp('(?<=")[\\w\\s_]+(?=(\.(png|jpg|jpeg)))') //全局匹配图片的reg
  var imageRegGlobal2 = new RegExp('(?<=")[\\w\\s_]+(?=(@2x\.(png|jpg|jpeg)))') //全局匹配图片的reg
  var imageRegGlobal3 = new RegExp('(?<=")[\\w\\s_]+(?=(@3x\.(png|jpg|jpeg)))') //全局匹配图片的reg

  var imageReg = /[a-zA-Z\s0-9_]+(?=(@[23]x)?\.(png|jpg|jpeg))/ //匹配图片的reg

  findAllFiles(imageSetReg, projectPath, true ).then(function(folders){
    // 找到所有的imageset文件夹  
    // 遍历imageset 取出用到的名字
    folders.forEach(folder => {
      var fileName = path.basename(folder) // 文件名
      var folderName = path.dirname(folder) // imageset目录名
      fileName = fileName.replace(imageSetReg, '') // 去掉后缀
      if (fileName != 'AppIcon') {  
        fileName = fileName.replace(new RegExp(`^twpic`), 'sxpic')

        //更改文件夹里内容统一名字
        var subfiles = find.fileSync(/\.(png|jpg|jpeg)$/, folder)
        subfiles.forEach(subfile => {
          var imageName = path.basename(subfile) //文件名           
          imageName = imageName.replace(imageReg, fileName)            
          fs.renameSync(subfile, `${folder}/${imageName}`)
        })  

        //更改contents.json 统一文件名
        var contentsJsonPath = `${folder}/Contents.json`
        if(fs.existsSync(contentsJsonPath)) {
          var content = fs.readFileSync(contentsJsonPath, 'utf8')
          var contentNew = content.replace(imageRegGlobal1,fileName)
          contentNew = contentNew.replace(imageRegGlobal2,fileName)
          contentNew = contentNew.replace(imageRegGlobal3,fileName)
          fs.writeFileSync(contentsJsonPath, contentNew)
        }         
        fs.renameSync(folder, `${folderName}/${fileName}.imageset`)        
      }
    })

  }).then(function(res){    
    console.log('重命名Imageset图片完成。。。')              

  }).catch(function(err){
    console.log(err)         
    console.log('重命名Imageset图片失败。。。')       
  })
}

// 更改所有的类名，替换类名
function processAllClasses(directory) {

  findAllFiles(/\.(zip|swift|h|m|mm|xib|pbxproj|pch)/, directory ).then(function(classes){
    return rename.renameClasses(classes,oldprefix,newprefix)    

  }).then(function(res){    
    console.log('重命名类完成。。。')              

  }).catch(function(err){
    console.log(err)         
    console.log('重命名类失败。。。')       
  })
}

// 替换所有的图片名
var imagesPath = projectPath
function processAllImages(directory) {

  var images = []
  var classFiles = []
  findAllFiles(/\.(png|jpg|jpeg)/, imagesPath).then(function(files){
    images = files
    return findAllFiles(/\.(zip|swift|h|m|xib|pbxproj)/, directory )        
  }).then(function(classes){
    classFiles = classes
    return rename.substituteImageName(classFiles, images)
  }).then(function(res){    
    console.log('替换图片完成。。。')      

  }).catch(function(err){
    console.log(err)
    console.log('替换图片失败。。。')        
  })
}

// 重命名所有的图片
function renameAllImages() {

  var allImages = []
  findAllFiles(/\.(png|jpg|jpeg)/, imagesPath).then(function(images){
    allImages = images
    return rename.renameImages(allImages, false) //重命名所有图片        
  }).then(function(images){

    if(images) {
      return Promise.resolve(1)
    } else {
      return Promise.reject(new Error('操作失败'))
    }
  }).catch(function(err){
    console.log(err)
  })
}

module.exports.processImages = function () {
    
  processAllImages(projectPath)
  processAllImages(projectPath2)
}

module.exports.renameAllImages = function () {

  renameAllImages()
}


module.exports.processClasses = function (path,name,oldpre,newpre) {

  projectPath = path+'/'+name
  projectPath2 = path+'/'+name+'.xcodeproj'
  oldprefix = oldpre
  newprefix = newpre
  
  console.log('projectPath : ' + projectPath)
  console.log('projectPath2 : ' + projectPath2)
  
  processAllClasses(projectPath)
  console.log('重命名Classes For Xcode Projects')
  processAllClasses(projectPath2)   
}

var filesInDataModel = ['/Users/Darcy/Desktop/AntBrand/ABProject/AntBrand/Classes/Data/AntBrandModel.xcdatamodeld/AntBrandModel.xcdatamodel/contents']
module.exports.renameClassInDataModel = function () {
    
  rename.renameClasses(filesInDataModel).then(function(res){
    console.log('重命名类完成。。。')              
  }).catch(function(err){
    console.log('重命名类失败。。。')              
  })
}
