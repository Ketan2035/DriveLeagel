import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

export default function VehicleDetails() {
  const location = useLocation();
  const vehicleId = location.state?.vehicleId;
  console.log(vehicleId);
  const [vehicle, setVehicle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchVehicle();
  }, [vehicleId]);

  const fetchVehicle = async () => {
    try {
      const res = await axios.post("http://localhost:5000/vehicle", {
        vehicleId,
      });
      console.log(res.data);
      // If backend uses findOne()
      setVehicle(res.data[0]);

      // If backend uses find()
      // setVehicle(res.data[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status?.toUpperCase()) {
      case "GREEN":
        return "bg-green-500 border-3-8 border-green-500";
      case "YELLOW":
        return "bg-yellow-500 border-l-8 border-yellow-500";
      case "ORANGE":
        return "bg-orange-500 ";
      case "RED":
        return "bg-red-500 border-l-8 border-red-500";
      default:
        return "bg-white";
    }
  };

  if (loading) {
    return <h1 className="p-10">Loading...</h1>;
  }

  if (!vehicle) {
    return <h1 className="p-10">Vehicle Not Found</h1>;
  }

  const insurance =
    vehicle.documents?.find((doc) => doc.documentType === "Insurance") || {};

  return (
    <div className="min-h-screen pt-10 bg-slate-100">
      {/* Header */}
      <div className="bg-blue-900 text-white py-10">
        <div className="max-w-7xl mx-auto px-6">
          <h1 className="text-4xl font-bold">Vehicle Compliance Dashboard</h1>
          <p className="text-blue-200 mt-2">
            Registration Number: {vehicle.registrationNumber}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6">
        {/* Vehicle Overview */}
        <div className="bg-white rounded-3xl shadow p-6">
          <div className="flex flex-col md:flex-row justify-between items-start">
            <div>
              <h2 className="text-3xl font-bold">
                {vehicle.registrationNumber}
              </h2>

              <p className="text-gray-600 mt-1">
                Vehicle ID: {vehicle.vehicleId}
              </p>

              <p className="text-gray-600">Owner: {vehicle.vehicle_owner}</p>

              <p className="text-gray-600">
                Vehicle: {vehicle.manufacturer} {vehicle.model}
              </p>

              <p className="text-gray-600">
                Type: {vehicle.vehicleType} • Fuel: {vehicle.fuelType}
              </p>

              <p className="text-gray-600">
                RTO: {vehicle.rtoName}, {vehicle.stateName}
              </p>
            </div>

            <div
              className={`px-5 py-2 rounded-full font-semibold mt-4 md:mt-0 ${getStatusColor(
                vehicle.complianceStatus,
              )}`}
            >
              {vehicle.complianceStatus} COMPLIANCE
            </div>
          </div>

          {/* Status Message */}
          <div className="mt-6 border-t pt-4">
            <h4 className="font-semibold text-lg">Compliance Summary</h4>

            {vehicle.complianceStatus === "GREEN" && (
              <p className="text-green-700 mt-2">
                ✓ This vehicle is fully compliant. All major vehicle records
                appear valid. Continue renewing documents before expiry and
                follow traffic regulations.
              </p>
            )}

            {vehicle.complianceStatus === "YELLOW" && (
              <p className="text-yellow-700 mt-2">
                ⚠ This vehicle requires attention. Some documents, challans, or
                compliance requirements may need review. Check the sections
                below and resolve pending issues.
              </p>
            )}

            {vehicle.complianceStatus === "ORANGE" && (
              <p className="text-orange-700 mt-2">
                ⚠ Significant compliance issues detected. Review challans,
                insurance, registration validity, and document status
                immediately to avoid penalties.
              </p>
            )}

            {vehicle.complianceStatus === "RED" && (
              <p className="text-red-700 mt-2">
                🚫 Critical compliance issues detected. Immediate action is
                required. Vehicle operation may be restricted until pending
                issues are resolved.
              </p>
            )}

            <div className="mt-4">
              <h5 className="font-medium mb-2">Recommended Actions</h5>

              <ul className="list-disc ml-5 text-gray-700 space-y-1">
                <li>Review document validity and expiry dates.</li>
                <li>Check and pay any pending challans.</li>
                <li>Ensure insurance and PUC are active.</li>
                <li>Verify FASTag linkage status.</li>
                <li>Renew registration before expiry.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-4 gap-5 mt-6">
          <div className="bg-white rounded-2xl shadow p-5">
            <h4 className="text-gray-500">Registration</h4>
            <p className="text-2xl font-bold">{vehicle.registrationStatus}</p>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <h4 className="text-gray-500">FASTag</h4>
            <p className="text-2xl font-bold">
              {vehicle.fastagLinked ? "Active" : "Inactive"}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <h4 className="text-gray-500">Pending Challans</h4>
            <p className="text-2xl font-bold">
              {vehicle.challans?.length || 0}
            </p>
          </div>

          <div className="bg-white rounded-2xl shadow p-5">
            <h4 className="text-gray-500">Vehicle Type</h4>
            <p className="text-2xl font-bold">{vehicle.vehicleType}</p>
          </div>
        </div>

        {/* Registration Details */}
        <div className="bg-white rounded-3xl shadow p-6 mt-6">
          <h3 className="text-xl font-bold mb-4">Registration Details</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <p>
              <strong>Registration Number:</strong> {vehicle.registrationNumber}
            </p>
            <p>
              <strong>Vehicle ID:</strong> {vehicle.vehicleId}
            </p>
            <p>
              <strong>Registration Status:</strong> {vehicle.registrationStatus}
            </p>
            <p>
              <strong>Ownership Type:</strong> {vehicle.ownershipType}
            </p>
            <p>
              <strong>Registration Date:</strong>{" "}
              {new Date(vehicle.registrationDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Validity:</strong>{" "}
              {new Date(vehicle.registrationValidity).toLocaleDateString()}
            </p>
            <p>
              <strong>First Registration:</strong>{" "}
              {new Date(vehicle.firstRegistrationDate).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Owner & RTO Details */}
        <div className="bg-white rounded-3xl shadow p-6 mt-6">
          <h3 className="text-xl font-bold mb-4">Owner & RTO Information</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <p>
              <strong>Owner:</strong> {vehicle.vehicle_owner}
            </p>
            <p>
              <strong>State:</strong> {vehicle.stateName}
            </p>
            <p>
              <strong>State Code:</strong> {vehicle.stateCode}
            </p>
            <p>
              <strong>District:</strong> {vehicle.districtName}
            </p>
            <p>
              <strong>RTO Name:</strong> {vehicle.rtoName}
            </p>
            <p>
              <strong>RTO Code:</strong> {vehicle.rtoCode}
            </p>
          </div>
        </div>

        {/* Vehicle Information */}
        <div className="bg-white rounded-3xl shadow p-6 mt-6">
          <h3 className="text-xl font-bold mb-4">Vehicle Information</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <p>
              <strong>Manufacturer:</strong> {vehicle.manufacturer}
            </p>
            <p>
              <strong>Model:</strong> {vehicle.model}
            </p>
            <p>
              <strong>Category:</strong> {vehicle.vehicleCategory}
            </p>
            <p>
              <strong>Type:</strong> {vehicle.vehicleType}
            </p>
            <p>
              <strong>Sub Type:</strong> {vehicle.vehicleSubType}
            </p>
            <p>
              <strong>Fuel Type:</strong> {vehicle.fuelType}
            </p>
            <p>
              <strong>Emission Norms:</strong> {vehicle.emissionNorms}
            </p>
            <p>
              <strong>Color:</strong> {vehicle.color}
            </p>
            <p>
              <strong>Body Type:</strong> {vehicle.bodyType}
            </p>
          </div>
        </div>

        {/* Technical Specifications */}
        <div className="bg-white rounded-3xl shadow p-6 mt-6">
          <h3 className="text-xl font-bold mb-4">Technical Specifications</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <p>
              <strong>Engine Number:</strong> {vehicle.engineNumber}
            </p>
            <p>
              <strong>Chassis Number:</strong> {vehicle.chassisNumber}
            </p>
            <p>
              <strong>Cubic Capacity:</strong> {vehicle.cubicCapacity} CC
            </p>
            <p>
              <strong>Wheel Base:</strong> {vehicle.wheelBase} mm
            </p>
            <p>
              <strong>Gross Weight:</strong> {vehicle.grossVehicleWeight} kg
            </p>
            <p>
              <strong>Unladen Weight:</strong> {vehicle.unladenWeight} kg
            </p>
            <p>
              <strong>Seating Capacity:</strong> {vehicle.seatingCapacity}
            </p>
            <p>
              <strong>Sleeper Capacity:</strong> {vehicle.sleeperCapacity}
            </p>
          </div>
        </div>

        {/* Manufacturing Details */}
        <div className="bg-white rounded-3xl shadow p-6 mt-6">
          <h3 className="text-xl font-bold mb-4">Manufacturing Details</h3>

          <div className="grid md:grid-cols-2 gap-4">
            <p>
              <strong>Manufacture Month:</strong> {vehicle.manufactureMonth}
            </p>
            <p>
              <strong>Manufacture Year:</strong> {vehicle.manufactureYear}
            </p>
          </div>
        </div>

        {/* Documents */}
        <div className="bg-white rounded-3xl shadow p-6 mt-6">
          <h3 className="text-xl font-bold mb-4">Documents</h3>

          <div className="grid md:grid-cols-3 gap-5">
            {vehicle.documents?.map((doc, index) => (
              <div key={index} className="border rounded-2xl p-4">
                <h4 className="font-bold">{doc.documentType}</h4>

                <p>Status: {doc.status}</p>

                <p>Expiry: {new Date(doc.expiryDate).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Challans */}
        <div className="bg-white rounded-3xl shadow p-6 mt-6">
          <h3 className="text-xl font-bold mb-4">Challan Information</h3>

          {vehicle.challans?.length > 0 ? (
            vehicle.challans.map((challan, index) => (
              <div key={index} className="border rounded-xl p-4 mb-3">
                <p>
                  <strong>Violation:</strong> {challan.violation}
                </p>
                <p>
                  <strong>Amount:</strong> ₹{challan.amount}
                </p>
                <p>
                  <strong>Status:</strong> {challan.status}
                </p>
              </div>
            ))
          ) : (
            <p>No Challans Found</p>
          )}
        </div>

        {/* Compliance Alert */}
        {vehicle.complianceStatus !== "GREEN" && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 rounded-xl p-5 mt-6">
            <h4 className="font-bold text-yellow-800">Compliance Alert</h4>

            <p className="text-yellow-700 mt-2">
              This vehicle currently has a compliance status of{" "}
              <strong>{vehicle.complianceStatus}</strong>. Please resolve
              pending issues and ensure all vehicle documents remain valid.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
