### Git的学习笔记
   + 三个基本概念
      1. 工作区：就是你在电脑里能看到的目录
      2. 版本库：工作区有一个隐藏目录.git，这个不算工作区，而是Git的本地版本库,你的所有版本信息都会存在这里
      3. 暂存区：英文叫stage, 或index。一般存放在 ".git目录下" 下的index文件（.git/index）中，所以我们把暂存区有时也叫作索引（index）
   + Git的push有时候会失败？
      + 因为git的push其实是用本地仓库的commit记录去覆盖仓库的commit记录，而如果在远程仓库含有本地没有的commit的时候，push将会导致远端的commit被擦掉。这种结果当然是不可行的。因此git会在push的时候进行检查，如果出现这样的情况，push就会失败。
      + 只需要先pull 将本地仓库的提交和远程仓库的提交进行合并，然后再push
  + git origin -d 
     1. head 当前commit的引用，当前commit在哪head就在哪里，这是一个永远自动指向当前commit的引用，
  + 删除branch：git branch -d 名称
     1. HEAD 指向的 branch 不能删除。如果要删除 HEAD 指向的 branch，需要先用 checkout 把 HEAD 指向其他地方。
     2. 出于安全考虑，没有被合并到 master 过的 branch 在删除时会失败（怕误删未完成branch）把-d换成-D可以强制删除
  + git中（2.0及以后版本），git push不加参数只能上传到从远程仓库clone或者pull下来的分支，如需push在本地创建的分支则需使用git push origin 分支名的命令
  + git merge
     1. merge冲突：你的两个分支改了相同的内容，Git 不知道应该以哪个为准。如果在 merge 的时候发生了这种情况，Git 就会把问题交给你来决定。具体地，它会告诉你 merge 失败，以及失败的原因；这时候你只需要手动解决掉冲突并重新add、commit（改动不同文件或同一文件的不同行都不会产生冲突）；或者使用git merge --abort放弃解决冲突，取消merge
  + git rebase <br>
     ![rebase图片](media/rebase.jpg)
  + diff相关
      1. git diff --staged可以显示暂存区和上一条提交之间的不同。换句话说，这条指令可以让你看到「如果你立即输入 git commit，你将会提交什么」
      2. git diff可以显示工作目录和暂存区之间的不同。换句话说，这条指令可以让你看到「如果你现在把所有文件都 add，你会向暂存区中增加哪些内容」
  + 刚刚提交的代码发现写错了怎么办
      1. commit --amend
         + 修改好问题
         + 将修改add到暂存区
         + 使用git commit --amend提交修改
  + get reset : 作用是修改Head的位置，即将Head指向的位置改变为之前存在的某个版本，具体实现：
[git会退到之前版本的几种方法](https://blog.csdn.net/weixin_44781409/article/details/107560533)