import { useNavigate } from "react-router";
import { RadialBarChart, RadialBar, ResponsiveContainer, PolarAngleAxis } from "recharts";
import { Shield, AlertTriangle, Users, Calendar, Clock } from "lucide-react";
import { motion } from "motion/react";

export function SafetyOfficerDashboard() {
  const navigate = useNavigate();

  // License Expiry Countdown
  const expiringLicenses = [
    { id: "DRV-001", name: "John Doe", license: "DL-443298", expiresIn: 8, status: "urgent" },
    { id: "DRV-005", name: "Alice Chen", license: "DL-556721", expiresIn: 15, status: "warning" },
    { id: "DRV-012", name: "Mike Jones", license: "DL-789432", expiresIn: 22, status: "warning" },
    { id: "DRV-008", name: "Sarah Kim", license: "DL-334567", expiresIn: 45, status: "normal" },
    { id: "DRV-003", name: "Bob Wilson", license: "DL-998877", expiresIn: 58, status: "normal" },
  ];

  // Fleet Safety Score (Radial Chart)
  const safetyScoreData = [
    {
      name: "Safety Score",
      value: 87,
      fill: "#10B981",
    },
  ];

  // Safety Violations by Category
  const violations = [
    { category: "Speeding", count: 2, trend: "down", trendValue: "-60%" },
    { category: "Hard Braking", count: 5, trend: "down", trendValue: "-25%" },
    { category: "Idle Time", count: 8, trend: "up", trendValue: "+12%" },
    { category: "Seatbelt", count: 0, trend: "neutral", trendValue: "0%" },
  ];

  // Vehicle Inspection Status
  const inspectionStatus = [
    { type: "Motorcycles", passed: 12, failed: 0, pending: 1, total: 13 },
    { type: "Vans", passed: 18, failed: 1, pending: 2, total: 21 },
    { type: "Trucks", passed: 14, failed: 2, pending: 1, total: 17 },
    { type: "Trailers", passed: 8, failed: 0, pending: 0, total: 8 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "urgent":
        return "bg-[#EF4444]/20 text-[#EF4444] border-[#EF4444]/40";
      case "warning":
        return "bg-[#F59E0B]/20 text-[#F59E0B] border-[#F59E0B]/40";
      default:
        return "bg-[#10B981]/20 text-[#10B981] border-[#10B981]/40";
    }
  };

  const getStatusLabel = (days: number) => {
    if (days <= 10) return "URGENT";
    if (days <= 30) return "WARNING";
    return "NORMAL";
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Safety Officer Dashboard</h1>
            <p className="text-gray-400">Fleet safety monitoring and compliance tracking</p>
          </div>
          <button
            onClick={() => navigate("/drivers/compliance")}
            className="flex items-center gap-2 bg-[#10B981] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#059669] transition-all hover:scale-105"
          >
            <Shield size={20} />
            View Compliance
          </button>
        </div>
      </div>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <Shield className="text-[#10B981]" size={24} />
            <span className="text-[#10B981] text-sm font-semibold">+3%</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Fleet Safety Score</h3>
          <p className="text-3xl font-bold text-white">87%</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="text-[#EF4444]" size={24} />
            <span className="text-[#EF4444] text-sm font-semibold">1 Urgent</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Expiring Licenses</h3>
          <p className="text-3xl font-bold text-white">{expiringLicenses.length}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <AlertTriangle className="text-[#F59E0B]" size={24} />
            <span className="text-[#10B981] text-sm font-semibold">-40%</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Safety Violations</h3>
          <p className="text-3xl font-bold text-white">15</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <Users className="text-[#3B82F6]" size={24} />
            <span className="text-gray-400 text-sm font-semibold">Active</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Certified Drivers</h3>
          <p className="text-3xl font-bold text-white">42</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Fleet Safety Score Radial */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Fleet Safety Score</h2>
          
          <ResponsiveContainer width="100%" height={250}>
            <RadialBarChart
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="90%"
              data={safetyScoreData}
              startAngle={180}
              endAngle={0}
            >
              <PolarAngleAxis type="number" domain={[0, 100]} angleAxisId={0} tick={false} />
              <RadialBar
                background
                dataKey="value"
                cornerRadius={10}
                fill="#10B981"
              />
            </RadialBarChart>
          </ResponsiveContainer>

          <div className="text-center -mt-8">
            <p className="text-5xl font-bold text-white mb-2">87%</p>
            <p className="text-gray-400 text-sm">Overall Fleet Health</p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1 bg-[#10B981]/20 border border-[#10B981]/40 rounded-lg">
              <span className="text-[#10B981] text-sm font-semibold">+3% from last month</span>
            </div>
          </div>
        </div>

        {/* Safety Violations by Category */}
        <div className="lg:col-span-2 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Safety Violations by Category</h2>
          
          <div className="space-y-4">
            {violations.map((violation, index) => (
              <motion.div
                key={violation.category}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="p-4 bg-white/5 border border-white/10 rounded-xl"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-lg ${
                      violation.count === 0
                        ? "bg-[#10B981]/20"
                        : violation.count < 5
                        ? "bg-[#F59E0B]/20"
                        : "bg-[#EF4444]/20"
                    }`}>
                      <AlertTriangle size={20} className={
                        violation.count === 0
                          ? "text-[#10B981]"
                          : violation.count < 5
                          ? "text-[#F59E0B]"
                          : "text-[#EF4444]"
                      } />
                    </div>
                    <div>
                      <p className="text-white font-semibold">{violation.category}</p>
                      <p className="text-gray-400 text-sm">Last 30 days</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-3xl font-bold text-white mb-1">{violation.count}</p>
                    <span className={`text-xs font-semibold ${
                      violation.trend === "down"
                        ? "text-[#10B981]"
                        : violation.trend === "up"
                        ? "text-[#EF4444]"
                        : "text-gray-400"
                    }`}>
                      {violation.trendValue}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* License Expiry Countdown Cards */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 mb-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">License Expiry Countdown</h2>
          <button
            onClick={() => navigate("/drivers")}
            className="text-[#3B82F6] text-sm font-medium hover:underline"
          >
            View All Drivers
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {expiringLicenses.map((driver, index) => (
            <motion.div
              key={driver.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.05 }}
              className={`p-4 border rounded-xl ${getStatusColor(driver.status)}`}
            >
              <div className="flex items-center justify-between mb-3">
                <Calendar size={20} />
                <span className={`px-2 py-1 rounded-md text-xs font-bold border ${getStatusColor(driver.status)}`}>
                  {getStatusLabel(driver.expiresIn)}
                </span>
              </div>
              <p className="text-white font-semibold mb-1">{driver.name}</p>
              <p className="text-sm font-mono mb-2 opacity-80">{driver.license}</p>
              <div className="flex items-center gap-2 text-sm">
                <Clock size={14} />
                <span className="font-bold">{driver.expiresIn} days</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Vehicle Inspection Status */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">Vehicle Inspection Status</h2>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-gray-400 font-semibold">Vehicle Type</th>
                <th className="text-center p-4 text-gray-400 font-semibold">Passed</th>
                <th className="text-center p-4 text-gray-400 font-semibold">Failed</th>
                <th className="text-center p-4 text-gray-400 font-semibold">Pending</th>
                <th className="text-center p-4 text-gray-400 font-semibold">Total</th>
                <th className="text-left p-4 text-gray-400 font-semibold">Pass Rate</th>
              </tr>
            </thead>
            <tbody>
              {inspectionStatus.map((row) => {
                const passRate = ((row.passed / row.total) * 100).toFixed(0);
                return (
                  <tr key={row.type} className="border-b border-white/5 hover:bg-white/5 transition-all">
                    <td className="p-4 text-white font-semibold">{row.type}</td>
                    <td className="p-4 text-center">
                      <span className="px-3 py-1 bg-[#10B981]/20 text-[#10B981] rounded-lg text-sm font-semibold">
                        {row.passed}
                      </span>
                    </td>
                    <td className="p-4 text-center">
                      {row.failed > 0 ? (
                        <span className="px-3 py-1 bg-[#EF4444]/20 text-[#EF4444] rounded-lg text-sm font-semibold">
                          {row.failed}
                        </span>
                      ) : (
                        <span className="text-gray-600 text-sm">—</span>
                      )}
                    </td>
                    <td className="p-4 text-center">
                      {row.pending > 0 ? (
                        <span className="px-3 py-1 bg-[#F59E0B]/20 text-[#F59E0B] rounded-lg text-sm font-semibold">
                          {row.pending}
                        </span>
                      ) : (
                        <span className="text-gray-600 text-sm">—</span>
                      )}
                    </td>
                    <td className="p-4 text-center text-white font-semibold">{row.total}</td>
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 bg-white/10 rounded-full h-2 overflow-hidden">
                          <div
                            className="h-full bg-[#10B981] rounded-full"
                            style={{ width: `${passRate}%` }}
                          />
                        </div>
                        <span className="text-[#10B981] font-bold text-sm w-12">{passRate}%</span>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
