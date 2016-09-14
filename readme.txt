git 使用基础知识：
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

创建ssh公钥私钥：
	ssh-keygen -t rsa -C "1970390434@qq.com"
	将公钥内容添加到github账户中（Add SSH Key）

上传到 github 远程库：
	要关联一个远程库，使用命令git remote add origin git@server-name:path/repo-name.git；
	关联后，使用命令git push -u origin master第一次推送master分支的所有内容；
	此后，每次本地提交后，只要有必要，就可以使用命令git push origin master推送最新修改；
	分布式版本系统的最大好处之一是在本地工作完全不需要考虑远程库的存在，也就是有没有联网都可以正常工作，而SVN在没有联网的时候是拒绝干活的！当有网络的时候，再把本地提交推送一下就完成了同步，真是太方便了！

git clone 从远程库克隆到本地：
	要克隆一个仓库，首先必须知道仓库的地址，然后使用git clone命令克隆。
	Git支持多种协议，包括https，但通过ssh支持的原生git协议速度最快。

分支管理：
	你创建了一个属于你自己的分支，别人看不到，还继续在原来的分支上正常工作，而你在自己的分支上干活，想提交就提交，直到开发完毕后，再一次性合并到原来的分支上，这样，既安全，又不影响别人工作。

Git鼓励大量使用分支：
	查看分支：git branch
	创建分支：git branch <name>
	切换分支：git checkout <name>
	创建+切换分支：git checkout -b <name>
	合并某分支到当前分支：git merge <name>
	删除分支：git branch -d <name>

git 冲突：
	当Git无法自动合并分支时，就必须首先解决冲突。解决冲突后，再提交，合并完成。
	用git log --graph命令可以看到分支合并图

	合并分支时，加上--no-ff参数就可以用普通模式合并，合并后的历史有分支，能看出来曾经做过合并，而fast forward合并就看不出来曾经做过合并。
	git checkout -b dev  //创建并且切换分支
	git add readme.txt  //修改添加到暂存区
	git checkout master  //切换分支
	git merge --no-ff -m "merge with no-ff" dev  //普通模式合并分支
	git log --graph --pretty=oneline --abbrev-commit  //查看历史分支

在实际开发中，我们应该按照几个基本原则进行分支管理：
	首先，master分支应该是非常稳定的，也就是仅用来发布新版本，平时不能在上面干活；
	那在哪干活呢？干活都在dev分支上，也就是说，dev分支是不稳定的，到某个时候，比如1.0版本发布时，再把dev分支合并到master上，在master分支发布1.0版本；
	你和你的小伙伴们每个人都在dev分支上干活，每个人都有自己的分支，时不时地往dev分支上合并就可以了。

修复bug：
	修复bug时，我们会通过创建新的bug分支进行修复，然后合并，最后删除；
	当手头工作没有完成时，先把工作现场 git stash 一下，然后去修复bug，修复后，再git stash pop，回到工作现场。
	git stash list // 查看保存的工作现场

	工作现场： Git把stash内容存在某个地方了，但是需要恢复一下，有两个办法：
	一是用git stash apply恢复，但是恢复后，stash内容并不删除，你需要用git stash drop来删除；
	另一种方式是用git stash pop，恢复的同时把stash内容也删了。
	你可以多次stash，恢复的时候，先用git stash list查看，然后恢复指定的stash，用命令：
	git stash apply stash@{0}

强行删除一个未合并过的分支：
	开发一个新feature，最好新建一个分支；
	如果要丢弃一个没有被合并过的分支，可以通过git branch -D <name>强行删除。

本地仓库和远程仓库同步：
	查看远程库信息，使用 git remote -v；
	本地新建的分支如果不推送到远程，对其他人就是不可见的；
	从本地推送分支，使用 git push origin branch-name，如果推送失败，先用 git pull 抓取远程的新提交；
	在本地创建和远程分支对应的分支，使用 git checkout -b branch-name origin/branch-name，本地和远程分支的名称最好一致；

	(  小伙伴要在dev分支上开发，就必须创建远程origin的dev分支到本地，于是他用这个命令创建本地dev分支：
	git checkout -b dev origin/dev	)

	建立本地分支和远程分支的关联，使用 git branch --set-upstream branch-name origin/branch-name；
	从远程抓取分支，使用 git pull，如果有冲突，要先处理冲突。


多人协作的工作模式通常是这样：
	首先，可以试图用git push origin branch-name推送自己的修改；
	如果推送失败，则因为远程分支比你的本地更新，需要先用git pull试图合并；
	如果合并有冲突，则解决冲突，并在本地提交；
	（***********************）没有冲突或者解决掉冲突后（***********************），再用git push origin branch-name推送就能成功！
	如果git pull提示“no tracking information”，则说明本地分支和远程分支的链接关系没有创建，用命令git branch --set-upstream branch-name origin/branch-name。
	这就是多人协作的工作模式，一旦熟悉了，就非常简单。

git 创建 tag 标签：
	命令git tag <name>用于新建一个标签，默认为HEAD，也可以指定一个commit id；
	git tag -a <tagname> -m "blablabla..."可以指定标签信息；
	git tag -s <tagname> -m "blablabla..."可以用PGP签名标签；
	命令git tag可以查看所有标签，（git show <tagname> 可以看到 tag 说明）。

git 删除 tag 标签
	命令git push origin <tagname>可以推送一个本地标签；
	命令git push origin --tags可以推送全部未推送过的本地标签；
	命令git tag -d <tagname>可以删除一个本地标签；
	命令git push origin :refs/tags/<tagname>可以删除一个远程标签。

使用GitHub：
	在GitHub上，可以任意Fork开源仓库；
	自己拥有Fork后的仓库的读写权限；
	可以推送pull request给官方仓库来贡献代码。

忽略文件的原则是：
	忽略操作系统自动生成的文件，比如缩略图等；
	忽略编译生成的中间文件、可执行文件等，也就是如果一个文件是通过另一个文件自动生成的，那自动生成的文件就没必要放进版本库，比如Java编译产生的.class文件；
	忽略你自己的带有敏感信息的配置文件，比如存放口令的配置文件。

.gitignore 忽略文件 :
	# Windows:
	Thumbs.db
	ehthumbs.db
	Desktop.ini

	# Python:
	*.py[cod]
	*.so
	*.egg
	*.egg-info
	dist
	build

	# My configurations:
	db.ini
	deploy_key_rsa

	git check-ignore -v App.class  //可以找出来到底哪个规则写错了

	忽略某些文件时，需要编写.gitignore；
	.gitignore文件本身要放到版本库里，并且可以对.gitignore做版本管理！








