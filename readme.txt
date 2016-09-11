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

git中有 工作区 和 版本库 两部分
	工作区：电脑中能看到的目录
	版本库： 暂存区（stage）、分支（master）、指向master的一个指针（HEAD）
	第一步是用git add把文件添加进去，实际上就是把文件修改添加到暂存区；
	第二简单理解为，需要提交的文件修改通通放到暂存区，然后，一次性提交暂存区的所有修改。
	简单理解为，需要提交的文件修改通通放到暂存区，然后，一次性提交暂存区的所有修改。


git checkout -- readme.txt  //撤销修改
	命令git checkout -- readme.txt意思就是，把readme.txt文件在工作区的修改全部撤销，这里有两种情况：
	一种是readme.txt自修改后还没有被放到暂存区，现在，撤销修改就回到和版本库一模一样的状态；
	一种是readme.txt已经添加到暂存区后，又作了修改，现在，撤销修改就回到添加到暂存区后的状态。
	总之，就是让这个文件回到最近一次git commit或git add时的状态。

git reset HEAD file  //将添加到暂存区（add）还没有提交（commit）的修改，退回到工作区
	在commit之前，你发现了问题。用git status查看一下，修改只是添加到了暂存区，还没有提交：
	$ git status
	# On branch master
	# Changes to be committed:
	#   (use "git reset HEAD <file>..." to unstage)
	#
	#       modified:   readme.txt
	Git同样告诉我们，用命令git reset HEAD file可以把暂存区的修改撤销掉（unstage），重新放回工作区：
	$ git reset HEAD readme.txt
	Unstaged changes after reset:
	M       readme.txt
小结：
	场景1：当你改乱了工作区某个文件的内容，想直接丢弃工作区的修改时，用命令git checkout -- file。

	场景2：当你不但改乱了工作区某个文件的内容，还添加到了暂存区时，想丢弃修改，分两步，第一步用命令git reset HEAD file，就回到了场景1，第二步按场景1操作。

	场景3：已经提交了不合适的修改到版本库时，想要撤销本次提交，参考版本回退一节，不过前提是没有推送到远程库。

删除了文件：
	git status命令会立刻告诉你哪些文件被删除了
	一是确实要从版本库中删除该文件，那就用命令 git rm 删掉，并且 git commit
	另一种情况是删错了，因为版本库里还有呢，所以可以很轻松地把误删的文件恢复到最新版本  git checkout -- test.txt

	如果一个文件已经被提交到版本库，那么你永远不用担心误删，但是要小心，你只能恢复文件到 最新版本 ，你会丢失最近一次提交后你修改的内容。











