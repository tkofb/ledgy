import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Document, MongoClient, OptionalId } from "mongodb";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const connectionURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.4rkg4.mongodb.net/`;
const client = new MongoClient(connectionURI);
const dbName = process.env.DB_NAME;

// Middleware
app.use(express.json()); // Parse JSON payloads
app.use(cors());


async function deleteAll(client: MongoClient) {
  try {
    await client.connect()

    const database = client.db(dbName);
    const collection = database.collection("register");

    await collection.deleteMany();
  } finally {
    await client.close()
  }
}

const shouldDelete = false
if(shouldDelete){deleteAll(client)}

async function insertUser(
  client: MongoClient,
  variables: OptionalId<Document>
): Promise<number> {
  try {
    await client.connect();

    const database = client.db(dbName);
    const collection = database.collection("register");

    const existingUser = await collection.findOne({ email: variables.email });

    if (existingUser) {
      return 400;
    }

    await collection.insertOne(variables);

    return 200;
  } catch (error) {
    console.error("An error occurred:", error);
    return 500;
  } finally {
    await client.close();
  }
}

async function validateLogin(
  client: MongoClient,
  variables: OptionalId<Document>
): Promise<number> {
  try {
    await client.connect();

    const database = client.db(dbName);
    const collection = database.collection("register");

    const user = await collection.findOne({ email: variables.email });

    if (user) {
      if (user.password === variables.password) {
        return 200;
      }
      return 401;
    }

    return 404;
  } catch (error) {
    console.error("An error occurred:", error);
    return 500;
  } finally {
    await client.close();
  }
}
app.post("/register", async function (req: Request, res: Response) {
  const status = await insertUser(client, req.body);
  if (status === 200) {
    res.status(status).send("Insert Complete");
  } else if (status === 400) {
    res.status(status).send("Account in Use");
  } else {
    res.status(status).send("Server Error");
  }
});

app.post("/login", async function (req: Request, res: Response) {
  const status = await validateLogin(client, req.body);
  if (status === 200) {
    res.status(status).send("Success");
  } else if (status === 401) {
    res.status(status).send("Invalid Email or Password");
  } else {
    res.status(status).send("Account Not Found");
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
