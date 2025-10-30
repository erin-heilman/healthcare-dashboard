// Performance configuration based on Conway Medical Center Leapfrog Historical Measure Analysis
// Extracted from official documentation

export type FavorableTrend = "Higher" | "Lower"
export type OverallPerformance = "Better" | "Worse" | "Same"

export interface MeasurePerformanceConfig {
  id: string
  name: string
  favorableTrend: FavorableTrend
  overallPerformance: OverallPerformance
  averageConway: number
  averageNational: number
  trendSlope: number
}

export const performanceConfig: Record<string, MeasurePerformanceConfig> = {
  // Process and Structural Measures (all have "Higher" favorable trend)
  "CPOE": {
    id: "CPOE",
    name: "Computerized Physician Order Entry (CPOE)",
    favorableTrend: "Higher",
    overallPerformance: "Better",
    averageConway: 94,
    averageNational: 85.69,
    trendSlope: 5.99
  },
  "BCMA": {
    id: "BCMA",
    name: "Barcode Medication Administration (BCMA)",
    favorableTrend: "Higher",
    overallPerformance: "Better",
    averageConway: 95,
    averageNational: 87.94,
    trendSlope: 4.99
  },
  "IPS": {
    id: "IPS",
    name: "ICU Physician Staffing (IPS)",
    favorableTrend: "Higher",
    overallPerformance: "Better",
    averageConway: 62,
    averageNational: 64.53,
    trendSlope: 28.46
  },
  "SP-1": {
    id: "SP-1",
    name: "Safe Practice 1: Culture of Leadership Structures and Systems",
    favorableTrend: "Higher",
    overallPerformance: "Better",
    averageConway: 118.15,
    averageNational: 117.37,
    trendSlope: 1.84
  },
  "SP-2": {
    id: "SP-2",
    name: "Safe Practice 2: Culture Measurement, Feedback and Intervention",
    favorableTrend: "Higher",
    overallPerformance: "Better",
    averageConway: 112,
    averageNational: 116.68,
    trendSlope: 5.99
  },
  "Total Nursing Care Hours per Patient Day": {
    id: "Total Nursing Care Hours per Patient Day",
    name: "Total Nursing Care Hours per Patient Day",
    favorableTrend: "Higher",
    overallPerformance: "Better",
    averageConway: 100,
    averageNational: 74.72,
    trendSlope: 0
  },
  "Hand Hygiene": {
    id: "Hand Hygiene",
    name: "Hand Hygiene",
    favorableTrend: "Higher",
    overallPerformance: "Better",
    averageConway: 94,
    averageNational: 74.89,
    trendSlope: 5.99
  },
  "H-COMP-1": {
    id: "H-COMP-1",
    name: "H-COMP-1: Nurse Communication",
    favorableTrend: "Higher",
    overallPerformance: "Better",
    averageConway: 90.2,
    averageNational: 89.85,
    trendSlope: 0.40
  },
  "H-COMP-2": {
    id: "H-COMP-2",
    name: "H-COMP-2: Doctor Communication",
    favorableTrend: "Higher",
    overallPerformance: "Better",
    averageConway: 90.8,
    averageNational: 89.68,
    trendSlope: 0
  },
  "H-COMP-3": {
    id: "H-COMP-3",
    name: "H-COMP-3: Staff Responsiveness",
    favorableTrend: "Higher",
    overallPerformance: "Better",
    averageConway: 81.6,
    averageNational: 81.30,
    trendSlope: 0.20
  },
  "H-COMP-5": {
    id: "H-COMP-5",
    name: "H-COMP-5: Communication about Medicines",
    favorableTrend: "Higher",
    overallPerformance: "Better",
    averageConway: 74.2,
    averageNational: 74.18,
    trendSlope: 0.30
  },
  "H-COMP-6": {
    id: "H-COMP-6",
    name: "H-COMP-6: Discharge Information",
    favorableTrend: "Higher",
    overallPerformance: "Same",
    averageConway: 85.2,
    averageNational: 85.03,
    trendSlope: -0.10
  },

  // Outcome Measures (all have "Lower" favorable trend)
  "Foreign Object Retained After Surgery": {
    id: "Foreign Object Retained After Surgery",
    name: "Foreign Object Retained After Surgery",
    favorableTrend: "Lower",
    overallPerformance: "Better",
    averageConway: 0,
    averageNational: 0.014,
    trendSlope: 0
  },
  "Air Embolism": {
    id: "Air Embolism",
    name: "Air Embolism",
    favorableTrend: "Lower",
    overallPerformance: "Better",
    averageConway: 0,
    averageNational: 0.0014,
    trendSlope: 0
  },
  "Falls and Trauma": {
    id: "Falls and Trauma",
    name: "Falls and Trauma",
    favorableTrend: "Lower",
    overallPerformance: "Better",
    averageConway: 0,
    averageNational: 0.413,
    trendSlope: 0
  },
  "CLABSI": {
    id: "CLABSI",
    name: "CLABSI",
    favorableTrend: "Lower",
    overallPerformance: "Better",
    averageConway: 0.777,
    averageNational: 0.807,
    trendSlope: -0.0235
  },
  "CAUTI": {
    id: "CAUTI",
    name: "CAUTI",
    favorableTrend: "Lower",
    overallPerformance: "Better",
    averageConway: 0.213,
    averageNational: 0.668,
    trendSlope: 0.118
  },
  "SSI: Colon": {
    id: "SSI: Colon",
    name: "SSI: Colon",
    favorableTrend: "Lower",
    overallPerformance: "Better",
    averageConway: 0.491,
    averageNational: 0.836,
    trendSlope: 0.162
  },
  "MRSA": {
    id: "MRSA",
    name: "MRSA",
    favorableTrend: "Lower",
    overallPerformance: "Worse",
    averageConway: 1.347,
    averageNational: 0.856,
    trendSlope: -0.096
  },
  "C. diff": {
    id: "C. diff",
    name: "C. diff",
    favorableTrend: "Lower",
    overallPerformance: "Better",
    averageConway: 0.263,
    averageNational: 0.450,
    trendSlope: 0.044
  },
  "PSI 4": {
    id: "PSI 4",
    name: "PSI 4: Death rate among surgical inpatients with serious treatable conditions",
    favorableTrend: "Lower",
    overallPerformance: "Worse",
    averageConway: 193.43,
    averageNational: 160.13,
    trendSlope: 10.58
  },
  "PSI-90": {
    id: "PSI-90",
    name: "CMS Medicare PSI-90: Patient safety and adverse events composite",
    favorableTrend: "Lower",
    overallPerformance: "Worse",
    averageConway: 1.304,
    averageNational: 0.996,
    trendSlope: -0.009
  }
}

// Helper function to determine if a trend is improving
export function isImproving(measureId: string, slope: number): boolean {
  const config = performanceConfig[measureId]
  if (!config) return slope > 0.01

  // For "Higher" favorable trend measures, positive slope = improving
  // For "Lower" favorable trend measures, negative slope = improving
  if (config.favorableTrend === "Higher") {
    return slope > 0.01
  } else {
    return slope < -0.01
  }
}

// Helper function to determine if performance is better than benchmark
export function isBetterThanBenchmark(measureId: string): boolean {
  const config = performanceConfig[measureId]
  if (!config) return false

  return config.overallPerformance === "Better"
}
