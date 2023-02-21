import express, { NextFunction, Request, Response } from 'express';
import path from 'path';

const app = express();
const PORT = 3000;

app.use(express.static('build/public'));

app.get('/', (_req: Request, res: Response, _next: NextFunction): void => {
  res.sendFile(path.join(__dirname, './index.html'));
});

app.get('/api', (_req: Request, res: Response, _next: NextFunction): void => {
  res.send('Hello from the backend!');
});

app.listen(PORT, (): void => {});

export default app;
