# QTodo

Simple todo list application. Web client is created using Angular 8 + Angular Material, while backend service is created using Express.js and MongoDB.


## Usage

Firstly, make sure the following software versions are installed:

- MongoDB, v4.2.1
- Node.js, v12.13.0
- NPM, v6.12.0
- Angular, v8.3.17

Secondly, run backend service:
```
# Make sure that todo-service is the active directory
cd qtodo/todo-service

# Make sure that dependencies are installed
npm install

# Make sure that MongoDB is running (Ubuntu)
sudo service mongod start

# Run backend service on default port (3000)
npm start

# Run backend service on different port
PORT=3200 npm start

# It is possible to specify different MongoDB host, port and database name
MONGO_HOST=localhost MONGO_PORT=27017 MONGO_DATA=qtodo npm start
```

Finally, run web client (with Angular CLI):
```
# Make sure that todo-service is the active directory
cd qtodo/todo-client

# Make sure that dependencies are installed
npm install

# Start client on default port with default configuration
ng serve

# Start client on different port with default configuration
ng serve --port 4300

# To change default location of the backend service, modify `src/assets/configuration.json` file and reload the browser application.
# In case of production build, modify `dist/assets/configuration.json` file and reload the browser application.
```


## Roadmap

List of tasks for planning and development of todo list app.

Total time: 11h

1. **Planning, 00:30**
    * Development of client application
    * Development of backend service
    * Integration of client application with backend service
2. **Development of client application, 06:00**
    * Create boilerplate application with Angular CLI
    * Create _DataService_ class with the `TodoModel` interface and following methods:
        * `getOne(id: Number)`
        * `getAll(offset?: Number, limit?: Number, sort?: string, sortDir?: string, search?: string)`
        * `createTodo(data: TodoModel)`
        * `updateTodo(id: Number, data: TodoModel)`
        * `deleteTodo(id: Number[])`
    * Create _Homepage_ view
    * Create _DetailedPage_ view
    * Create _EditModal_ component
    * Create _CreateModal_ component
    * Create _DeleteModal_ component
    * Create _NotificationService_ class with the following methods:
        * `showSuccess(message: string)`
        * `showError(message: string)`
3. **Development of backend service, 03:00**
    * Initialize `package.json` and add dependencies
    * Create `index.js` file with the initialization, API routes and server functionalities
    * Create `data-service.js` file with _DataService_ class which has the following methods:
        * `constructor(configuration)`, create connection which is going to be used by all the class methods
        * `getOne(id: Number)`
        * `getAll(offset?: Number, limit?: Number, sort?: string, sortDir?: string, search?: string)`
        * `createTodo(data: TodoModel)`
        * `updateTodo(id: Number, data: TodoModel)`
        * `deleteTodo(id: Number[])`
    * Create `controllers.js` file which will contain controllers for each route:
        * `constructor(configuration, dataService)`
        * `getOne(request, response)`
        * `getAll(request, response)`
        * `createTodo(request, response)`
        * `updateTodo(request, response)`
        * `deleteTodo(request, response)`
4. **Integration of client application with backend service, 01:30**
    * Create `configuration.json` in Angular application which is loaded during the application bootstrap
    * Create _ApiService_ in Angular application which is going to be used by _DataService_
    * Remove hardcoded data from _DataService_ methods and replace them with API calls
    * Show notification at the startup of Angular application if backend service is not available
    * Code clean up, comments and similar