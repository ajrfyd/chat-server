import { Request, Response } from 'express';

export type routeHandlerType = {
  path: string;
  method: "get" | "post" | "options" | "delete" | "put" | "patch",
  handler: (req: Request, res: Response) => void;
};
