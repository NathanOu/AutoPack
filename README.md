AutoPack
==============Cancel changes
通过Fastlane和NodeJS实现的自动打包工具

-----------------
### 一键批量修改项目前缀
##### Path: 项目地址
##### Project: Scheme Name Project Name
##### old: 项目用的前缀
##### new: 新前缀
```ruby
make class path={Project Path} project={Project Name} old={Old Prefix} new={New Prefix}
```


-----------------
### 自动打包
##### Path: 项目地址
##### Project: Scheme Name Project Name
```ruby
make pack path={Project Path} project={Project Name}
```


-----------------
####打包需要配置packageinfo.js
```js
var bundle_id = "你项目的Bundle ID"
var provision_name = "匹配你项目的Provision Profile"
var provision_path = "替换项目的Provision Profile Path"
var project_team_id = "项目对应的Team ID"
```

-----------------
### 一键批量修改工程名字
##### 第一个参数，项目路径
##### 第二个参数，项目名字
##### 第三个参数，更改成为的新名字
用法
```ruby
bash ChangeProject.sh /Desktop/Project/ OLDProjectNew NEWProjectName
```

-----------------
### 环境依赖
#### Home brew 用于安装依赖
#### Install Homebrew
```ruby
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install.sh)"
安装完成运行以下两行代码来引入brew命令
echo 'eval "$(/opt/homebrew/bin/brew shellenv)"' >> /Users/packer/.zprofile
eval "$(/opt/homebrew/bin/brew shellenv)"
```

#### 脚本运行依赖Node 和 Yarn
#### Install Node Yarn
```ruby
npm: brew install npm
Yarn: brew install yarn
```


=============== M1 Pod Install =============
```ruby
sudo arch -x86_64 gem install ffi
arch -x86_64 pod install
```










