import express, { Request, Response } from 'express';
import cors from "cors"
import mongoose from "mongoose"

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json()); // Parse JSON payloads
app.use(cors())

mongoose.connect("mongodb+srv://tkofb:aHk4zf%40hWTEbuxw@cluster0.4rkg4.mongodb.net/")

// Routes
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express, OK');
});

app.post('/register', (req: Request, res: Response) => {

})

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
