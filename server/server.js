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
    console.log(state);
    const rules = await trafficRules.find(state);
    console.log(rules);
    res.status(200).json(rules);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log(error);
  }});

 app.post("/vehicle",async(req,res)=>{
  try{
    const vehicle=req.body;
    console.log(vehicle)
    const result= await VehicleDetails.find(vehicle);
    console.log(result);
    res.status(200).json(result);
  }
  catch(error){
    console.log(error)
  }
 });


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});



