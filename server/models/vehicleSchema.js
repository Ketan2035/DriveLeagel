import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema(
  {
    vehicle_owner: {
      type: String,
      required: true,
    },
    vehicleId: {
      type: String,
      required: true,
      unique: true,
    },

    registrationNumber: {
      type: String,
      required: true,
      unique: true,
      uppercase: true,
      trim: true,
    },

    stateCode: {
      type: String,
      required: true,
    },

    stateName: {
      type: String,
      required: true,
    },

    districtName: String,

    rtoCode: {
      type: String,
    },

    rtoName: String,

    chassisNumber: {
      type: String,
      required: true,
      unique: true,
    },

    engineNumber: {
      type: String,
      required: true,
      unique: true,
    },

    vehicleCategory: {
      type: String,
      enum: ["Private", "Commercial", "Government", "Transport"],
    },

    vehicleType: {
      type: String,
      required: true,
    },

    vehicleSubType: String,

    manufacturer: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      required: true,
    },

    fuelType: {
      type: String,
      enum: ["Petrol", "Diesel", "CNG", "LPG", "Electric", "Hybrid"],
      required: true,
    },

    emissionNorms: String,

    color: String,

    bodyType: String,

    seatingCapacity: Number,

    sleeperCapacity: Number,

    wheelBase: Number,

    cubicCapacity: Number,

    grossVehicleWeight: Number,

    unladenWeight: Number,

    manufactureMonth: Number,

    manufactureYear: Number,

    registrationDate: Date,

    registrationValidity: Date,

    firstRegistrationDate: Date,

    registrationStatus: {
      type: String,
      enum: ["Active", "Suspended", "Expired", "Cancelled"],
      default: "Active",
    },

    ownershipType: {
      type: String,
      enum: ["Individual", "Company", "Government", "Organization"],
      default: "Individual",
    },

    fastagLinked: {
      type: Boolean,
      default: false,
    },

    blacklistedVehicleFlag: {
      type: Boolean,
      default: false,
    },

    complianceStatus: {
      type: String,
      enum: ["GREEN", "YELLOW", "ORANGE", "RED"],
      default: "GREEN",
    },
    challans: [
      { challanId: String, date: Date, amount: Number, status: String },
    ],
    documents: [
      {
        documentType: String,
        documentNumber: String,
        issueDate: Date,
        expiryDate: Date,
        status: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

const VehicleDetail = mongoose.model("VehicleDetail", vehicleSchema);

export default VehicleDetail;
