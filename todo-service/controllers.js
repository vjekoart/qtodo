const express = require('express');

class Controllers {
    constructor(dataService) {
        // Set empty and default properties
        this.tag = '[controllers]';
        this.dataService = null;
        this.defaultOffset = 0;
        this.defaultLimit = 5;

        if (!dataService)
            throw `${ this.tag } missing instance of DataService in constructor`;

        this.dataService = dataService;
    }

    logRequest(request, response, next) {
        console.log(this.tag, new Date().toISOString(), request.url);
        next();
    }

    /**
     * Auxiliary function to standardize response format.
     *
     * @param response {express-response}
     * @param statusCode {number}         HTTP status code.
     * @param data {object}               Data which should be placed in the response object.
     */
    sendResponse(response, statusCode, data) {
        const responseJson = Object.assign({
            status: statusCode === 200 ? 'ok' : 'error'
        }, data);

        console[statusCode === 200 ? 'log' : 'error'](this.tag, 'Response', responseJson);

        response.status(statusCode).json(responseJson);
    }

    async getOne(request, response) {
        const id = request.params.id;

        console.log(this.tag, 'getOne: id =', id);

        if (!id) {
            const message = 'id is not provided';
            this.sendResponse(response, 400, { message });
            return;
        }

        try {
            const data = await this.dataService.getOne(id);
            this.sendResponse(response, 200, { data });
        } catch (error) {
            const message = 'cannot retrieve todo item';
            this.sendResponse(response, 404, { message, error });
        }
    }

    async getAll(request, response) {
        let offset = parseInt(request.query.offset, 10);
        let limit = parseInt(request.query.limit, 10);
        const sortKey = request.query.sortKey;
        const sortDir = request.query.sortDir;
        const search = request.query.search;

        console.log(this.tag, `getAll: offset = ${ offset }; limit = ${ limit }; sortKey = ${ sortKey }; sortDir = ${ sortDir }; search = ${ search }`);

        if (isNaN(offset)) {
            console.log(this.tag, 'getAll: ignoring invalid offset');
            offset = this.defaultOffset;
        }

        if (isNaN(limit)) {
            console.log(this.tag, 'getAll: ignoring invalid limit');
            limit = this.defaultLimit;
        }

        try {
            const data = await this.dataService.getAll(offset, limit, sortKey, sortDir, search);
            this.sendResponse(response, 200, {
                totalCount: data.totalCount,
                data: data.data
            });
        } catch (error) {
            const message = 'cannot retrieve all todo items';
            this.sendResponse(response, 500, { message, error });
        }
    }

    async createTodo(request, response) {
        const body = request.body;

        console.log(this.tag, `createTodo: body = ${ JSON.stringify(body) }`);

        if (!body) {
            const message = 'body is not provided';
            this.sendResponse(response, 400, { message });
            return;
        }

        try {
            const data = await this.dataService.createTodo(body);
            this.sendResponse(response, 200, { data });
        } catch (error) {
            const message = 'todo cannot be created';
            this.sendResponse(response, 500, { message, error });
        }
    }

    async updateTodo(request, response) {
        const id = request.params.id;
        const body = request.body;

        console.log(this.tag, `updateTodo: id = ${ id }; body = ${ JSON.stringify(body) }`);

        if (!id) {
            const message = 'id is not provided';
            this.sendResponse(response, 400, { message });
            return;
        }

        if (!body) {
            const message = 'body is not provided';
            this.sendResponse(response, 400, { message });
            return;
        }

        try {
            const data = await this.dataService.updateTodo(id, body);
            this.sendResponse(response, 200, { data });
        } catch (error) {
            const message = 'todo cannot be updated';
            this.sendResponse(response, 500, { message, error });
        }
    }

    async deleteTodo(request, response) {
        const id = request.query.id;

        console.log(this.tag, 'deleteTodo: id =', id);

        if (!id) {
            const message = 'id is not provided';
            this.sendResponse(response, 400, { message });
            return;
        }

        try {
            const data = await this.dataService.deleteTodo(id.split(','));
            this.sendResponse(response, 200, { data });
        } catch (error) {
            const message = 'todo cannot be deleted';
            this.sendResponse(response, 500, { message, error });
        }
    }

    getRouter() {
        const router = express.Router();

        router.use(this.logRequest.bind(this));

        router.get('/:id', this.getOne.bind(this));
        router.get('/', this.getAll.bind(this));

        router.post('/', this.createTodo.bind(this));
        router.put('/:id', this.updateTodo.bind(this));
        router.delete('/', this.deleteTodo.bind(this));

        return router;
    }
}

module.exports = Controllers;
