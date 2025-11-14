// Performance configuration based on Conway Medical Center Leapfrog Historical Measure Analysis
// Updated for Fall 2025 data
// Auto-generated from Word document and generated-data.json

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
  // Process and Structural Measures
  "BCMA": {
    id: "BCMA",
    name: "Barcode Medication Administration (BCMA)",
    favorableTrend: "Higher",
    overallPerformance: "Better",
    averageConway: 95.83333333333333,
    averageNational: 87.48166666666667,
    trendSlope: 3.567980416065942
  },
  "CPOE": {
    id: "CPOE",
    name: "Computerized Physician Order Entry (CPOE)",
    favorableTrend: "Higher",
    overallPerformance: "Better",
    averageConway: 95,
    averageNational: 85.10833333333333,
    trendSlope: 4.281576499279131
  },
  "H-COMP-1": {
    id: "H-COMP-1",
    name: "H-COMP-1: Nurse Communication",
    favorableTrend: "Higher",
    overallPerformance: "Better",
    averageConway: 90.33333333333333,
    averageNational: 89.93833333333335,
    trendSlope: 0.3423596228613037
  },
  "H-COMP-2": {
    id: "H-COMP-2",
    name: "H-COMP-2: Doctor Communication",
    favorableTrend: "Higher",
    overallPerformance: "Better",
    averageConway: 91,
    averageNational: 89.72833333333334,
    trendSlope: 0.17138793278193531
  },
  "H-COMP-3": {
    id: "H-COMP-3",
    name: "H-COMP-3: Staff Responsiveness",
    favorableTrend: "Higher",
    overallPerformance: "Same",
    averageConway: 81.5,
    averageNational: 81.38833333333334,
    trendSlope: 0.028564655463655886
  },
  "H-COMP-5": {
    id: "H-COMP-5",
    name: "H-COMP-5: Communication about Medicines",
    favorableTrend: "Higher",
    overallPerformance: "Same",
    averageConway: 74.33333333333333,
    averageNational: 74.25666666666667,
    trendSlope: 0.28554249396091713
  },
  "H-COMP-6": {
    id: "H-COMP-6",
    name: "H-COMP-6: Discharge Information",
    favorableTrend: "Higher",
    overallPerformance: "Worse",
    averageConway: 85,
    averageNational: 85.10666666666667,
    trendSlope: -0.2282050616823219
  },
  "Hand Hygiene": {
    id: "Hand Hygiene",
    name: "Hand Hygiene",
    favorableTrend: "Higher",
    overallPerformance: "Better",
    averageConway: 95,
    averageNational: 75.20833333333333,
    trendSlope: 4.281576499279131
  },
  "IPS": {
    id: "IPS",
    name: "ICU Physician Staffing (IPS)",
    favorableTrend: "Higher",
    overallPerformance: "Better",
    averageConway: 68.33333333333333,
    averageNational: 65.08833333333332,
    trendSlope: 21.689366624006546
  },
  "SP-1": {
    id: "SP-1",
    name: "Safe Practice 1: Culture of Leadership Structures and Systems",
    favorableTrend: "Higher",
    overallPerformance: "Better",
    averageConway: 118.46166666666666,
    averageNational: 117.40500000000002,
    trendSlope: 1.3172983696115466
  },
  "SP-2": {
    id: "SP-2",
    name: "Safe Practice 2: Culture Measurement, Feedback and Intervention",
    favorableTrend: "Higher",
    overallPerformance: "Better",
    averageConway: 113.33333333333333,
    averageNational: 116.77666666666666,
    trendSlope: 4.566182447159273
  },
  "Total Nursing Care Hours per Patient Day": {
    id: "Total Nursing Care Hours per Patient Day",
    name: "Total Nursing Care Hours per Patient Day",
    favorableTrend: "Higher",
    overallPerformance: "Better",
    averageConway: 100,
    averageNational: 75.59,
    trendSlope: 0
  },

  // Outcome Measures (all have "Lower" favorable trend)
  "Air Embolism": {
    id: "Air Embolism",
    name: "Air Embolism",
    favorableTrend: "Lower",
    overallPerformance: "Better",
    averageConway: 0,
    averageNational: 0.0013333333333333333,
    trendSlope: 0
  },
  "C. diff": {
    id: "C. diff",
    name: "C. diff (Clostridioides difficile Infection)",
    favorableTrend: "Lower",
    overallPerformance: "Better",
    averageConway: 0.26233333333333336,
    averageNational: 0.43683333333333335,
    trendSlope: 0.024143117355638632
  },
  "CAUTI": {
    id: "CAUTI",
    name: "CAUTI (Catheter-Associated Urinary Tract Infection)",
    favorableTrend: "Lower",
    overallPerformance: "Better",
    averageConway: 0.244,
    averageNational: 0.6438333333333334,
    trendSlope: 0.09431456088248015
  },
  "CLABSI": {
    id: "CLABSI",
    name: "CLABSI (Central Line-Associated Bloodstream Infection)",
    favorableTrend: "Lower",
    overallPerformance: "Better",
    averageConway: 0.7441666666666666,
    averageNational: 0.7698333333333333,
    trendSlope: -0.041719433744567824
  },
  "Falls and Trauma": {
    id: "Falls and Trauma",
    name: "Falls and Trauma",
    favorableTrend: "Lower",
    overallPerformance: "Worse",
    averageConway: 0.07716666666666668,
    averageNational: 0.4001666666666667,
    trendSlope: 0.06603081721271914
  },
  "Foreign Object Retained After Surgery": {
    id: "Foreign Object Retained After Surgery",
    name: "Foreign Object Retained After Surgery",
    favorableTrend: "Lower",
    overallPerformance: "Better",
    averageConway: 0,
    averageNational: 0.013666666666666666,
    trendSlope: 0
  },
  "MRSA": {
    id: "MRSA",
    name: "MRSA (Methicillin-resistant Staphylococcus aureus)",
    favorableTrend: "Lower",
    overallPerformance: "Worse",
    averageConway: 1.1975,
    averageNational: 0.8281666666666667,
    trendSlope: -0.18310584125358623
  },
  "PSI 4": {
    id: "PSI 4",
    name: "PSI 4: Death rate among surgical inpatients with serious treatable conditions",
    favorableTrend: "Lower",
    overallPerformance: "Worse",
    averageConway: 196.95999999999998,
    averageNational: 172.91000000000003,
    trendSlope: 8.46271308948259
  },
  "PSI-90": {
    id: "PSI-90",
    name: "PSI-90: CMS Medicare PSI-90: Patient safety and adverse events composite",
    favorableTrend: "Lower",
    overallPerformance: "Worse",
    averageConway: 1.2966666666666666,
    averageNational: 0.9966666666666666,
    trendSlope: -0.011402968836821183
  },
  "SSI: Colon": {
    id: "SSI: Colon",
    name: "SSI: Colon (Surgical Site Infection: Colon)",
    favorableTrend: "Lower",
    overallPerformance: "Better",
    averageConway: 0.5343333333333333,
    averageNational: 0.8396666666666666,
    trendSlope: 0.12934846042943135
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
