import { Request, Response, NextFunction } from "express";
const { log } = console;

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  log('>-<-<-<-<-<-<-<-This is Error Handler!->->->->->->->->-<');
  res.json({
    message: `${err.name}: ${err.message}`,
  });
};

export const initResponseObj = (req: Request, res: Response, next: NextFunction) => {
  const resultState = {
    status: 200,
    message: "ok",
    result: null
  };

  req.resultState = resultState;
  
  next();
};