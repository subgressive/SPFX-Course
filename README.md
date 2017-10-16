## SPFx Course

Andrew McConnell's SPFx Course Repo

### DEV environment

1. install node LTS
2. install npm
3. npm install -g --production windows-build-tools
4. install gulp -g
5. gulp --tasks ( shows all gulp commands available )
6. npm list -g --depth=0

### Update yeoman generator

npm install @microsoft/generator-sharepoint@latest -g

### Create Webparts from cmd line

1. Cmder, cd c:\github\course , mkdir <name> , cd <name>
2. yo @microsoft/sharepoint --skip-install
3. code .        ( can start editing src )
4. npm install   ( installs all modules ) 

### GitHub Commands

1. Create new repo in Github in Browser, open Cmder and cd <project folder>, if new project , git init
2. git add . ( stages changes )
3. git commit -m "First commit"
4. git remote add origin https://github.com/subgressive/SPFX-Course.git ( URL copied from browser )
5. git remote -v    ( verifies the new remote URL )
6. git push origin master

### Building the code

```bash
git clone the repo
npm i
npm i -g gulp
gulp
```

This package produces the following:

* lib/* - intermediate-stage commonjs build artifacts
* dist/* - the bundled script, along with other resources
* deploy/* - all resources which should be uploaded to a CDN.

### gulp options

gulp --tasks
gulp trust-dev-cert
gulp clean
gulp test
gulp serve

### gulp build options

gulp bundle
gulp package-solution

