import express, { NextFunction, Request, Response } from 'express';
import path from 'path';
import http from 'http';

const app: express.Application = express();
const PORT = 3000;

app.use(express.static('build/public'));

app.get('/', (_req: Request, res: Response, _next: NextFunction): void => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/api', (_req: Request, res: Response, _next: NextFunction): void => {
  res.send('Hello from the backend!');
});

const server: http.Server = app.listen(PORT);

export { app, server };
