import { Request, Response, NextFunction } from "express";
const { log } = console;

export const errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
  log('>-<-<-<-<-<-<-<-This is Error Handler!->->->->->->->->-<');
  res.json({
    message: `${err.name}: ${err.message}`,
  });
};