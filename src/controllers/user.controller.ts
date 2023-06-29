import { NextFunction, Request, Response } from 'express'

export const getMeHandler = async (
  req: Request,
  res: Response,
  next: NextFunction ) => {
    try {
        const user = res.locals.use
        res.status(200).status(200).json({
            status: 'success',
            data: {
                user
            }
        })
    } catch (error: any) {
        next(error)
        }
    }