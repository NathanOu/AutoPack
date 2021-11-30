
#使用说明
#bash StartPack.sh {你的项目目录路径} {项目名字} {需要打包的分支}
# 是蒲公英账号 是否需要混淆 待补充

echo "Git目录路径 $1"
echo "Git项目名字 $2"
echo "分支 $3"


# CD 到对应的项目目录
cd /Users/packer/Desktop
#if [ ! -d "Project" ];then
# mkdir Project
#else
# echo "Project Dir Exit"
cd Project

#拉取代码
git clone $1

cd $2

#清空当前的所有操作
git reset --hard
git clean -df
echo "Clean Git Finish"

git fetch origin
git checkout $3
git pull

arch -x86_64 pod install

# 检查当前目录有没有fastlane 有清空掉
#if [ -d "fastlane" ];then
 rm -rf fastlane
#else
# echo "No fastlane dir"
 
