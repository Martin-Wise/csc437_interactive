import express, { Request, Response } from "express";
import dotenv from "dotenv";
import path from "path";
import { MongoClient, Db, ObjectId } from "mongodb";
import { ValidRoutes } from "./shared/ValidRoutes";
import { registerAuthRoutes } from "./routes/authRoutes";
import { verifyAuthToken } from "./verifyToken";

// Load env variables
dotenv.config();
const PORT = process.env.PORT || 3000;
const STATIC_DIR = process.env.STATIC_DIR || "public";
const MONGODB_URL = process.env.MONGODB_URL || "";
const DB_NAME = process.env.DB_NAME || "GroceryApp";

const mongoClient = new MongoClient(MONGODB_URL);
let db: Db;

const app = express();
app.use(express.json());
app.use(express.static(STATIC_DIR));
app.locals.JWT_SECRET = process.env.JWT_SECRET;

async function startServer() {
  try {
    await mongoClient.connect();
    db = mongoClient.db(DB_NAME);
    console.log("Connected to MongoDB");

    app.get("/api/hello", (req: Request, res: Response) => {
      res.send("Hello, World");
    });

    // Public Routes
    registerAuthRoutes(app); // Handles login/register and returns JWT

    // Protected Routes
    app.use("/api/items", verifyAuthToken);
    app.use("/api/recipes", verifyAuthToken);

    app.get("/api/items", async (req: Request, res: Response) => {
      try {
        const userId = (req as any).user?.username;
        if (!userId) {
          console.log("userID, " + userId);
          res.status(401).json({ error: "User not authenticated" });
          return
        }

        const items = await db.collection("groceryItems").find({ userId }).toArray();
        res.json(items);
      } catch (err) {
        console.error("Error fetching items:", err);
        res.status(500).json({ error: "Failed to fetch items" });
      }
    });

    app.post("/api/items", async (req: Request, res: Response) => {
      try {
        const userId = (req as any).user?.username;
        if (!userId) {
          res.status(401).json({ error: "User not authenticated" });
          return
        }

        const newItem = { ...req.body, userId };
        const result = await db.collection("groceryItems").insertOne(newItem);
        res.status(201).json({ ...newItem, _id: result.insertedId });
      } catch (err) {
        console.error("Failed to insert item:", err);
        res.status(500).json({ error: "Failed to add item" });
      }
    });

    app.delete("/api/items/:id", async (req: Request, res: Response) => {
        try {
          const userId = req.user?.username;
          const itemId = req.params.id;
      
          if (!userId || !itemId) {
            res.status(400).json({ error: "Missing userId or itemId" });
            return
        }
      
          const result = await db.collection("groceryItems").deleteOne({
            _id: itemId as any,
            userId,
          });
      
          if (result.deletedCount === 0) {
            res.status(404).json({ error: "Item not found" });
            return;
            }
      
          res.status(204).send(); // No content
        } catch (err) {
          console.error("Delete failed:", err);
          res.status(500).json({ error: "Failed to delete item" });
        }
    });

    app.get("/api/recipes", async (req: Request, res: Response) => {
        try {
          const userId = (req as any).user?.username;
          if (!userId) {
            console.log(userId);
            res.status(401).json({ error: "Unauthorized" });
            return
            }
      
          const recipes = await db.collection("recipes").find({ userId }).toArray();
          res.json(recipes);
        } catch (err) {
          console.error("Error fetching recipes:", err);
          res.status(500).json({ error: "Server error" });
        }
    });

    app.post("/api/recipes", async (req: Request, res: Response) => {
        try {
          const userId = req.user?.username;
          if (!userId) {
            res.status(401).json({ error: "Unauthorized" });
            return;
            }
          const recipeWithUser = { ...req.body, userId };
          const result = await db.collection("recipes").insertOne(recipeWithUser);
          res.status(201).json({ ...recipeWithUser, _id: result.insertedId});
        } catch (err) {
          console.error("Failed to save recipe:", err);
          res.status(500).json({ error: "Failed to save recipe" });
        }
    });

    app.delete("/api/recipes/:id", async (req: Request, res: Response) => {
        try {
          const userId = req.user?.username;
          const itemId = req.params.id;
      
          if (!userId || !itemId) {
            res.status(400).json({ error: "Missing userId or itemId" });
            return
        }
      
          const result = await db.collection("recipes").deleteOne({
            _id: itemId as any,
            userId,
          });
      
          if (result.deletedCount === 0) {
            res.status(404).json({ error: "Recipe not found" });
            return;
            }
      
          res.status(204).send(); // No content
        } catch (err) {
          console.error("Delete failed:", err);
          res.status(500).json({ error: "Failed to delete recipe" });
        }
    });  

    // Fallback to frontend for valid routes
    app.get(Object.values(ValidRoutes), (req: Request, res: Response) => {
      res.sendFile(path.resolve(STATIC_DIR, "index.html"));
    });

    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error("MongoDB connection error:", err);
    process.exit(1);
  }
}

startServer();
