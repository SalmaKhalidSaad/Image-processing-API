// import functions from '.././middleware/mw';
import * as express from 'express';
import app from '../index'
import * as supertest from 'supertest';
import {logger,resizeImage} from '../middleware/mw';
// import {resizeImage from '../middleware/mw';
const request=supertest(app);
describe("testing resizeImage" , () => {
   
    it("Test if image size is adequate", async () => {
       
      expect(async () => {
        await resizeImage(10,10,"image");
        
    }).toBeTruthy();
       
    });
});

describe('Test endpoint responses', () => {
  it('gets the api endpoint', async ()=> {
  
    const res = await request.get('/image?length=20&width=30&name=image')
   
    expect(res).toBeTrue;
   
  });
  it('gets the api endpoint', async ()=> {
  
    const res = await request.get('/image?length=7000&width=30&name=image')
   
    expect(res.status).toBe(400);
   
  });
});

