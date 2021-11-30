
var fs = require('fs')
var path = require('path')

var imageOriginPrefix = 'wkpic'
var imageReplacePrefix = 'sxpic'

function renameImages(files, renameFolder = false) {

  let imageReg = new RegExp(`^${imageOriginPrefix}`)
  let p = new Promise(function(resolve, reject ){
    files.forEach(file => {
      var fileName = path.basename(file) //文件名
      var folder = path.dirname(file) // 文件夹
      fileName = fileName.replace(imageReg,imageReplacePrefix)
      fs.renameSync(file, `${folder}/${fileName}`)            
    })
    resolve(1)
  })
  return p
}

exports.renameImages = renameImages

function substituteImageName(classes) {

  // var imagesNames = []
  // images.forEach(image => {
  //   var name = path.basename(image)
  //   name = name.replace(/\.(png|jpeg|jpg)/,'')
  //   name = name.replace(/@[23]x/,'')
  //   if(imagesNames.indexOf(name) == -1 ) {
  //     imagesNames.push(name)
  //   }
  // })

  let imageReg = new RegExp(`${imageOriginPrefix}(?=_)`, 'g')
  classes.forEach(classFile => {   
    console.log('Replacing Content in :' + classFile + '')    
    var content = fs.readFileSync(classFile, 'utf8')
    // imagesNames.forEach(imagesName => {
    // if(/\.xib$/.test(classFile)){
    //   let imageRegStr = `(?<=("))${imagesName}(?=((@[23]x)?((\.(png|jpg|jpeg))?)\"))`
    //   let reg = new RegExp(imageRegStr, 'g')
    //   content = content.replace(reg,`${imageReplacePrefix}_${imagesName}`)
    // }
    // else if(/\.pbxproj$/.test(classFile)) {
    //   let imageRegStr = `(?<=(\\s+))${imagesName}`
    //   let reg = new RegExp(imageRegStr, 'g')
    //   content = content.replace(reg,`${imageReplacePrefix}_${imagesName}`)   

    //   var imageRegStr2 = `(?<=("))${imagesName}`
    //   var reg2 = new RegExp(imageRegStr2, 'g')
    //   content = content.replace(reg2, `${imageReplacePrefix}_${imagesName}`)
    // } else {
    //   let imageRegStr = `(?<=(@"))${imagesName}(?=(\"))`
    //   let reg = new RegExp(imageRegStr, 'g')                
    //   content = content.replace(reg, `${imageReplacePrefix}_${imagesName}`)
    // }

    // console.log(`${imagesName}`)    
    // })  
    content = content.replace(imageReg, imageReplacePrefix)
    fs.writeFileSync(classFile, content)    

  })
}

exports.substituteImageName = substituteImageName

var origin = 'AB'
var replace = 'CD'

function renameClasses(classes, oldpre, newpre) {

  origin = oldpre
  replace = newpre

  console.log('Replacing Prefix origin : ' + origin + ' ==== replace :' + replace)


  var p = new Promise(function(resolve, reject){
    //以AB开头的正则匹配
    // var abReg = /(?<=("|\s+|\(|\<))AB(?=([A-Z]\w*))/g

    var abReg = new RegExp(`(?<=([\\s\[\(\)"<,:\*/\\-\?\}\^\!\>\.]))${origin}(?=([A-Z]\\w+))`,'g')

    // 带后缀的h m swift
    let creghm = new RegExp(`(?<=([\\s\[\(\)"<,:\*/\\-\?\}\^=]))${origin}(?=([A-Z][\\w\+_]+\.(swift|h|m|xib)(\\s|;|")))`, 'g')

    // 类名的plist
    let plistreg = new RegExp(`(?<=([\>]))${origin}(?=([A-Z][\\w\+_]+))`, 'g')
    
    classes.forEach(classFile => {           

      var fileName = path.basename(classFile)
      var folder = path.dirname(classFile)
      var prefixReg = new RegExp(`^${origin}[A-Z].*`)

      let ispbxproj = /\.pbxproj$/.test(classFile)
      let isplist = /\.plist$/.test(classFile)

      if (folder.indexOf('/Pods/') == -1 && fileName.indexOf('.zip') == -1 ) {
        console.log('Classes Replacing Content in : ' + classFile + '') 
        console.log(' file name : ' + fileName + ' prefixed :' + prefixReg)       
        var content = fs.readFileSync(classFile, 'utf8')

        if (ispbxproj) {
          console.log('Replacing pbxproj Content in : ' + classFile + '')        
          content = content.replace(creghm, replace)     
        }else if (isplist) {
          console.log('Replacing plist Content in : ' + classFile + '')        
          content = content.replace(plistreg, replace)     
        }else{
          content = content.replace(abReg, replace)     
        }
        fs.writeFileSync(classFile, content)

        if (prefixReg.test(fileName)){
          console.log('Rename ' + fileName )
          fileName = fileName.replace(new RegExp(`^${origin}`), replace)
          fs.renameSync(classFile, `${folder}/${fileName}`)
        }
      }else {
        console.log('Pods File Not Replace : ' + classFile + '')
      }
    })
    resolve(1)
  })
  return p
}

exports.renameClasses = renameClasses
