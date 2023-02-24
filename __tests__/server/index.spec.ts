import request from 'supertest';
import * as cheerio from 'cheerio';
import { app, server } from '../../src/server';

describe('server', () => {
  afterAll(() => {
    server.close();
  });

  it('serves the index.html file', async () => {
    const response = await request(app).get('/');
    expect(response.status).toEqual(200);

    const $ = cheerio.load(response.text);
    expect($('title').text()).toEqual('React Visualizer');
  });

  it(`responds with 'Hello from the backend!'`, async () => {
    const response = await request(app).get('/api');

    expect(response.status).toEqual(200);
    expect(response.text).toEqual('Hello from the backend!');
  });
});
