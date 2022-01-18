# 第一个参数，项目路径
# 第二个参数，项目名字
# 第三个参数，更改成为的新名字

echo "目录路径 $1"
echo "项目名字 $2"
echo "项目新名字 $3"


# 更改所有的train
cd $1
export LC_CTYPE=C
export LANG=C
find ./ -type f -exec sed -i '' "s/$2/$3/g" {} \; 
# | xargs sed -i "" "s/$2/$3/g"
# 更改目录
mkdir -p $3
mv $2/* $3
# 更改xcodeproj文件名
mv $2.xcodeproj $3.xcodeproj
# 更改scheme，多个的话可以自行增加修改
mv $3.xcodeproj/xcshareddata/xcschemes/$2.xcscheme $3.xcodeproj/xcshareddata/xcschemes/$3.xcscheme
# 修改xworkspace名
mv $2.xcworkspace $3.xcworkspace

mv $3/Resources/Configs/$2-Bridging-Header.h $3/Resources/Configs/$3-Bridging-Header.h

mkdir -p $3Tests
mv $2Tests/* $3Tests
mv $3Tests/$2Tests.swift $3Tests/$3Tests.swift
rm -rf $2Tests/

mkdir -p $3UITests
mv $2UITests/* $3UITests
mv $3UITests/$2UITests.swift $3UITests/$3UITests.swift
rm -rf $2UITests/

rm -rf $2/
rm $2.xcworkspace

export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8



 
