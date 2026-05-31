import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const handleSearch = () => {
    if (!vehicleNumber.trim()) {
      alert("Please enter vehicle number");
      return;
    }

    console.log("Vehicle Number:", vehicleNumber);

    // Navigate or call API here
    // navigate(`/vehicle/${vehicleNumber}`);

    setIsOpen(false);
  };

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="fixed top-0 left-0 w-full bg-white shadow-sm z-40">
          <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-blue-700">DriveLegal</h1>

            <nav className="hidden md:flex items-center gap-8">
              <a href="#" className="hover:text-blue-600">
                Home
              </a>
              <a href="#" className="hover:text-blue-600">
                Traffic Rules
              </a>
              <a href="#" className="hover:text-blue-600">
                Vehicle Status
              </a>
              <a href="#" className="hover:text-blue-600">
                About
              </a>
            </nav>

            <button
              onClick={() => setIsOpen(true)}
              className="bg-blue-600 text-white px-5 py-2 rounded-lg"
            >
              Login
            </button>
          </div>
        </header>

        {/* Hero Section */}
        <section className="pt-32 pb-20 px-6">
          <div className="max-w-7xl mx-auto text-center">
            {/* State Selector */}
            <div className="mb-8 flex flex-col md:flex-row justify-center items-center gap-4">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="w-full md:w-80 px-4 py-3 border border-gray-300 rounded-xl"
              >
                <option value="">Select State</option>
                <option>Andhra Pradesh</option>
                <option>Arunachal Pradesh</option>
                <option>Assam</option>
                <option>Bihar</option>
                <option>Chhattisgarh</option>
                <option>Goa</option>
                <option>Gujarat</option>
                <option>Haryana</option>
                <option>Himachal Pradesh</option>
                <option>Jharkhand</option>
                <option>Karnataka</option>
                <option>Kerala</option>
                <option>Madhya Pradesh</option>
                <option>Maharashtra</option>
                <option>Manipur</option>
                <option>Meghalaya</option>
                <option>Mizoram</option>
                <option>Nagaland</option>
                <option>Odisha</option>
                <option>Punjab</option>
                <option>Rajasthan</option>
                <option>Sikkim</option>
                <option>Tamil Nadu</option>
                <option>Telangana</option>
                <option>Tripura</option>
                <option>Uttar Pradesh</option>
                <option>Uttarakhand</option>
                <option>West Bengal</option>
              </select>

              <button
                onClick={() => {
                  if (!selectedState) {
                    alert("Please select a state");
                    return;
                  }

                  navigate("/traffic-rules", {
                    state: {
                      stateName: selectedState,
                    },
                  });
                }}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl"
              >
                Get Traffic Rules
              </button>
            </div>

            <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
              Smart Vehicle Compliance Platform
            </span>

            <h1 className="text-5xl md:text-7xl font-bold mt-8 text-gray-900">
              Drive Smart & Stay Legal.
            </h1>

            <p className="max-w-3xl mx-auto mt-6 text-lg text-gray-600">
              Access state-wise traffic laws, monitor vehicle compliance, track
              challans, and stay informed about road safety regulations across
              India.
            </p>

            {/* Buttons */}
            <div className="mt-10 flex flex-col sm:flex-row justify-center gap-4">
              <button
                onClick={() => setIsOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-medium"
              >
                Check Vehicle Status
              </button>

              <button className="border border-gray-300 hover:bg-gray-100 px-8 py-4 rounded-xl font-medium">
                Learn Road Safety Rules
              </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20">
              <div className="bg-white shadow-sm rounded-2xl p-6">
                <h3 className="text-3xl font-bold text-blue-600">28+</h3>
                <p className="text-gray-600 mt-2">States Covered</p>
              </div>

              <div className="bg-white shadow-sm rounded-2xl p-6">
                <h3 className="text-3xl font-bold text-green-600">1000+</h3>
                <p className="text-gray-600 mt-2">Traffic Rules</p>
              </div>

              <div className="bg-white shadow-sm rounded-2xl p-6">
                <h3 className="text-3xl font-bold text-orange-500">24/7</h3>
                <p className="text-gray-600 mt-2">Compliance Tracking</p>
              </div>

              <div className="bg-white shadow-sm rounded-2xl p-6">
                <h3 className="text-3xl font-bold text-red-500">QR</h3>
                <p className="text-gray-600 mt-2">Verification</p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* About Section */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-900">
              About DriveLegal
            </h2>

            <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
              DriveLegal is a smart vehicle compliance and traffic regulation
              platform designed to help vehicle owners access important vehicle
              information, understand traffic laws, and stay compliant with road
              safety regulations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-blue-600">
                Vehicle Verification
              </h3>

              <p className="text-gray-600">
                Verify vehicle registration details, ownership information,
                insurance status, FASTag linkage, and compliance records through
                a centralized dashboard.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-green-600">
                Traffic Rules Access
              </h3>

              <p className="text-gray-600">
                Browse state-wise traffic regulations, penalties, and road
                safety guidelines to better understand legal requirements and
                avoid violations.
              </p>
            </div>

            <div className="bg-gray-50 p-8 rounded-2xl shadow-sm">
              <h3 className="text-xl font-semibold mb-3 text-orange-500">
                Compliance Monitoring
              </h3>

              <p className="text-gray-600">
                Monitor registration validity, insurance coverage, challans, and
                other compliance indicators to maintain a roadworthy and legally
                compliant vehicle.
              </p>
            </div>
          </div>

          <div className="mt-12 bg-blue-50 rounded-3xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Our Mission
            </h3>

            <p className="text-gray-700 leading-relaxed">
              Our mission is to simplify vehicle compliance management by
              providing a single platform for accessing traffic regulations,
              vehicle information, and compliance status. By making this
              information easily available, DriveLegal aims to promote
              responsible driving behavior, improve awareness of road safety
              regulations, and support safer transportation systems.
            </p>
          </div>
        </div>
      </section>
      {/* Modal Popup */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-8 mx-4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">Vehicle Verification</h2>

              <button
                onClick={() => setIsOpen(false)}
                className="text-2xl text-gray-500 hover:text-red-500"
              >
                ×
              </button>
            </div>

            <p className="text-gray-600 mb-6">
              Enter your vehicle registration number to check vehicle details,
              challans, insurance, PUC status and compliance status.
            </p>

            <input
              type="text"
              placeholder="VH0001"
              value={vehicleNumber}
              onChange={(e) => setVehicleNumber(e.target.value.toUpperCase())}
              className="w-full border border-gray-300 rounded-xl px-4 py-3"
            />

            <div className="bg-blue-50 rounded-xl p-4 mt-5">
              <h4 className="font-semibold mb-2">Information Available</h4>

              <ul className="space-y-1 text-gray-700">
                <li>✓ Registration Certificate (RC)</li>
                <li>✓ Insurance Validity</li>
                <li>✓ PUC Status</li>
                <li>✓ Pending Challans</li>
                <li>✓ Compliance Color Status</li>
              </ul>
            </div>

            <button
              onClick={() => {
                if (!vehicleNumber.trim()) {
                  alert("Please enter Vehicle ID");
                  return;
                }

                navigate("/vehicle-detail", {
                  state: {
                    vehicleId: vehicleNumber,
                  },
                });
              }}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl font-medium"
            >
              Check Vehicle Status
            </button>
          </div>
        </div>
      )}
    </>
  );
}
