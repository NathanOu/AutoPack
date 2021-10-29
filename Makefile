
# Path: 项目地址
# Project: Scheme Name Project Name
# old: 项目用的前缀
# new: 新前缀
# Usage: make cla path={Project Path} project={Project Name} old={Old Prefix} new={New Prefix}
class:
	@echo ${project}
	@echo ${path}
	@echo ${old}
	@echo ${new}	

	# 更改类名
	node start.js --type 0 --path ${path} --name ${project} --oldpre ${old} --newpre ${new}

# Path: 项目地址
# Project: Scheme Name Project Name
# Usage: make pack path={Project Path} project={Project Name}
pack:

	@echo ${project}
	@echo ${path}

	# 拷贝和替换fastfile参数
	node start.js --type 1 --path ${path} --name ${project}

	# 执行fastlane
	cd ${path} && fastlane develop_lane