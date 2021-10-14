## A Pep Talk On Terminal

What are the perks of using the terminal:

- Speed! The terminal takes some gettting used to, but it can be MUCH faster than using a GUI (Graphics User Interface).
- Access, the terminal provides a "mainline" into the heart of a computer, giving us access to areas we normally don't interact with.
- Tools! Many of the tools we need are installed and used via the command line. We don't have much of a choice! Things like node, express, databases, servers.

## Concepts to Know

- Terminal - A text-based interface to your computer. Originally a physical object, but now we use software terminals.
- Shell - The program running on the terminal. 

Example: ATM

The ATM is the terminal, the software running on the ATM is the shell. Terminals used to be actual hardware that you connect to your computer. 

Bash and Z Shell are another popular shell its very popular on Mac. 

## Commands

The home directory is the user account directory/folder. The first command is:

### LS

Use ls to list the contents of your current directory.

```shell
~ % ls
Applications		Library			Public
Desktop			Movies			StudioProjects
Developer		Music			VirtualBox VMs
Documents		Pictures		jbr_err_pid2652.log
Downloads		Postman
```

### PWD

Print Working Directory is the path to the working directory (where you currenly are)

```shell
~ % pwd
/Users/fonysony
```

### CD

Change Directory is to change and move between folders

```shell
~ % cd Documents/
Documents % 
```

You can use the tilde (~) to go back into the home directory. 

```shell
Documents % cd ~
Users/fonysony
```

To back up into the parent directory, all you gotta do is use .. with cd to go back.

```shell
Documents % cd ..
~ %
```

### Clear

You can try clear to clear the terminal. Also, command + k is clear too.

```js
~ % clear
```



### Relative & Absolute Paths

Relative means the directory you have access to from the working directory (the current folder). I have access to the Documents directory from the home directory (~), but I can't access the Documents directory if I'm not in the home directory, the home directory is holding or is the parent of Documents directory. I'm relative to where I am, the working directory. 

```shell
~ % ls
Applications		Library			Public
Desktop			Movies			StudioProjects
Developer		Music			VirtualBox VMs
Documents		Pictures		jbr_err_pid2652.log
Downloads		Postman
```

```shell
~ % cd Desktop
Desktop % cd Documents
cd: no such file or directory: Documents
```

Absolute path is a path you cause you to move from any folder on a machine. 

```shell
Desktop % cd /Users/fonysony
~ % pwd
/Users/fonysony
```

The slash ( / ) at the start is important because it's the root directory. You can cd to the root directory from anywhere by doing this:

```shell
~ % cd /
```

```shell
~ % cd /
/ % pwd
/
/ % ls
Applications	Volumes		etc		sbin
Library		bin		home		tmp
System		cores		opt		usr
Users		dev		private		var
```

There is a lot of system directories with the root directory. 

You can use absolute path to move from anywhere even going back to parent directories.

```shell
~ % cd /Users/fonysony/Documents/dev-home/typora
typora % /Users/fonysony/Documents/dev-home
dev-home %
```

You can legit go to any directory as long as you got the path.

```shell
dev-home % pwd
/Users/fonysony/Documents/dev-home
dev-home % ../..
~ $ pwd
/Users/fonysony
```

You can keep on adding to the path as long as there is a directory to move to.

Remember that we are using the root directory (/) which startest with a slash and when we move to directories deep we use it's name and .. to move back. There is no / when moving.

```shell
~ % cd Documents/dev-home
// No slash at all when moving to Documents
Documents % cd ../../Desktop
// No slash at all when moving to parent directories
Desktop %
```

### mkdir

Make directory will create a new directory (or directories).

```shell
~ % mkdir Code
~ % ls
Applications		Downloads		Postman
Code			Library			Public
Desktop			Movies			StudioProjects
Developer		Music			VirtualBox VMs
Documents		Pictures		jbr_err_pid2652.log
```

You can make more than one directory by adding a space between each directory.

```shell
Code % mkdir Projects Games
Code % ls
Games		Projects
```

You can even make one in the parent folder or in a childs folder.

```shell
Code % mkdir Games/new
Code % cd Games/new
new % mkdir ../Frogs SugarGlider
```

This will make me a folder with the parent directory, the Games directory, and create two directories called Frogs & SugarGlider.

### Man Pages & Flags

man is short for manual, and it will give the manual of a command.

```shell
~ % man ls
```

Within the manual there are flags (-) that enable different uses for ls. 

To get out of the manual just hit the key q. 

### Touch

Use touch to create a file (or multipe).

```shell
~ % touch README.md
```

Creates a README file with the .md extension. To creat files you run it with the name of the file, multiple files sparated by spaces, and include the extension. Why is called touch, touch has more than one purpose, heres the description on touch from the terminal manual.

```shell
~ % man touch
```

  The **touch** utility sets the modification and access times of files. If any

   file does not exist, it is created with default permissions.

### rm

Remove them will delete a file or files and permanently removes them!

```shell
Code % touch app.css index.html
Code % ls
Games		Projects	app.css		index.html	new
Code % rm app.css index.html
Code % ls
Games		Projects	new
```

### rmdir

Remove Directory removes empty directory! If you try to remove a directory that is not empty you will get an error.

```shell
Code % rmdir Games
rmdir: Games: Directory not empty
```

So, this is where flag's come in. 

## rm -rf

Remove directory -rf will delete a directory (r= recursive f = force). Recursive in this context means it'll iterate through and remove everything in nested folders. Force will tell it to just remove everything without stopping and prompting us if we want to remove something.

```shell
Code % rm -rf Games
Code % ls
Projects	app.css		die.md		new		ok.md
```

