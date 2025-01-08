import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import rateLimit from "express-rate-limit";
import jwt from "jsonwebtoken";

import { Document, MongoClient, OptionalId } from "mongodb";
import { body, validationResult } from "express-validator";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const connectionURI = `mongodb+srv://${process.env.DB_ACCOUNTS_USERNAME}:${process.env.DB_ACCOUNTS_PASSWORD}@cluster0.4rkg4.mongodb.net/?ssl=true`;
const client = new MongoClient(connectionURI);
const dbName = process.env.DB_NAME;

// Middleware
app.use(express.json()); // Parse JSON payloads
const corsOptions = {
  origin: 'http://localhost:5173',  // Restrict to trusted domains
  methods: ['GET', 'POST'],                  // Restrict allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'],  // Limit headers
};
app.use(cors(corsOptions));

async function deleteAll(client: MongoClient) {
  try {
    await client.connect();

    const database = client.db(dbName);
    const collection = database.collection("register");

    await collection.deleteMany();
  } finally {
    await client.close();
  }
}

const shouldDelete = false;
if (shouldDelete) {
  deleteAll(client);
}

async function insertUser(
  client: MongoClient,
  variables: OptionalId<Document>
): Promise<number> {
  try {
    await client.connect();

    const database = client.db(dbName);
    const collection = database.collection("register");
    const { password, email, username} = variables;

    const existingUser = await collection.findOne({ email});
    const hashedPassword = await bcrypt.hash(password, 10); // 10 rounds of salting


    if (existingUser) {
      return 400;
    }

    await collection.insertOne({email, username, hashedPassword});

    return 200;
  } catch (error) {
    console.error("An error occurred:", error);
    return 500;
  } finally {
    await client.close();
  }
}

// Rate limiting for login attempts
const registerLimit = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit to 5 login attempts per IP
  message: "Too many login attempts. Please try again later.",
  keyGenerator: (req) => req.body.email || req.ip, // Identify user by email or IP address
});

app.post(
  "/register",
  [
    body("email").isEmail().normalizeEmail(),
    body("password")
      .isLength({ min: 8 }) // Enforce a minimum length of 8
      .matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{8,}$/) // Updated regex
      .withMessage(
        "Password must be at least 8 characters long, include an uppercase letter, a number, a special character, and contain no spaces."
      ),
    body("username").isAlphanumeric().trim().escape(),
  ], registerLimit,
  async function (req: Request, res: Response) {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const status = await insertUser(client, req.body);

    if (status === 200) {
      res.status(status).send("Insert Complete");
    } else if (status === 400) {
      res.status(status).send("Account in Use");
    } else {
      res.status(status).send("Server Error");
    }
  }
);

// Rate limiting for login attempts
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit to 5 login attempts per IP
  message: "Too many login attempts. Please try again later.",
  keyGenerator: (req) => req.body.email || req.ip, // Identify user by email or IP address
});

// Login Route
app.post(
  "/login",
  [
    body("email").isEmail().normalizeEmail(),
    body("password").notEmpty().withMessage("Password is required."),
  ], loginLimiter,
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      await client.connect();
      const database = client.db(dbName);
      const collection = database.collection("register");

      const user = await collection.findOne({ email });
      if (!user) {
        res.status(404).send("Account not found.");
      } else {
        const isPasswordValid = await bcrypt.compare(password, user.hashedPassword);
        if (!isPasswordValid) {
          res.status(401).send("Invalid email or password.");
        }

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET!, {
          expiresIn: process.env.JWT_EXPIRATION || "1h",
        });

        res.status(200).json({ message: "Login successful", token });
      }
    } catch (error) {
      console.error("An error occurred:", error);
      res.status(500).send("Server error");
    } finally {
      await client.close();
    }
  }
);

// app.post("/login", loginLimiter, async function (req: Request, res: Response) {
//   const status = await validateLogin(client, req.body);
//   if (status === 200) {
//     res.status(status).send("Success");
//   } else if (status === 401) {
//     res.status(status).send("Invalid Email or Password");
//   } else {
//     res.status(status).send("Account Not Found");
//   }
// });

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
