import { RequestHandler, Request, Response, NextFunction } from 'express';

const asyncHandler = (requestHandler: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(requestHandler(req, res, next)).catch((err) => next(new Error("Error at req handler",err)));
    };
};

export {asyncHandler}