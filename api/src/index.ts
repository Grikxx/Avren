import { prisma } from "./lib/prisma";
import express, { type Request, type Response, type NextFunction} from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
function chill(req: Request ,res: Response ,  next: NextFunction)  {
console.log("Chill middleware called");
next();
};

app.use(chill);
app.use(cors());
app.use(express.json());

app.post('/users', async (req, res) => {
  try {
    // Extract email and username from the parsed request body
    const { email, username } = req.body;

    // Execute the database insertion
    const newUser = await prisma.user.create({
      data: {
        email,
        username,
      },
    });

    // Respond with the newly created user and a 201 Created status
    res.status(201).json(newUser);

  } catch (error) {
    // Catch errors (like trying to create a user with an email that already exists)
    console.error("Database Error:", error);
    res.status(400).json({ error: "Failed to create user. Email may already exist." });
  }
});

app.listen(PORT, () => {
  console.log(`API listening on port http://localhost:${PORT}`);
  
});

