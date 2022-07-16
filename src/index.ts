import * as express from 'express';
import { logger} from './middleware/mw';
import * as path from 'path';
import * as fs from 'fs';
const app = express();
const port:number = 3000;
app.listen(port, ():void => {
  console.log(`server started at http://localhost:${port}`);
});
app.get('/image', logger, (req:express.Request, res:express.Response):void => {
 
 try{

    if ( Number(req.query.length as unknown as number) > 0
     && Number(req.query.length as unknown as number) < 5000 
     && Number(req.query.width as unknown as number) > 0 
     && Number(req.query.width as unknown as number) < 5000){
    let img = fs.readFileSync(
      path.join(
        __dirname,
        './',
        `../thubnail/image=${req.query.name}-length=${req.query.length}-width=${req.query.width}.jpg`
      )
    );
    res.writeHead(200, { 'Content-Type': 'image/jpg' });
    res.end(img, 'binary');
     
      }
    else{
     res.sendStatus(400)
    }
        
}
catch (error) {
   res.sendStatus(400)
}
});


export default app;