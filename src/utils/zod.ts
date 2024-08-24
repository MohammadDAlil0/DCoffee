import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from 'zod';

const validate =
  (schema: AnyZodObject) =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      const parsaedData = schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      if (parsaedData.body)
        req.body = parsaedData.body;
      return next();
    } catch (e: any) {
      return next(e);
    }
  };

export default validate;