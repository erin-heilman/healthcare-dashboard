"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon, AlertCircleIcon } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
} from "recharts"
import { measureData, performanceData } from "@/generated-data"

export default function ProfessionalDashboard() {
  const domains = Object.keys(measureData) as Array<keyof typeof measureData>
  const [selectedDomain, setSelectedDomain] = useState<string>(domains[0])
  const [selectedMeasure, setSelectedMeasure] = useState<string>(
    measureData[domains[0]][0].id
  )

  const currentMeasures = measureData[selectedDomain as keyof typeof measureData]
  const currentPerformanceData = performanceData[selectedMeasure] || []

  // Calculate summary statistics
  const summaryStats = useMemo(() => {
    const allMeasures = [...measureData["Process and Structural Measures"], ...measureData["Outcome Measures"]]
    let improving = 0
    let declining = 0
    let stable = 0
    let aboveBenchmark = 0
    let belowBenchmark = 0

    allMeasures.forEach((measure) => {
      const data = performanceData[measure.id]
      if (data && data.length > 0) {
        const summary = data.find((item) => item.year.includes("2023-2025"))
        if (summary && summary.conwaySlope !== undefined) {
          if (summary.conwaySlope > 0.01) improving++
          else if (summary.conwaySlope < -0.01) declining++
          else stable++
        }

        // Check latest period performance vs national
        const latest = data.find((item) => item.year === "2025 Spring")
        if (latest && latest.conway !== undefined && latest.national !== undefined) {
          if (latest.status === "better") aboveBenchmark++
          else if (latest.status === "worse") belowBenchmark++
        }
      }
    })

    return { improving, declining, stable, aboveBenchmark, belowBenchmark, total: allMeasures.length }
  }, [])

  // Filter out summary row and format data for chart
  const chartData = currentPerformanceData
    .filter((item) => !item.year.includes("2023-2025"))
    .map((item) => ({
      period: item.year,
      Conway: item.conway,
      National: item.national,
    }))

  // Get trend info
  const summaryData = currentPerformanceData.find((item) =>
    item.year.includes("2023-2025")
  )
  const conwayTrend = summaryData?.conwaySlope || 0
  const nationalTrend = summaryData?.nationalSlope || 0
  const latestData = currentPerformanceData.find((item) => item.year === "2025 Spring")
  const performanceStatus = latestData?.status || "unknown"

  // Get current and previous values for selected measure
  const currentValue = latestData?.conway || 0
  const previousValue = currentPerformanceData.find((item) => item.year === "2024 Fall")?.conway || 0
  const percentChange = previousValue !== 0 ? ((currentValue - previousValue) / previousValue) * 100 : 0

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(to bottom, #f8fafc 0%, #e2e8f0 100%)" }}>
      {/* Professional Header */}
      <div
        className="relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0066CC 0%, #004C99 50%, #003D7A 100%)",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}
      >
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
        }}></div>
        <div className="max-w-7xl mx-auto px-8 py-8 relative">
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2" style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Conway Regional Medical Center
              </h1>
              <h2 className="text-xl text-blue-100 font-medium mb-1">
                Leapfrog Performance Dashboard
              </h2>
              <p className="text-blue-200 text-sm">
                Historical Analysis (2023 Spring - 2025 Spring)
              </p>
            </div>
            <div className="text-right">
              <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-4 py-2 border border-white border-opacity-30">
                <div className="text-blue-100 text-xs font-medium">Last Updated</div>
                <div className="text-white text-sm font-semibold">October 2025</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-8 py-8 space-y-6">
        {/* Key Metrics Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0" style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Measures</p>
                  <p className="text-3xl font-bold mt-2" style={{ color: "#0066CC" }}>
                    {summaryStats.total}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#E6F2FF" }}>
                  <TrendingUpIcon className="w-6 h-6" style={{ color: "#0066CC" }} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs text-gray-600">
                <span className="font-medium">{measureData["Process and Structural Measures"].length}</span>
                <span className="mx-1">Process &</span>
                <span className="font-medium">{measureData["Outcome Measures"].length}</span>
                <span className="ml-1">Outcome</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0" style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Improving Trends</p>
                  <p className="text-3xl font-bold mt-2" style={{ color: "#10B981" }}>
                    {summaryStats.improving}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#D1FAE5" }}>
                  <ArrowUpIcon className="w-6 h-6" style={{ color: "#10B981" }} />
                </div>
              </div>
              <div className="mt-4 flex items-center text-xs">
                <span className="text-gray-600">{summaryStats.declining} declining</span>
                <span className="mx-2 text-gray-400">•</span>
                <span className="text-gray-600">{summaryStats.stable} stable</span>
              </div>
            </CardContent>
          </Card>

          <Card className="border-0" style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Above Benchmark</p>
                  <p className="text-3xl font-bold mt-2" style={{ color: "#14B8A6" }}>
                    {summaryStats.aboveBenchmark}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#CCFBF1" }}>
                  <TrendingUpIcon className="w-6 h-6" style={{ color: "#14B8A6" }} />
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-600">
                {((summaryStats.aboveBenchmark / summaryStats.total) * 100).toFixed(0)}% of total measures
              </div>
            </CardContent>
          </Card>

          <Card className="border-0" style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Below Benchmark</p>
                  <p className="text-3xl font-bold mt-2" style={{ color: "#F97316" }}>
                    {summaryStats.belowBenchmark}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: "#FFEDD5" }}>
                  <AlertCircleIcon className="w-6 h-6" style={{ color: "#F97316" }} />
                </div>
              </div>
              <div className="mt-4 text-xs text-gray-600">
                Requires attention
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Measure List */}
          <div className="lg:col-span-1">
            <Card className="border-0" style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
              <CardHeader className="border-b" style={{ backgroundColor: "#F8FAFC" }}>
                <CardTitle className="text-lg font-semibold" style={{ color: "#0066CC" }}>
                  Measure Categories
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Tabs
                  value={selectedDomain}
                  onValueChange={(value) => {
                    setSelectedDomain(value)
                    const measures = measureData[value as keyof typeof measureData]
                    if (measures && measures.length > 0) {
                      setSelectedMeasure(measures[0].id)
                    }
                  }}
                  className="w-full"
                >
                  <TabsList className="grid w-full grid-cols-2 m-4" style={{ backgroundColor: "#E6F2FF" }}>
                    {domains.map((domain) => (
                      <TabsTrigger
                        key={domain}
                        value={domain}
                        className="data-[state=active]:bg-white data-[state=active]:text-[#0066CC] data-[state=active]:font-semibold"
                      >
                        {domain === "Process and Structural Measures" ? "Process" : "Outcome"}
                      </TabsTrigger>
                    ))}
                  </TabsList>

                  {domains.map((domain) => (
                    <TabsContent key={domain} value={domain} className="m-0">
                      <div className="divide-y max-h-[600px] overflow-y-auto">
                        {measureData[domain].map((measure, idx) => {
                          const measurePerf = performanceData[measure.id]
                          const measureLatest = measurePerf?.find((item) => item.year === "2025 Spring")
                          const measureSummary = measurePerf?.find((item) => item.year.includes("2023-2025"))
                          const measureTrend = measureSummary?.conwaySlope || 0
                          const measureStatus = measureLatest?.status || "unknown"

                          return (
                            <div
                              key={measure.id}
                              className={`p-4 cursor-pointer transition-all hover:bg-gray-50 ${
                                selectedMeasure === measure.id ? "bg-blue-50 border-l-4 border-l-[#0066CC]" : ""
                              } ${idx % 2 === 0 ? "bg-gray-50 bg-opacity-50" : ""}`}
                              onClick={() => setSelectedMeasure(measure.id)}
                            >
                              <div className="flex items-start justify-between gap-2 mb-2">
                                <h4 className="text-sm font-medium text-gray-900 leading-tight flex-1">
                                  {measure.name}
                                </h4>
                                {measureTrend > 0.01 ? (
                                  <ArrowUpIcon className="w-4 h-4 flex-shrink-0 text-green-600" />
                                ) : measureTrend < -0.01 ? (
                                  <ArrowDownIcon className="w-4 h-4 flex-shrink-0 text-red-600" />
                                ) : (
                                  <div className="w-4 h-4 flex-shrink-0"></div>
                                )}
                              </div>
                              <div className="flex items-center gap-2 flex-wrap">
                                <Badge
                                  variant="outline"
                                  className="text-xs font-mono"
                                  style={{ borderColor: "#0066CC", color: "#0066CC" }}
                                >
                                  {measure.id}
                                </Badge>
                                <Badge
                                  className="text-xs"
                                  style={{
                                    backgroundColor: measureStatus === "better" ? "#D1FAE5" : measureStatus === "worse" ? "#FFEDD5" : "#F3F4F6",
                                    color: measureStatus === "better" ? "#065F46" : measureStatus === "worse" ? "#9A3412" : "#4B5563",
                                    border: "none"
                                  }}
                                >
                                  {measureStatus === "better" ? "Above" : measureStatus === "worse" ? "Below" : "At"} Benchmark
                                </Badge>
                                <span className="text-xs text-gray-500">
                                  Weight: {(measure.weight * 100).toFixed(1)}%
                                </span>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </TabsContent>
                  ))}
                </Tabs>
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Performance Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Selected Measure Overview */}
            <Card className="border-0" style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
              <CardHeader className="border-b" style={{ backgroundColor: "#F8FAFC" }}>
                <div className="flex items-start justify-between">
                  <div>
                    <CardTitle className="text-lg font-semibold mb-1" style={{ color: "#0066CC" }}>
                      {currentMeasures.find((m) => m.id === selectedMeasure)?.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Measure ID: {selectedMeasure} • Weight: {((currentMeasures.find((m) => m.id === selectedMeasure)?.weight || 0) * 100).toFixed(1)}%
                    </p>
                  </div>
                  <Badge
                    className="text-sm px-3 py-1"
                    style={{
                      backgroundColor: performanceStatus === "better" ? "#10B981" : performanceStatus === "worse" ? "#F97316" : "#6B7280",
                      color: "white",
                      border: "none"
                    }}
                  >
                    {performanceStatus === "better" ? "Exceeding Benchmark" : performanceStatus === "worse" ? "Below Benchmark" : "At Benchmark"}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="pt-6">
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#F8FAFC" }}>
                    <div className="text-xs text-gray-600 mb-1">Current Value</div>
                    <div className="text-2xl font-bold" style={{ color: "#0066CC" }}>
                      {currentValue.toFixed(2)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">2025 Spring</div>
                  </div>
                  <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#F8FAFC" }}>
                    <div className="text-xs text-gray-600 mb-1">Change</div>
                    <div className={`text-2xl font-bold flex items-center justify-center gap-1 ${percentChange >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {percentChange >= 0 ? <ArrowUpIcon className="w-5 h-5" /> : <ArrowDownIcon className="w-5 h-5" />}
                      {Math.abs(percentChange).toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-500 mt-1">vs Previous</div>
                  </div>
                  <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#F8FAFC" }}>
                    <div className="text-xs text-gray-600 mb-1">Trend Slope</div>
                    <div className={`text-2xl font-bold ${conwayTrend >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {conwayTrend.toFixed(3)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">2023-2025</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Trend Chart */}
            {selectedMeasure && chartData.length > 0 && (
              <Card className="border-0" style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
                <CardHeader className="border-b" style={{ backgroundColor: "#F8FAFC" }}>
                  <CardTitle className="text-lg font-semibold" style={{ color: "#0066CC" }}>
                    Performance Trend Analysis
                  </CardTitle>
                  <div className="flex gap-6 mt-3">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#0066CC" }}></div>
                      <span className="text-sm text-gray-700 font-medium">Conway Regional</span>
                      <span className="text-xs text-gray-500">
                        (Slope: {conwayTrend >= 0 ? "+" : ""}{conwayTrend.toFixed(3)})
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full" style={{ backgroundColor: "#14B8A6" }}></div>
                      <span className="text-sm text-gray-700 font-medium">National Benchmark</span>
                      <span className="text-xs text-gray-500">
                        (Slope: {nationalTrend >= 0 ? "+" : ""}{nationalTrend.toFixed(3)})
                      </span>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-6">
                  <ResponsiveContainer width="100%" height={450}>
                    <LineChart
                      data={chartData}
                      margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                      <XAxis
                        dataKey="period"
                        tick={{ fontSize: 12, fill: "#6B7280" }}
                        stroke="#9CA3AF"
                      />
                      <YAxis
                        tick={{ fontSize: 12, fill: "#6B7280" }}
                        stroke="#9CA3AF"
                      />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "white",
                          border: "1px solid #E5E7EB",
                          borderRadius: "8px",
                          boxShadow: "0 4px 6px rgba(0,0,0,0.1)"
                        }}
                        labelStyle={{ color: "#374151", fontWeight: "600" }}
                      />
                      <Legend
                        wrapperStyle={{ paddingTop: "20px" }}
                        iconType="circle"
                      />
                      <Line
                        type="monotone"
                        dataKey="Conway"
                        name="Conway Regional"
                        stroke="#0066CC"
                        strokeWidth={3}
                        dot={{ r: 5, fill: "#0066CC", strokeWidth: 2, stroke: "white" }}
                        activeDot={{ r: 7 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="National"
                        name="National Benchmark"
                        stroke="#14B8A6"
                        strokeWidth={3}
                        dot={{ r: 5, fill: "#14B8A6", strokeWidth: 2, stroke: "white" }}
                        activeDot={{ r: 7 }}
                        strokeDasharray="5 5"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
