import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export const authentication = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authorization = req.headers.authorization;
    if (!authorization) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as {
      id: number;
      email: string;
      fullName: string;
      role: string;
      image: string;
      dob : string;
      phoneNumber : number;
      gender : string;
    };

    res.locals.user = decoded;

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({ message: `${error} Authentication` });
  }
};
