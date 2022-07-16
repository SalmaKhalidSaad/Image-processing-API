import { Request, Response, NextFunction } from 'express';
import * as sharp from 'sharp';
import * as path from 'path';
import * as fs from 'fs-extra';


export async function logger(request: Request, res: Response, next: NextFunction) :Promise<Response>{
  
  const width = Number(request.query.width as unknown as number);
  const length = Number(request.query.length as unknown as number);
  const iName=request.query.name as string;
  let flag:number=0;
 
  fs.pathExists(
    path.join(
      __dirname,
      './',
      `../../src/image/${iName}.jpg`
    ),
    (err, exists) => {
      if (exists) {
        
      } else {
        console.log(path.join(
          __dirname,
          './',
          `../../src/image/${iName}.jpg`
        ));
        return res.status(400).send("Image does not exist");

      }
    }
  );
  if (length > 0 && length < 5000 && width > 0 && width < 5000) {
    fs.pathExists(
      path.join(
        __dirname,
        './',
        `../../thubnail/image=${iName}-length=${length}-width=${width}.jpg`
      ),
      (err, exists) => {
        if (exists) {
          next();
        } else {
          resizeImage(length, width,iName).then(() => {
            next();
          });
        }
      }
    );
    return res.status(200)
  } else {
    return res.status(400).send("Image too large");
  }
  
}

export async function resizeImage(length: number, width: number,iName:string) : Promise<boolean> {
 
  let flag:boolean=false;
  try {
    
    if (length > 0 && length < 5000 && width > 0 && width < 5000) {
    const imagename = `image${iName}-length=${length}-width=${width}.jpg`;
    fs.ensureDir('thubnail', (err) => {});

    await sharp(path.join(__dirname, '../', `image/${iName}.jpg`))
      .resize({
        width: width,
        height: length,
      })
      .toFile(`thubnail/image=${iName}-length=${length}-width=${width}.jpg`);
     
   flag=true;
    }

    } catch (error) {
    console.log(error);
   flag=false;
  }
  return flag;
 
 
}

// export default logger;