# 第一个参数，项目路径
# 第二个参数，项目名字
# 第三个参数，更改成为的新名字

echo "目录路径 $1"
echo "项目名字 $2"
echo "项目新名字 $3"


# 更改所有的train
cd $1
grep -rl $2 ./* 
# | xargs sed -i "" "s/$2/$3/g"
# 更改目录
mkdir -p $3
mv $2/* $3
# 更改xcodeproj文件名
mv $2.xcodeproj $3.xcodeproj
# 更改scheme，多个的话可以自行增加修改
mv $2.xcodeproj/xcshareddata/xcschemes/$2.xcscheme $2.xcodeproj/xcshareddata/xcschemes/$3.xcscheme
# 修改xworkspace名
mv $2.xcworkspace $3.xcworkspace

rm -rf $2/
rm $2.xcworkspace



 
