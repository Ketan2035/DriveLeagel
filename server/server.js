import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/trafficRules.route.js";
import trafficRules from "./models/trafficRuleSchema.js";
import VehicleDetails from "./models/vehicleSchema.js";
import connectDb from "./config/db.js";
import path from "path";
import OpenAI from "openai";

import { fileURLToPath } from "url";
dotenv.config();
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(
  cors({
    origin: true,
    credentials: true,
  }),
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
//connect db
connectDb();

app.get("/", (req, res) => {
  res.status(200).json({ mess: "successfull" });
});

app.post("/trafficRules", async (req, res) => {
  try {
    const state = req.body;
    const rules = await trafficRules.find(state);
    res.status(200).json(rules);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
});

app.post("/vehicle", async (req, res) => {
  try {
    const vehicle = req.body;
    const result = await VehicleDetails.find(vehicle);
    res.status(200).json(result);
  } catch (error) {
    res.status(400).json({ message: "error" });
  }
});

app.get("/pdf", (req, res) => {
  const filepath = path.join(__dirname, "./act.pdf");
  res.download(filepath, "trafficRules.pdf");
});

const client = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});

app.post("/chat", async (req, res) => {
  try {
    const { message } = req.body;
    // console.log(client);
    const completion = await client.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: `
                  You are an AI assistant specialized in traffic rules, road safety, driving regulations, traffic signs, driving licenses, vehicle documents, and road laws.

                  Rules:
                  1. Answer only questions related to traffic rules and road safety.
                  2. If the question is not related to traffic rules, politely respond according to the context 
                    
                  3. Do not answer programming, mathematics, history, politics, entertainment, or other unrelated questions.
                  4. Keep answers concise and accurate.
                  
                  `,
        },
        {
          role: "user",
          content: message,
        },
      ],
    });

    res.json({
      reply: completion.choices[0].message.content,
    });
  } catch (error) {
    console.error("Groq Error:", error);

    res.status(500).json({
      error: error.message,
      details: error.response?.data,
    });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
