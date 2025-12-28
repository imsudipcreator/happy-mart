import { Cart, User } from "@/server/db/models";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { connectDb } from "../db/init";

type RegisterUserProps = {
  name: string;
  email: string;
  password: string;
};

type AuthResult =
  | {
      success: true;
      data: {
        id: string;
        name: string;
        email: string;
        token: string;
      };
    }
  | {
      success: false;
      error:
        | "USER_EXISTS"
        | "USER_NOT_FOUND"
        | "INVALID_PASSWORD"
        | "DB_ERROR"
        | "UNKNOWN_ERROR";
      message: string;
    };

type LoginUserProps = {
  email: string;
  password: string;
};

const AuthService = {
  /**
   * Registers a new user and creates a cart for them
   * @param {{ name: string, email: string, password: string }}
   * @returns {Promise<AuthResult>}
   */
  registerUser: async function ({
    name,
    email,
    password,
  }: RegisterUserProps): Promise<AuthResult> {
    const hashedPassword = await bcrypt.hash(password, 10);
    try {
      // init a connection
      await connectDb();

      const existing = await User.findOne({ email });
      if (existing) {
        console.log("User already exists");
        return {
          success: false,
          error: "USER_EXISTS",
          message: "User already exists",
        };
      }
      // create user and save to db
      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      // generate jwt token
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
        expiresIn: "7d",
      });

      // create cart for user
      await Cart.create({
        userId: user._id,
        items: [],
      });

      return {
        success: true,
        data: {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          token,
        },
      };
    } catch (error) {
      console.error("Sign up error: ", error);
      return {
        success: false,
        error: "DB_ERROR",
        message: "Database error",
      };
    }
  },

  /**
   * Logs in an existing user and generates a jwt token for them
   * @param {{ email: string, password: string }}
   * @returns {Promise<AuthResult>}
   */
  loginUser: async function ({
    email,
    password,
  }: LoginUserProps): Promise<AuthResult> {
    // init a connection
    await connectDb();

    // check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return {
        success: false,
        error: "USER_NOT_FOUND",
        message: "User not found",
      };
    }

    // validate password
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return {
        success: false,
        error: "INVALID_PASSWORD",
        message: "Invalid password",
      };
    }

    // generate jwt token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

    return {
      success: true,
      data: {
        id: user._id.toString(),
        name: user.name,
        email: user.email,
        token,
      },
    };
  },
};

export default AuthService;
