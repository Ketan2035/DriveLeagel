const mongoose = require("mongoose");

const TrafficRuleSchema = new mongoose.Schema(
  {
    ruleId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    stateCode: {
      type: String,
      required: true,
      uppercase: true,
    },

    stateName: {
      type: String,
      required: true,
    },

    ruleTitle: {
      type: String,
      required: true,
      trim: true,
    },

    shortDescription: {
      type: String,
      required: true,
    },

    detailedDescription: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    subCategory: {
      type: String,
      required: true,
    },

    applicableRoadTypes: [
      {
        type: String,
      },
    ],

    severityLevel: {
      type: String,
      enum: ["Low", "Medium", "High", "Critical"],
      required: true,
    },

    legalReference: [],
    fine: {
      type: Number,
      required: true,
    },
    
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("TrafficRule", TrafficRuleSchema);