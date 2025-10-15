import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../libs/prisma";
import { LoginDTO, RegisterDTO } from "../dto/authDTO";


export const login = async (data: LoginDTO) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!user) {
      throw new Error("Email or password is incorrect");
    }

    const isValidPassword = await bcrypt.compare(data.password, user.password);

    if (!isValidPassword) {
      throw new Error("Email or password is incorrect");
    }

    const token = jwt.sign(
      {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1d",
      }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        role: user.role,
      },
    };
  } catch (error) {
    console.log("Login Error ", error);
    if (error instanceof Error && error.message) {
      throw error;
    }
    throw new Error("Internal server error");
  }
};

export const register = async (data: RegisterDTO) => {
  try {
    const existedUser = await prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existedUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);

    const user = await prisma.user.create({
      data: {
        name: data.name,
        email: data.email,
        password: hashedPassword,
        role: data.role,
      },
    });

    return user;
  } catch (error) {
    console.error("Register Error:", error);
    if (error instanceof Error && error.message) {
      throw error;
    }
   
  }
};