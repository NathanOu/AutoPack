# AutoPack
通过Fastlane和NodeJS实现的自动打包工具

### 统一修改项目前缀
#### Path: 项目地址
#### Project: Scheme Name Project Name
#### old: 项目用的前缀
#### new: 新前缀
make class path={Project Path} project={Project Name} old={Old Prefix} new={New Prefix}

### 自动打包
#### Path: 项目地址
#### Project: Scheme Name Project Name
make pack path={Project Path} project={Project Name}

###打包需要配置packageinfo.js
`
var bundle_id = "你项目的Bundle ID"
var provision_name = "匹配你项目的Provision Profile"
var provision_path = "替换项目的Provision Profile Path"
var project_team_id = "项目对应的Team ID"
`
