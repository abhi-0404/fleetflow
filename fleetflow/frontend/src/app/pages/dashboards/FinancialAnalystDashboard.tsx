import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { useFleetData } from "../../context/FleetDataContext";
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid, LineChart, Line } from "recharts";
import { DollarSign, TrendingUp, TrendingDown, Sparkles, AlertCircle } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";

export function FinancialAnalystDashboard() {
  const navigate = useNavigate();
  const { revenueEvents, recentTripUpdates } = useFleetData();
  const [showRevenueAlert, setShowRevenueAlert] = useState(false);

  // Monitor for new revenue logs
  useEffect(() => {
    if (revenueEvents.length > 0) {
      const latestEvent = revenueEvents[0];
      const now = Date.now();
      
      // Show alert if event is less than 5 seconds old
      if (now - latestEvent.timestamp < 5000) {
        setShowRevenueAlert(true);
        toast.success(`New Revenue Log: $${latestEvent.amount}`, {
          description: `Trip ${latestEvent.tripId} completed`,
        });
        
        setTimeout(() => setShowRevenueAlert(false), 5000);
      }
    }
  }, [revenueEvents]);

  // Fuel Spend vs Budget Data
  const fuelData = [
    { month: "Sep", actual: 12000, budget: 15000 },
    { month: "Oct", actual: 14000, budget: 15000 },
    { month: "Nov", actual: 13500, budget: 14500 },
    { month: "Dec", actual: 16000, budget: 15000 },
    { month: "Jan", actual: 15500, budget: 16000 },
    { month: "Feb", actual: 17000, budget: 16500 },
  ];

  // Maintenance ROI Data
  const maintenanceROI = [
    { vehicleId: "VEH-001", plate: "BIKE-1122", invested: 2400, revenue: 8200, roi: 241.7, trend: [65, 72, 78, 85, 90, 95] },
    { vehicleId: "VEH-002", plate: "VAN-2891", invested: 8500, revenue: 28400, roi: 234.1, trend: [70, 75, 80, 88, 92, 98] },
    { vehicleId: "VEH-003", plate: "TRK-1456", invested: 15200, revenue: 45600, roi: 200.0, trend: [60, 68, 75, 82, 88, 93] },
    { vehicleId: "VEH-004", plate: "VAN-3421", invested: 12800, revenue: 35200, roi: 175.0, trend: [55, 62, 70, 78, 85, 90] },
    { vehicleId: "VEH-005", plate: "TRK-9988", invested: 18400, revenue: 52100, roi: 183.2, trend: [58, 65, 72, 80, 86, 91] },
  ];

  // Cost breakdown
  const costBreakdown = [
    { category: "Fuel", amount: 17000, percentage: 44.7, trend: "up" },
    { category: "Maintenance", amount: 13000, percentage: 34.2, trend: "down" },
    { category: "Payroll", amount: 8000, percentage: 21.1, trend: "neutral" },
  ];

  // Revenue trend
  const revenueTrend = [
    { month: "Sep", revenue: 45000 },
    { month: "Oct", revenue: 52000 },
    { month: "Nov", revenue: 48000 },
    { month: "Dec", revenue: 61000 },
    { month: "Jan", revenue: 58000 },
    { month: "Feb", revenue: 67000 },
  ];

  const totalRevenue = revenueTrend.reduce((sum, item) => sum + item.revenue, 0);
  const avgRevenue = (totalRevenue / revenueTrend.length).toFixed(0);
  const lastMonthRevenue = revenueTrend[revenueTrend.length - 1].revenue;
  const prevMonthRevenue = revenueTrend[revenueTrend.length - 2].revenue;
  const revenueGrowth = (((lastMonthRevenue - prevMonthRevenue) / prevMonthRevenue) * 100).toFixed(1);

  const totalFuelSpend = fuelData.reduce((sum, item) => sum + item.actual, 0);
  const totalFuelBudget = fuelData.reduce((sum, item) => sum + item.budget, 0);
  const fuelVariance = (((totalFuelSpend - totalFuelBudget) / totalFuelBudget) * 100).toFixed(1);

  return (
    <div className="p-6">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white mb-2">Financial Analyst Dashboard</h1>
            <p className="text-gray-400">Revenue analytics and cost optimization insights</p>
          </div>
          <button
            onClick={() => navigate("/analytics")}
            className="flex items-center gap-2 bg-[#06B6D4] text-white px-6 py-3 rounded-xl font-semibold hover:bg-[#0891B2] transition-all hover:scale-105"
          >
            <TrendingUp size={20} />
            Full Analytics
          </button>
        </div>
      </div>

      {/* Real-Time Revenue Alert */}
      <AnimatePresence>
        {showRevenueAlert && revenueEvents.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            className="mb-6 p-4 bg-gradient-to-r from-[#10B981]/20 to-[#06B6D4]/20 border border-[#10B981]/40 rounded-xl backdrop-blur-xl"
          >
            <div className="flex items-center gap-3">
              <div className="p-2 bg-[#10B981]/30 rounded-lg">
                <Sparkles size={24} className="text-[#10B981]" />
              </div>
              <div className="flex-1">
                <p className="text-white font-semibold">New Revenue Log</p>
                <p className="text-gray-300 text-sm">
                  Trip {revenueEvents[0].tripId} completed • Revenue: ${revenueEvents[0].amount}
                </p>
              </div>
              <button
                onClick={() => setShowRevenueAlert(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                ✕
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Top KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <DollarSign className="text-[#10B981]" size={24} />
            <span className="text-[#10B981] text-sm font-semibold">+{revenueGrowth}%</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Monthly Revenue</h3>
          <p className="text-3xl font-bold text-white">${(lastMonthRevenue / 1000).toFixed(0)}k</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="text-[#3B82F6]" size={24} />
            <span className="text-gray-400 text-sm font-semibold">Avg ROI</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Fleet ROI</h3>
          <p className="text-3xl font-bold text-white">206.8%</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <AlertCircle className={parseFloat(fuelVariance) > 0 ? "text-[#EF4444]" : "text-[#10B981]"} size={24} />
            <span className={`text-sm font-semibold ${parseFloat(fuelVariance) > 0 ? "text-[#EF4444]" : "text-[#10B981]"}`}>
              {fuelVariance}%
            </span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Fuel vs Budget</h3>
          <p className="text-3xl font-bold text-white">${(totalFuelSpend / 1000).toFixed(0)}k</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6"
        >
          <div className="flex items-center justify-between mb-2">
            <TrendingUp className="text-[#F59E0B]" size={24} />
            <span className="text-[#10B981] text-sm font-semibold">+5.2%</span>
          </div>
          <h3 className="text-gray-400 text-sm mb-1">Profit Margin</h3>
          <p className="text-3xl font-bold text-white">43.2%</p>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        {/* Fuel Spend vs Budget Area Chart */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Fuel Spend vs Budget</h2>
          
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={fuelData}>
              <defs>
                <linearGradient id="actualGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#EF4444" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="budgetGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Area
                type="monotone"
                dataKey="budget"
                stroke="#3B82F6"
                strokeWidth={2}
                fill="url(#budgetGradient)"
              />
              <Area
                type="monotone"
                dataKey="actual"
                stroke="#EF4444"
                strokeWidth={2}
                fill="url(#actualGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>

          <div className="flex items-center justify-center gap-6 mt-4">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#3B82F6]" />
              <span className="text-gray-400 text-sm">Budget</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-[#EF4444]" />
              <span className="text-gray-400 text-sm">Actual</span>
            </div>
          </div>
        </div>

        {/* Revenue Trend */}
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
          <h2 className="text-xl font-bold text-white mb-6">Revenue Trend</h2>
          
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={revenueTrend}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
              <XAxis dataKey="month" stroke="#9CA3AF" />
              <YAxis stroke="#9CA3AF" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(255,255,255,0.1)",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#10B981"
                strokeWidth={3}
                dot={{ fill: "#10B981", r: 5 }}
                activeDot={{ r: 7 }}
              />
            </LineChart>
          </ResponsiveContainer>

          <div className="grid grid-cols-2 gap-4 mt-4">
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-gray-400 text-xs mb-1">Avg Monthly</p>
              <p className="text-white font-bold text-lg">${(parseInt(avgRevenue) / 1000).toFixed(0)}k</p>
            </div>
            <div className="p-3 bg-white/5 border border-white/10 rounded-xl">
              <p className="text-gray-400 text-xs mb-1">Total (6mo)</p>
              <p className="text-white font-bold text-lg">${(totalRevenue / 1000).toFixed(0)}k</p>
            </div>
          </div>
        </div>
      </div>

      {/* Maintenance ROI Table with Trend Sparklines */}
      <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-white">Maintenance ROI Analysis</h2>
          <button
            onClick={() => navigate("/maintenance")}
            className="text-[#3B82F6] text-sm font-medium hover:underline"
          >
            View Details
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-white/10">
                <th className="text-left p-4 text-gray-400 font-semibold">Vehicle ID</th>
                <th className="text-left p-4 text-gray-400 font-semibold">License Plate</th>
                <th className="text-right p-4 text-gray-400 font-semibold">Invested</th>
                <th className="text-right p-4 text-gray-400 font-semibold">Revenue</th>
                <th className="text-right p-4 text-gray-400 font-semibold">ROI</th>
                <th className="text-center p-4 text-gray-400 font-semibold">Trend (6mo)</th>
              </tr>
            </thead>
            <tbody>
              {maintenanceROI.map((row, index) => (
                <motion.tr
                  key={row.vehicleId}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="border-b border-white/5 hover:bg-white/5 transition-all"
                >
                  <td className="p-4 text-white font-mono">{row.vehicleId}</td>
                  <td className="p-4 text-white font-semibold">{row.plate}</td>
                  <td className="p-4 text-gray-400 text-right">${row.invested.toLocaleString()}</td>
                  <td className="p-4 text-white font-semibold text-right">${row.revenue.toLocaleString()}</td>
                  <td className="p-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      {row.roi > 200 ? (
                        <TrendingUp size={16} className="text-[#10B981]" />
                      ) : (
                        <TrendingDown size={16} className="text-[#F59E0B]" />
                      )}
                      <span className={`font-bold ${row.roi > 200 ? "text-[#10B981]" : "text-[#F59E0B]"}`}>
                        {row.roi}%
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-center">
                      <ResponsiveContainer width={100} height={30}>
                        <LineChart data={row.trend.map((val, i) => ({ value: val }))}>
                          <Line
                            type="monotone"
                            dataKey="value"
                            stroke={row.roi > 200 ? "#10B981" : "#F59E0B"}
                            strokeWidth={2}
                            dot={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
