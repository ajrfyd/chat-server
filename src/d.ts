import { Request } from "express";
import { CommonResponseType } from "./types/response";

declare global {
  namespace Express {
    interface Request {
      resultState: CommonResponseType<T>;
    }

  }
};

declare module "socket.io" {
  namespace io {
    interface socket {
      abc: string; 
    }
  }
};

interface T {};