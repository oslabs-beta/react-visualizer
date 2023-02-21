import { describe, expect, it, beforeAll, afterAll } from '@jest/globals';
import request, { Response } from 'supertest';
import * as cheerio from 'cheerio';
import { Server } from 'http';
import app from '../../src/server/index';

describe('server', () => {
  let server: Server;

  beforeAll(() => {
    server = app.listen(3000);
  });

  afterAll((done) => {
    server.close(done);
  });

  it('serves the index.html file', async () => {
    const response: Response = await request(app).get('/');
    expect(response.status).toEqual(200);

    const $ = cheerio.load(response.text);
    expect($('title').text()).toEqual('React Visualizer');
  });

  it('serves the API', async () => {
    const response: Response = await request(app).get('/api');

    expect(response.status).toEqual(200);
    expect(response.text).toEqual('Hello from the backend!');
  });
});
