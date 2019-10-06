# MEAN-Blog
Fullstack blog project made entirely with Typescript

to use shared library you will need to creat a symlink in the global folder using npm-link.  
to do that follow the steps:
1. navigate to shared folder.
2. type in the commandline: ```npm link```
3. navigate to front-end/back-end folder and type: ``` npm link shared ```
4. now you can import it in the project: ``` import {} from "shared" ```


Serving angular application and running node app in a different port will cause a problem.
You can solve this by either using cors middleware to allow Cross-origin resource sharing or 
by building the angular application which will compile to the dist folder in backend project as static files to be served by the server.
