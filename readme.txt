git初始化:
	初始化一个Git仓库，使用git init命令。
	添加文件到Git仓库，分两步：

git提交：
	第一步，使用命令git add <file>，注意，可反复多次使用，添加多个文件；
	第二步，使用命令git commit，完成。

git查看修改内容：
	要随时掌握工作区的状态，使用git status命令。
	如果git status告诉你有文件被修改过，用git diff可以查看修改内容。(提交修改：重复一、二步骤)

git返回指定历史版本：
	HEAD指向的版本就是当前版本，因此，Git允许我们在版本的历史之间穿梭，使用命令git reset --hard commit_id。
	穿梭前，用git log (--pretty=oneline,在一行显示)可以查看提交历史，以便确定要回退到哪个版本。
	要重返未来，用git reflog查看命令历史，以便确定要回到未来的哪个版本。


