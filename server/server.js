import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/trafficRules.route.js";
import trafficRules from "./models/trafficRuleSchema.js";
import VehicleDetails from './models/vehicleSchema.js'
import connectDb from "./config/db.js";
dotenv.config();
const app = express();


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

app.get("/",(req,res)=>{
   res.status(200).json({mess:"successfull"})
})

app.post("/trafficRules",async (req, res) => {
  try {
    const  state  = req.body;
    const rules = await trafficRules.find(state);
    res.status(200).json(rules);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }});

 app.post("/vehicle",async(req,res)=>{
  try{
    const vehicle=req.body;
    const result= await VehicleDetails.find(vehicle);
    res.status(200).json(result);
  }
  catch(error){
    res.status(400).json({message:"error"});
  }
 });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



