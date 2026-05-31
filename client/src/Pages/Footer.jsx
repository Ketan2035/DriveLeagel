import React from "react";
import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <>
      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-10">
            {/* Brand */}
            <div>
              <h4 className="text-2xl font-bold text-blue-400">DriveLegal</h4>

              <p className="text-gray-400 mt-3">
                A smart vehicle compliance platform designed to help citizens
                access traffic regulations, verify vehicle information, monitor
                compliance status, and stay informed about road safety
                requirements.
              </p>
            </div>

            {/* Services */}
            <div>
              <h5 className="text-lg font-semibold mb-4">Services</h5>

              <ul className="space-y-2 text-gray-400">
                <li>Vehicle Verification</li>
                <li>State-wise Traffic Rules</li>
                <li>Compliance Monitoring</li>
                <li>Document Status Tracking</li>
                <li>Challan Information</li>
              </ul>
            </div>

            {/* Features */}
            <div>
              <h5 className="text-lg font-semibold mb-4">
                Platform Highlights
              </h5>

              <ul className="space-y-2 text-gray-400">
                <li>✓ State-specific Traffic Regulations</li>
                <li>✓ Vehicle Compliance Dashboard</li>
                <li>✓ Insurance & Registration Tracking</li>
                <li>✓ FASTag Status Verification</li>
                <li>✓ Road Safety Awareness</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-10 pt-6 text-center">
            <p className="text-gray-500">
              DriveLegal helps vehicle owners stay compliant with transportation
              regulations and promotes safer roads through accessible compliance
              information.
            </p>

            <p className="text-gray-600 text-sm mt-4">
              © 2026 DriveLegal. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
