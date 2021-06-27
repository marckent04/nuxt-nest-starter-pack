import express from 'express';

import { AppMiddleware } from './main';

const app = require("express")();

app.use((req: express.Request, res: express.Response, next: express.NextFunction) => {
    const nest = new AppMiddleware(app).use(req, res, next);
    nest
        .then(() => {
            next();
        })
        .catch((err) => {
            console.log(JSON.stringify(err));
            next();
        });
});

export default {
    path: '/api',
    handler: app,
};
