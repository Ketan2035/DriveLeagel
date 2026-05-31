import trafficRules from "../models/trafficRuleSchema.js";

export const getTrafficRules = async (req, res) => {
  try {
    const { state } = req.body;

    const rules = await trafficRules.findBy({stateName: state});
    console.log(rules);
    res.status(200).json(rules);
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
    console.log()
  }};