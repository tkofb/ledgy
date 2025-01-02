import express, { Request, Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;
const connectionURI = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.4rkg4.mongodb.net/`;
const client = new MongoClient(connectionURI);
const dbName = process.env.DB_NAME

// Middleware
app.use(express.json()); // Parse JSON payloads
app.use(cors());

async function insertUser(client:MongoClient) {
  try {
    // Connect the client to the server
    await client.connect();
    // Establish and verify connection
    const database = client.db(dbName);
    const collection = database.collection("register");
    const result = await collection.find({}).toArray();

    console.log(result)
    console.log("Connected successfully to server");
  } catch (error) {
    // Handle the error
    console.error("An error occurred:", error);
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
// Routes
app.get("/", (req: Request, res: Response) => {
  res.send(connectionURI);
});

app.post("/register", (req: Request, res: Response) => {

});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
