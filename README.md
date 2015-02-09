# mobilemines

Requirements:
-Node/npm

**Prerequisites**

1: If not already installed, install Node. This includes Node Package Manager http://nodejs.org/download/.
You can verify the installation succeeded if you are able to type the command "npm" in the command line without getting an error

2: Install bower
```
npm install -g bower
``` 
The -g will allow you to use bower everywhere and not just the folder the command was executed in

3: Install grunt-cli 
```
npm install -g grunt-cli
``` 

**Installation Instructions**
Since there is no local server-side component, this application can be hosted on a Node server or any other web server you would like (apache, IIS)
Node is required for installing bower. 

1: Clone the repo
```
git clone https://github.com/mtotho/mobilemines.git
```

2: From within the command line, browse to the mobilemines directory.

3: install node modules
```
npm install 
``` 

4: install bower components
```
bower install
``` 

5a: If you are using Node as your web server, in order to start the server type
```
grunt serve
``` 

5b: If you are using a non- Node web server, simply point the point the root of your www directory to the /app folder in the project

