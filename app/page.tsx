"use client"

import { useState, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { ArrowUpIcon, ArrowDownIcon, TrendingUpIcon, AlertCircleIcon, Award } from "lucide-react"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"
import { measureData, performanceData } from "@/generated-data"
import { performanceConfig, isImproving, isBetterThanBenchmark } from "@/lib/performance-config"

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
    let improvingMeasures: string[] = []
    let decliningMeasures: string[] = []
    let aboveBenchmarkMeasures: string[] = []
    let belowBenchmarkMeasures: string[] = []

    allMeasures.forEach((measure) => {
      const data = performanceData[measure.id]
      if (data && data.length > 0) {
        const summary = data.find((item) => item.year.includes("2023-2025"))
        if (summary && summary.conwaySlope !== undefined) {
          const config = performanceConfig[measure.id]
          const measureImproving = isImproving(measure.id, summary.conwaySlope)

          if (measureImproving) {
            improving++
            improvingMeasures.push(measure.id)
          } else if (config && config.favorableTrend === "Higher" ? summary.conwaySlope < -0.01 : summary.conwaySlope > 0.01) {
            declining++
            decliningMeasures.push(measure.id)
          } else {
            stable++
          }
        }

        // Check performance vs benchmark
        const config = performanceConfig[measure.id]
        if (config) {
          if (config.overallPerformance === "Better") {
            aboveBenchmark++
            aboveBenchmarkMeasures.push(measure.id)
          } else if (config.overallPerformance === "Worse") {
            belowBenchmark++
            belowBenchmarkMeasures.push(measure.id)
          }
        }
      }
    })

    return {
      improving,
      declining,
      stable,
      aboveBenchmark,
      belowBenchmark,
      total: allMeasures.length,
      improvingMeasures,
      decliningMeasures,
      aboveBenchmarkMeasures,
      belowBenchmarkMeasures
    }
  }, [])

  // Filter out summary row and format data for chart
  const historicalData = currentPerformanceData
    .filter((item) => !item.year.includes("2023-2025") && item.status !== "forecast")
    .map((item) => ({
      period: item.year,
      Conway: item.conway,
      National: item.national,
      isForecast: false,
    }))

  const forecastData = currentPerformanceData
    .filter((item) => item.status === "forecast")
    .map((item) => ({
      period: item.year,
      Conway: item.conway,
      National: item.national,
      isForecast: true,
    }))

  const chartData = [...historicalData, ...forecastData]

  // Get trend info
  const summaryData = currentPerformanceData.find((item) =>
    item.year.includes("2023-2025")
  )
  const conwayTrend = summaryData?.conwaySlope || 0
  const nationalTrend = summaryData?.nationalSlope || 0
  const latestData = currentPerformanceData.find((item) => item.year === "2025 Spring")

  // Use configuration for accurate performance status
  const config = performanceConfig[selectedMeasure]
  const performanceStatus = config?.overallPerformance || "unknown"

  // Get current and previous values for selected measure
  const currentValue = latestData?.conway || 0
  const previousValue = currentPerformanceData.find((item) => item.year === "2024 Fall")?.conway || 0
  const percentChange = previousValue !== 0 ? ((currentValue - previousValue) / previousValue) * 100 : 0

  // Determine if trend is improving based on favorable direction
  const isCurrentMeasureImproving = isImproving(selectedMeasure, conwayTrend)

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
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-2" style={{ fontFamily: "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>
                Conway Regional Medical Center
              </h1>
              <h2 className="text-lg sm:text-xl text-blue-100 font-medium mb-1">
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Leapfrog Grade Summary */}
        <Card className="border-0" style={{ boxShadow: "0 4px 8px rgba(0,0,0,0.15)", borderRadius: "12px", background: "linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)" }}>
          <CardContent className="p-6">
            <div className="space-y-6">
              {/* Current Grade and Stats */}
              <div className="flex items-center justify-between flex-wrap gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: "#ffc107" }}>
                    <Award className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-600 mb-1">Leapfrog Hospital Safety Grade</h3>
                    <div className="flex items-baseline gap-3">
                      <span className="text-5xl font-bold" style={{ color: "#ffc107" }}>B</span>
                      <span className="text-gray-500 text-sm">Spring 2025</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">18</div>
                    <div className="text-xs text-gray-600 mt-1">Better than<br/>National</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-600">1</div>
                    <div className="text-xs text-gray-600 mt-1">Same as<br/>National</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">3</div>
                    <div className="text-xs text-gray-600 mt-1">Below<br/>National</div>
                  </div>
                </div>
              </div>

              {/* Historical Grade Timeline */}
              <div className="border-t pt-6">
                <h4 className="text-sm font-semibold text-gray-700 mb-4">Historical Safety Grade Progression</h4>
                <div className="flex items-center justify-between gap-2 sm:gap-4">
                  {/* Spring 2023 - C */}
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: "#fd7e14" }}>
                      <span className="text-xl sm:text-2xl font-bold text-white">C</span>
                    </div>
                    <div className="text-xs text-center text-gray-600 font-medium">Spring<br/>2023</div>
                  </div>

                  {/* Arrow */}
                  <div className="text-gray-400 mb-6">→</div>

                  {/* Fall 2023 - C */}
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: "#fd7e14" }}>
                      <span className="text-xl sm:text-2xl font-bold text-white">C</span>
                    </div>
                    <div className="text-xs text-center text-gray-600 font-medium">Fall<br/>2023</div>
                  </div>

                  {/* Arrow with improvement indicator */}
                  <div className="flex flex-col items-center mb-6">
                    <ArrowUpIcon className="w-4 h-4 text-green-600" />
                    <div className="text-xs text-green-600 font-semibold">+1</div>
                  </div>

                  {/* Spring 2024 - B */}
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: "#ffc107" }}>
                      <span className="text-xl sm:text-2xl font-bold text-white">B</span>
                    </div>
                    <div className="text-xs text-center text-gray-600 font-medium">Spring<br/>2024</div>
                  </div>

                  {/* Arrow with decline indicator */}
                  <div className="flex flex-col items-center mb-6">
                    <ArrowDownIcon className="w-4 h-4 text-red-600" />
                    <div className="text-xs text-red-600 font-semibold">-1</div>
                  </div>

                  {/* Fall 2024 - C */}
                  <div className="flex flex-col items-center flex-1">
                    <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-2" style={{ backgroundColor: "#fd7e14" }}>
                      <span className="text-xl sm:text-2xl font-bold text-white">C</span>
                    </div>
                    <div className="text-xs text-center text-gray-600 font-medium">Fall<br/>2024</div>
                  </div>

                  {/* Arrow with improvement indicator */}
                  <div className="flex flex-col items-center mb-6">
                    <ArrowUpIcon className="w-4 h-4 text-green-600" />
                    <div className="text-xs text-green-600 font-semibold">+1</div>
                  </div>

                  {/* Spring 2025 - B (Current) */}
                  <div className="flex flex-col items-center flex-1">
                    <div className="relative">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center mb-2 ring-4 ring-yellow-200" style={{ backgroundColor: "#ffc107" }}>
                        <span className="text-xl sm:text-2xl font-bold text-white">B</span>
                      </div>
                      <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="text-xs text-center font-semibold" style={{ color: "#ffc107" }}>Spring<br/>2025</div>
                  </div>
                </div>

                {/* Grade Statistics */}
                <div className="mt-6 grid grid-cols-3 gap-4">
                  <div className="text-center p-3 rounded-lg" style={{ backgroundColor: "#f8fafc" }}>
                    <div className="text-xs text-gray-600 mb-1">Average Grade</div>
                    <div className="text-xl font-bold" style={{ color: "#fd7e14" }}>C+</div>
                  </div>
                  <div className="text-center p-3 rounded-lg" style={{ backgroundColor: "#f8fafc" }}>
                    <div className="text-xs text-gray-600 mb-1">Grade History</div>
                    <div className="text-sm font-semibold text-gray-700">2 B's, 3 C's</div>
                  </div>
                  <div className="text-center p-3 rounded-lg" style={{ backgroundColor: "#f8fafc" }}>
                    <div className="text-xs text-gray-600 mb-1">Current Trend</div>
                    <div className="flex items-center justify-center gap-1 text-sm font-semibold text-green-600">
                      <ArrowUpIcon className="w-4 h-4" />
                      Improving
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics Summary Cards - Now Interactive */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-0 transition-all hover:shadow-lg cursor-pointer" style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
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

          <Dialog>
            <DialogTrigger asChild>
              <Card className="border-0 transition-all hover:shadow-lg cursor-pointer" style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
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
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Improving Measures ({summaryStats.improving})</DialogTitle>
              </DialogHeader>
              <div className="max-h-96 overflow-y-auto">
                <ul className="space-y-2">
                  {summaryStats.improvingMeasures.map((id) => {
                    const measure = [...measureData["Process and Structural Measures"], ...measureData["Outcome Measures"]].find(m => m.id === id)
                    const config = performanceConfig[id]
                    return (
                      <li key={id} className="p-3 bg-green-50 rounded-lg border border-green-200">
                        <div className="font-medium text-sm">{measure?.name}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          Trend: {config?.trendSlope.toFixed(2)} ({config?.favorableTrend === "Higher" ? "Higher is Better" : "Lower is Better"})
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Card className="border-0 transition-all hover:shadow-lg cursor-pointer" style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
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
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Above National Benchmark ({summaryStats.aboveBenchmark})</DialogTitle>
              </DialogHeader>
              <div className="max-h-96 overflow-y-auto">
                <ul className="space-y-2">
                  {summaryStats.aboveBenchmarkMeasures.map((id) => {
                    const measure = [...measureData["Process and Structural Measures"], ...measureData["Outcome Measures"]].find(m => m.id === id)
                    const config = performanceConfig[id]
                    return (
                      <li key={id} className="p-3 bg-teal-50 rounded-lg border border-teal-200">
                        <div className="font-medium text-sm">{measure?.name}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          Conway: {config?.averageConway.toFixed(2)} vs National: {config?.averageNational.toFixed(2)}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </DialogContent>
          </Dialog>

          <Dialog>
            <DialogTrigger asChild>
              <Card className="border-0 transition-all hover:shadow-lg cursor-pointer" style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
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
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Below National Benchmark ({summaryStats.belowBenchmark})</DialogTitle>
              </DialogHeader>
              <div className="max-h-96 overflow-y-auto">
                <ul className="space-y-2">
                  {summaryStats.belowBenchmarkMeasures.map((id) => {
                    const measure = [...measureData["Process and Structural Measures"], ...measureData["Outcome Measures"]].find(m => m.id === id)
                    const config = performanceConfig[id]
                    return (
                      <li key={id} className="p-3 bg-orange-50 rounded-lg border border-orange-200">
                        <div className="font-medium text-sm">{measure?.name}</div>
                        <div className="text-xs text-gray-600 mt-1">
                          Conway: {config?.averageConway.toFixed(2)} vs National: {config?.averageNational.toFixed(2)}
                        </div>
                      </li>
                    )
                  })}
                </ul>
              </div>
            </DialogContent>
          </Dialog>
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
                  <TabsList className="flex w-full mx-4 my-4" style={{ backgroundColor: "#E6F2FF", maxWidth: "calc(100% - 2rem)", boxSizing: "border-box", overflow: "hidden" }}>
                    {domains.map((domain) => (
                      <TabsTrigger
                        key={domain}
                        value={domain}
                        className="data-[state=active]:bg-white data-[state=active]:text-[#0066CC] data-[state=active]:font-semibold text-xs sm:text-sm flex-1"
                        style={{ boxSizing: "border-box" }}
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
                          const measureSummary = measurePerf?.find((item) => item.year.includes("2023-2025"))
                          const measureTrend = measureSummary?.conwaySlope || 0
                          const config = performanceConfig[measure.id]
                          const measureStatus = config?.overallPerformance || "unknown"
                          const measureImproving = isImproving(measure.id, measureTrend)

                          return (
                            <div
                              key={measure.id}
                              className={`p-4 cursor-pointer transition-all hover:bg-gray-50 ${
                                selectedMeasure === measure.id ? "bg-blue-50 border-l-4 border-l-[#0066CC]" : ""
                              } ${idx % 2 === 0 ? "bg-gray-50 bg-opacity-50" : ""}`}
                              onClick={() => setSelectedMeasure(measure.id)}
                            >
                              <div className="mb-2">
                                <h4 className="text-sm font-medium text-gray-900 leading-tight">
                                  {measure.name}
                                </h4>
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
                                    backgroundColor: measureStatus === "Better" ? "#D1FAE5" : measureStatus === "Worse" ? "#FFEDD5" : "#F3F4F6",
                                    color: measureStatus === "Better" ? "#065F46" : measureStatus === "Worse" ? "#9A3412" : "#4B5563",
                                    border: "none"
                                  }}
                                >
                                  {measureStatus === "Better" ? "Above" : measureStatus === "Worse" ? "Below" : "At"} Benchmark
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
                <div className="flex items-start justify-between flex-wrap gap-4">
                  <div className="flex-1">
                    <CardTitle className="text-lg font-semibold mb-1" style={{ color: "#0066CC" }}>
                      {currentMeasures.find((m) => m.id === selectedMeasure)?.name}
                    </CardTitle>
                    <p className="text-sm text-gray-600">
                      Measure ID: {selectedMeasure} • Weight: {((currentMeasures.find((m) => m.id === selectedMeasure)?.weight || 0) * 100).toFixed(1)}%
                    </p>
                    {config && (
                      <p className="text-xs text-gray-500 mt-1">
                        Favorable Trend: {config.favorableTrend === "Higher" ? "↑ Higher is Better" : "↓ Lower is Better"}
                      </p>
                    )}
                  </div>
                  <Badge
                    className="text-sm px-3 py-1"
                    style={{
                      backgroundColor: performanceStatus === "Better" ? "#10B981" : performanceStatus === "Worse" ? "#F97316" : "#6B7280",
                      color: "white",
                      border: "none"
                    }}
                  >
                    {performanceStatus === "Better" ? "Exceeding Benchmark" : performanceStatus === "Worse" ? "Below Benchmark" : "At Benchmark"}
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
                    <div className={`text-2xl font-bold flex items-center justify-center gap-1 ${
                      isCurrentMeasureImproving
                        ? "text-green-600"
                        : config && ((config.favorableTrend === "Higher" && conwayTrend < -0.01) || (config.favorableTrend === "Lower" && conwayTrend > 0.01))
                        ? "text-red-600"
                        : "text-gray-600"
                    }`}>
                      {isCurrentMeasureImproving ? <ArrowUpIcon className="w-5 h-5" /> : <ArrowDownIcon className="w-5 h-5" />}
                      {Math.abs(percentChange).toFixed(1)}%
                    </div>
                    <div className="text-xs text-gray-500 mt-1">vs Previous</div>
                  </div>
                  <div className="text-center p-4 rounded-lg" style={{ backgroundColor: "#F8FAFC" }}>
                    <div className="text-xs text-gray-600 mb-1">Trend Slope</div>
                    <div className={`text-2xl font-bold ${isCurrentMeasureImproving ? "text-green-600" : "text-red-600"}`}>
                      {conwayTrend.toFixed(3)}
                    </div>
                    <div className="text-xs text-gray-500 mt-1">2023-2025</div>
                  </div>
                </div>

                {/* Overall Averages (2023-2025) */}
                <div className="p-4 rounded-lg border-2 border-dashed" style={{ borderColor: "#E5E7EB", backgroundColor: "#FAFAFA" }}>
                  <div className="text-center">
                    <div className="text-xs font-semibold text-gray-600 mb-2">Overall Averages (2023-2025)</div>
                    <div className="flex justify-center gap-6">
                      <div>
                        <span className="text-sm font-semibold" style={{ color: "#0066CC" }}>Conway Avg: </span>
                        <span className="text-sm font-bold" style={{ color: "#0066CC" }}>
                          {summaryData?.conwayMean?.toFixed(1) || "N/A"}
                        </span>
                      </div>
                      <div className="border-l border-gray-300"></div>
                      <div>
                        <span className="text-sm font-semibold" style={{ color: "#14B8A6" }}>National Avg: </span>
                        <span className="text-sm font-bold" style={{ color: "#14B8A6" }}>
                          {summaryData?.nationalMean?.toFixed(1) || "N/A"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Performance Trend Chart */}
            {selectedMeasure && chartData.length > 0 && (
              <Card className="border-0" style={{ boxShadow: "0 2px 4px rgba(0,0,0,0.1)", borderRadius: "8px" }}>
                <CardHeader className="border-b" style={{ backgroundColor: "#F8FAFC" }}>
                  <CardTitle className="text-lg font-semibold" style={{ color: "#0066CC" }}>
                    Performance Trend Analysis (2023-2027 with Forecasts)
                  </CardTitle>
                  <div className="flex gap-6 mt-3 flex-wrap">
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
                    <div className="flex items-center gap-2 ml-auto">
                      <div className="w-8 h-0.5 border-t-2 border-dashed" style={{ borderColor: "#9CA3AF" }}></div>
                      <span className="text-xs text-gray-600 italic">= Forecasted Data</span>
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
                        formatter={(value: any, name: any, props: any) => {
                          const isForecast = props.payload.isForecast
                          return [value, isForecast ? `${name} (Forecast)` : name]
                        }}
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
                        dot={(props: any) => {
                          const { cx, cy, payload } = props
                          if (!cx || !cy) return null
                          return (
                            <circle
                              cx={cx}
                              cy={cy}
                              r={5}
                              fill={payload?.isForecast ? "#FFFFFF" : "#0066CC"}
                              stroke="#0066CC"
                              strokeWidth={2}
                              opacity={payload?.isForecast ? 0.6 : 1}
                            />
                          )
                        }}
                        activeDot={{ r: 7 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="National"
                        name="National Benchmark"
                        stroke="#14B8A6"
                        strokeWidth={3}
                        strokeDasharray="5 5"
                        dot={(props: any) => {
                          const { cx, cy, payload } = props
                          if (!cx || !cy) return null
                          return (
                            <circle
                              cx={cx}
                              cy={cy}
                              r={5}
                              fill={payload?.isForecast ? "#FFFFFF" : "#14B8A6"}
                              stroke="#14B8A6"
                              strokeWidth={2}
                              opacity={payload?.isForecast ? 0.6 : 1}
                            />
                          )
                        }}
                        activeDot={{ r: 7 }}
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
