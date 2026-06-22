import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { Phone, FileText, AlertTriangle } from "lucide-react";

export default function TrafficRulesPage() {
  const [trafficRules, setTrafficRules] = useState([]);
  const location = useLocation();
  const stateName = location.state?.stateName || "Andhra Pradesh";
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRules();
  }, [stateName]);

  const fetchRules = async () => {
    try {
      setLoading(true);
      console.log(stateName);
      const res = await axios.post("http://localhost:5000/trafficRules", {
        stateName,
      });

      setTrafficRules(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  // const fetchPdf = async () => {
  //   try {
  //     await axios.get("http://localhost:5000/pdf");
  //     const url = window.URL.createObjectURL(new Blob([response.data]));

  //     const link = document.createElement("a");
  //     link.href = url;
  //     link.setAttribute("download", "traffic-rules.pdf");

  //     document.body.appendChild(link);
  //     link.click();

  //     link.remove();
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const safetyRules = [
    "Maintain safe distance from the vehicle ahead",
    "Use indicators before changing lanes",
    "Follow lane discipline",
    "Avoid overspeeding",
    "Give way to emergency vehicles",
    "Wear reflective gear while riding at night",
  ];

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "Critical":
        return "bg-red-100 text-red-700";
      case "High":
        return "bg-orange-100 text-orange-700";
      case "Medium":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-green-100 text-green-700";
    }
  };

  return (
    <div className="pt-20 bg-slate-100 min-h-screen p-6">
      {/* Header */}
      <div className="bg-blue-900 text-white rounded-2xl p-6 shadow-lg">
        <div className="grid md:grid-cols-5 gap-6 items-center">
          <div className="md:col-span-2">
            <h1 className="text-3xl font-bold">{stateName} Traffic Rules</h1>

            <p className="text-blue-100 mt-2">
              Drive responsibly and follow traffic regulations.
            </p>
          </div>

          <div>
            <p className="text-blue-200 text-sm">Traffic Rules</p>
            <h2 className="text-4xl font-bold">{trafficRules.length}</h2>
          </div>

          <div>
            <p className="text-blue-200 text-sm">State</p>
            <h2 className="text-xl font-semibold">{stateName}</h2>
          </div>

          <div>
            <p className="text-blue-200 text-sm">Compliance</p>
            <h2 className="text-xl font-semibold">Follow Rules</h2>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-4 gap-6 mt-6">
        {/* Main Content */}
        <div className="lg:col-span-3">
          {loading ? (
            <div className="bg-white rounded-xl p-6 text-center">
              Loading rules...
            </div>
          ) : (
            <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-5">
              {trafficRules.map((rule) => (
                <div
                  key={rule._id}
                  className="bg-white rounded-2xl p-5 shadow hover:shadow-lg transition"
                >
                  <h3 className="text-lg font-bold">{rule.ruleTitle}</h3>

                  <p className="text-gray-600 text-sm mt-2">
                    {rule.shortDescription}
                  </p>

                  <div className="mt-3">
                    <p className="font-medium text-gray-700">Category:</p>
                    <p>{rule.category}</p>
                  </div>

                  <div className="mt-2">
                    <p className="font-medium text-gray-700">Sub Category:</p>
                    <p>{rule.subCategory}</p>
                  </div>

                  <div className="mt-2">
                    <p className="font-medium text-gray-700">
                      Legal Reference:
                    </p>

                    {rule.legalReference.map((ref, index) => (
                      <p key={index} className="text-sm text-gray-600">
                        {ref}
                      </p>
                    ))}
                  </div>

                  <div className="mt-4">
                    <p className="text-red-600 font-bold">Fine: ₹{rule.fine}</p>
                  </div>

                  <div className="mt-3">
                    <span
                      className={`px-3 py-1 rounded-full text-sm font-medium ${getSeverityColor(
                        rule.severityLevel,
                      )}`}
                    >
                      {rule.severityLevel}
                    </span>
                  </div>

                  <details className="mt-4">
                    <summary className="cursor-pointer text-blue-700 font-medium">
                      View Details
                    </summary>

                    <p className="mt-2 text-gray-600 text-sm">
                      {rule.detailedDescription}
                    </p>

                    <div className="mt-2">
                      <p className="font-medium">Applicable Roads:</p>

                      <ul className="list-disc ml-5 text-sm">
                        {rule.applicableRoadTypes.map((road, index) => (
                          <li key={index}>{road}</li>
                        ))}
                      </ul>
                    </div>
                  </details>
                </div>
              ))}
            </div>
          )}

          {/* Safety Guidelines */}
          <div className="bg-white rounded-2xl p-6 shadow mt-6">
            <h2 className="text-2xl font-bold mb-5">Road Safety Guidelines</h2>

            <div className="grid md:grid-cols-2 gap-4">
              {safetyRules.map((rule, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-4 rounded-xl bg-green-50"
                >
                  <AlertTriangle size={20} className="text-green-600 mt-1" />

                  <p>{rule}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Notice */}
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4 mt-6">
            <p className="text-blue-800">
              Rules and penalties may be updated by the Transport Department.
              Verify the latest notifications before taking action.
            </p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl p-5 shadow">
            <h2 className="font-bold text-xl mb-4">Quick Info</h2>

            <div className="space-y-3">
              <p className="flex items-center gap-2">
                <Phone size={16} />
                Traffic Helpline: 103
              </p>

              <p className="flex items-center gap-2">
                <Phone size={16} />
                Ambulance: 108
              </p>

              <p className="flex items-center gap-2">
                <Phone size={16} />
                Police: 100
              </p>

              <p className="flex items-center gap-2">
                <Phone size={16} />
                Emergency: 112
              </p>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-5 shadow">
            <h2 className="font-bold text-xl mb-4">Downloads</h2>

            <div className="space-y-3">
              <button
                onClick={() => {
                  window.open("http://localhost:5000/pdf", "_blank");
                }}
                className="w-full flex items-center gap-2 hover:text-blue-700"
              >
                <FileText size={18} />
                Traffic Rules PDF
              </button>

              <button
                onClick={() => {
                  window.open("http://localhost:5000/pdf", "_blank");
                }}
                className="w-full flex items-center gap-2 hover:text-blue-700"
              >
                <FileText size={18} />
                Fine Structure PDF
              </button>

              <button
                onClick={() => {
                  window.open("http://localhost:5000/pdf", "_blank");
                }}
                className="w-full flex items-center gap-2 hover:text-blue-700"
              >
                <FileText size={18} />
                Road Signs Guide
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
